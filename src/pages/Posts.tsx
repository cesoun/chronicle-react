import React from 'react';
import UseRecentPosts from '../hooks/UseRecentPosts';
import PostPagination from '../components/PostPagination';

function Posts() {
  const { posts, error, loading, hasNext, hasPrev, nextFunc, prevFunc } =
    UseRecentPosts();

  return (
    <div className="flex flex-col min-w-full md:w-3/4">
      <article className="prose">
        <h1>Posts</h1>
        <p>
          There has to be at least one thing in this ol' database worth reading.
          If not then it might be a you thing... definitely not a me thing, i'm
          perfect.
        </p>
      </article>
      <hr className="border-primary mt-4" />

      {/* Post Paginator */}
      <div className="py-4">
        <PostPagination
          posts={posts}
          loading={loading}
          error={error}
          hasNext={hasNext}
          hasPrev={hasPrev}
          nextFunc={nextFunc}
          prevFunc={prevFunc}
        />
      </div>
    </div>
  );
}

export default Posts;
