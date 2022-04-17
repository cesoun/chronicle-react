import React from 'react';
import { PaginatedPosts } from '../interfaces/models/PostModels';
import ErrorModel from '../interfaces/models/ErrorModel';
import { Link } from 'react-router-dom';
import { Truncate } from '../utils/Truncate';
import DisplayDate from '../utils/DisplayDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface PaginatorProps {
  posts: null | PaginatedPosts;
  loading: boolean;
  error: null | ErrorModel;
  hasNext?: boolean;
  hasPrev?: boolean;
  nextFunc?: Function;
  prevFunc?: Function;
}

function PostPagination({
  posts,
  loading,
  error,
  hasNext,
  hasPrev,
  nextFunc,
  prevFunc,
}: PaginatorProps) {
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

  const renderPaginator = () => {
    // Only render the paginator if it has everything.
    if (hasNext === undefined || hasPrev === undefined) return;
    if (!nextFunc || !prevFunc) return;

    return (
      <>
        <hr className="border-primary mt-4" />
        <div className="flex justify-between gap-2 p-4">
          <button
            className="btn btn-ghost btn-sm"
            disabled={!hasPrev}
            onClick={() => prevFunc()}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="btn btn-ghost btn-sm"
            disabled={!hasNext}
            onClick={() => nextFunc()}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </>
    );
  };

  if (!posts) {
    if (error) {
      return <p className="btn btn-error w-full">Failed to load posts...</p>;
    }

    if (!loading) {
      return <p className="btn btn-ghost w-full">No posts found...</p>;
    }

    return <p className="btn btn-ghost loading w-full">Loading Posts...</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">{renderPosts()}</div>
      {renderPaginator()}
    </>
  );
}

export default PostPagination;
