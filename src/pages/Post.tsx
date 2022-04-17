import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import PostService from '../services/PostService';
import { PostModel } from '../interfaces/models/PostModels';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import { User } from '../interfaces/models/UserModels';
import UserService from '../services/UserService';
import DisplayDate from '../utils/DisplayDate';
import { Unified } from '../utils/Unified';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

function Post() {
  const { user, isLoading } = useContext(UserContext);
  const { id } = useParams();

  const [post, setPost] = useState<null | PostModel>(null);
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<null | User>(null);
  const [error, setError] = useState<null | ErrorModel>(null);

  useEffect(() => {
    getPostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPost]);

  const getPostById = async () => {
    setPost(null);

    const res = await PostService.getPostById(parseInt(id!));
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
      return;
    }

    let post = res as PostModel;
    setPost(post);

    setContent((await Unified(post!.content)) as string);

    const author = await UserService.getUserById(post.author_id);
    if (InstanceOfErrorModel(author)) {
      // silent, we don't really care...
      return;
    }

    setAuthor(author as User);
  };

  if (isLoading) {
    return <p className="btn btn-ghost loading">Loading Context...</p>;
  }

  if (!post) {
    if (error) {
      return <Navigate to="/posts" />;
    }

    return <p className="btn btn-ghost loading">Loading Post...</p>;
  }

  return (
    <div className="flex flex-col w-11/12 mx-auto">
      {user && (
        <div className="flex justify-center">
          <Link
            to={`/post/${id}/edit`}
            className="btn btn-ghost btn-sm"
          >
            Edit
          </Link>
        </div>
      )}

      <article className="prose py-6">
        <h4>{post.title}</h4>
        <p>
          <small>
            Author:{' '}
            {author && (
              <Link to={`/profile/${author.username}`}>{author.username}</Link>
            )}
            {!author && (
              <span className="btn btn-sm text-xs btn-ghost loading">
                Loading Author...
              </span>
            )}
          </small>
          <br />
          <small>Created on: {DisplayDate(post.created_at, false)}</small>
          <br />
          {post.modified_at && (
            <small>Updated on: {DisplayDate(post.modified_at, false)}</small>
          )}
        </p>
      </article>
      <hr className="border-primary" />

      {/* Post Content */}
      <article
        className="prose my-8"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
    </div>
  );
}

export default Post;
