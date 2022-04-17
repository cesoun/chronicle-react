import React, { useContext, useEffect, useState } from 'react';
import { FormInput } from '../components/FromInput';
import PreviewModal from '../components/PreviewModal';
import { validatePost } from '../utils/Validators';
import { Unified } from '../utils/Unified';
import PostService from '../services/PostService';
import { UserContext } from '../contexts/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import UserService from '../services/UserService';
import { User } from '../interfaces/models/UserModels';
import { PaginatedPosts } from '../interfaces/models/PostModels';

function NewPost() {
  const { user, isLoading } = useContext(UserContext);

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [previewContent, setPreviewContent] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const [didTitle, setDidTitle] = useState<undefined | boolean>(undefined);
  const [didContent, setDidContent] = useState<undefined | boolean>(undefined);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<null | ErrorModel>(null);

  let navigate = useNavigate();

  useEffect(() => {
    validate();
  });

  const handleChange = (ev: any, sender: string) => {
    let value = ev.target.value;
    switch (sender) {
      case 'title':
        setTitle(value);
        break;
      case 'content':
        setContent(value);
        break;
    }

    setShouldValidate(true);
  };

  const handlePreview = async (ev: any) => {
    const unified = (await Unified(content)) as string;
    setPreviewContent(unified);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();
    setError(null);

    if (!valid) return;

    setBusy(true);
    const resCreate = await PostService.createPost({
      title: title,
      content: content,
    });

    if (InstanceOfErrorModel(resCreate)) {
      setError(resCreate as ErrorModel);
      setBusy(false);
      return;
    }

    const resGetUser = await UserService.getUserByUsername(user.sub);
    if (InstanceOfErrorModel(resGetUser)) {
      navigate(`/profile/${user.sub}`);
      return;
    }

    let dbUser = resGetUser as User;
    if (!dbUser.id) {
      navigate(`/profile/${user.sub}`);
      return;
    }

    const resGetPosts = await PostService.getPostsByAuthorId(dbUser.id, 1, 0);
    if (InstanceOfErrorModel(resGetPosts) || !resGetPosts) {
      navigate(`/profile/${user.sub}`);
      return;
    }

    let posts = resGetPosts as PaginatedPosts;
    navigate(`/post/${posts.items[0].id}`);
  };

  const validate = () => {
    if (!shouldValidate) return;

    const { didTitle, didContent } = validatePost(title, content);

    setValid(didTitle && didContent && true);
    setDidTitle(!didTitle);
    setDidContent(!didContent);
    setShouldValidate(false);
  };

  if (isLoading) {
    return <p className="btn btn-ghost loading">Loading Context...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-w-full md:w-3/4 gap-8">
      <article className="prose">
        <h2>New Post</h2>
      </article>
      <hr className="border-primary" />

      {error && (
        <div className="alert alert-error">
          <div>
            <span>{error.msg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <FormInput
          input={{
            type: 'text',
            required: true,
            name: 'title',
            id: 'title',
            placeholder: 'Hello, Wonderful!',
            altText: 'Simple, Sweet & Informative',
            errorText: 'Min length: 5, Max length: 255',
          }}
          state={{
            value: title,
            setState: handleChange,
            didError: didTitle,
          }}
        />

        {/* Content */}
        <FormInput
          input={{
            type: 'textarea',
            required: true,
            name: 'content',
            id: 'content',
            placeholder: '# Markdown support!',
            altText: (
              <a
                href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Markdown goes here!
              </a>
            ),
            errorText: 'Min length: 30, Max length: 65,535',
          }}
          state={{
            value: content,
            setState: handleChange,
            didError: didContent,
          }}
        />

        {/* Buttons */}
        <div className="flex gap-4 justify-end mt-8">
          <label
            className="btn btn-ghost btn-outline w-32"
            htmlFor="preview-modal"
            onClick={handlePreview}
          >
            Preview
          </label>
          <button
            type="submit"
            className={`btn btn-primary w-32 ${busy ? 'loading' : ''}`}
            disabled={!valid || busy}
          >
            Create
          </button>
        </div>
      </form>

      <PreviewModal value={previewContent} />
    </div>
  );
}

export default NewPost;
