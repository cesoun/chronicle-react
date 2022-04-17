import React from 'react';
import { Link } from 'react-router-dom';
import PostPagination from '../components/PostPagination';
import UseRecentPosts from '../hooks/UseRecentPosts';

function Home() {
  const { posts, error, loading } = UseRecentPosts();

  return (
    <div className="flex flex-col min-w-full md:w-3/4">
      <article className="prose max-w-full prose-a:after:content-['_↗']">
        <h1>Welcome</h1>
        <p>
          <strong>Chronicle</strong> is a blogging/article application written
          by&nbsp;
          <a
            href="https://github.com/cesoun"
            target="_blank"
            rel="noreferrer"
          >
            this nerd
          </a>
          .
        </p>
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-picture.png`}
          alt={'Christopher'}
          width="200"
          height="200"
          className="rounded-lg shadow mx-auto"
        />
        <p>
          While I've done my best to make things functional, there are likely
          many things that don't work as expected. I know some of you space
          cowboys like to break things and would appreciate it if you kept the
          damage to a minimum.
        </p>
        <p>
          With that out of the way, take a look around or read some of the
          recent posts listed below.
        </p>
      </article>

      {/* Divider */}
      <div className="pt-12 flex items-baseline justify-between">
        <h1>Recent Posts</h1>
        <Link
          to="/posts"
          className="text-xs link no-underline hover:underline"
        >
          View all
        </Link>
      </div>
      <hr className="border-primary flex-none" />

      <div className="py-4">
        <PostPagination
          posts={posts || null}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default Home;
