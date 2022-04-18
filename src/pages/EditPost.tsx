import React, { useEffect, useState } from 'react';
import { FormInput } from '../components/FromInput';
import PreviewModal from '../components/PreviewModal';
import { validatePost } from '../utils/Validators';
import { PostModel } from '../interfaces/models/PostModels';
import { Unified } from '../utils/Unified';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import PostService from '../services/PostService';
import { useNavigate } from 'react-router-dom';

interface EditPostProps {
  post: PostModel;
}

function EditPost({ post }: EditPostProps) {
  const [title, setTitle] = useState<string>(post.title);
  const [content, setContent] = useState<string>(post.content);
  const [previewContent, setPreviewContent] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const [didTitle, setDidTitle] = useState<boolean | undefined>(undefined);
  const [didContent, setDidContent] = useState<boolean | undefined>(undefined);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);
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

  const handleDelete = async (ev: any) => {
    ev.preventDefault();

    if (!window.confirm('Are you sure? This cannot be undone.')) return;

    const res = await PostService.deletePostById(post.id);
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
      return;
    }

    navigate('/posts');
  };

  const handlePreview = async (ev: any) => {
    const unified = (await Unified(content)) as string;
    setPreviewContent(unified);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    setError(null);

    if (!valid) return;

    const res = await PostService.putPostById(post.id, {
      new: {
        title: title,
        content: content,
      },
    });

    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
      return;
    }

    navigate(`/post/${post.id}`);
  };

  const validate = () => {
    if (!shouldValidate) return;

    const { didTitle, didContent } = validatePost(title, content);

    setValid(didTitle && didContent && true);
    setDidTitle(!didTitle);
    setDidContent(!didContent);
    setShouldValidate(false);
  };

  return (
    <div className="flex flex-col min-w-full md:w-3/4 gap-8">
      <article className="prose">
        <h2>Edit Post</h2>
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
        <div className="flex gap-4 justify-between mt-8">
          {/* Delete */}
          <button
            className="btn btn-error btn-outline w-32"
            onClick={handleDelete}
          >
            Delete
          </button>
          {/* Update + Preview */}
          <div className="flex gap-4">
            <label
              className="btn btn-ghost btn-outline w-32"
              htmlFor="preview-modal"
              onClick={handlePreview}
            >
              Preview
            </label>
            <button
              type="submit"
              className="btn btn-primary w-32"
              disabled={!valid}
            >
              Update
            </button>
          </div>
        </div>
      </form>

      <PreviewModal value={previewContent} />
    </div>
  );
}

export default EditPost;
