import React, { useEffect, useState } from 'react';
import { PaginatedPosts } from '../interfaces/models/PostModels';
import PostService from '../services/PostService';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import { Link } from 'react-router-dom';
import { Truncate } from '../utils/Truncate';
import DisplayDate from '../utils/DisplayDate';

// TODO: Convert to accept Props
// TODO: Handle Next / Prev
function PostPagination() {
  const [posts, setPosts] = useState<null | PaginatedPosts>(null);
  const [error, setError] = useState<null | ErrorModel>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getRecentPosts();
  }, [setPosts]);

  const getRecentPosts = async () => {
    const res = await PostService.getPosts(10, 0);
    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
    } else {
      setPosts(res as PaginatedPosts);
    }

    setLoading(false);
  };

  const renderPosts = () =>
    posts?.items.map((post) => {
      return (
        <Link
          to={`/post/${post.id}`}
          key={post.id}
          className="btn btn-ghost justify-between w-full"
        >
          <p className="capitalize md:hidden">
            {Truncate(post.title, 18, true)}
          </p>
          <p className="capitalize hidden md:block">
            {Truncate(post.title, 35, true)}
          </p>
          <small className="font-light normal-case text-secondary sm:hidden">
            {DisplayDate(post.created_at, true)}
          </small>
          <small className="font-light normal-case text-secondary hidden sm:block">
            {DisplayDate(post.created_at, false)}
          </small>
        </Link>
      );
    });

  if (!posts) {
    if (error) {
      return <p className="btn btn-error">Failed to load posts...</p>;
    }

    if (!loading) {
      return <p className="btn btn-ghost">No posts found...</p>;
    }

    return <p className="btn btn-ghost loading">Loading Posts...</p>;
  }

  return <div className="flex flex-col gap-2">{renderPosts()}</div>;
}

export default PostPagination;
