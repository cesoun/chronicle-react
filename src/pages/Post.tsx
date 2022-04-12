import React from 'react';
import { Link } from 'react-router-dom';

class Post extends React.Component<{}, {}> {
  render() {
    return (
      <div className="flex flex-col w-11/12 mx-auto">
        <div className="flex justify-center">
          <Link
            to={'/post/:id/edit'}
            className="btn btn-ghost btn-sm"
          >
            Edit
          </Link>
        </div>

        <article className="prose py-6">
          <h4>Post Title</h4>
          <p>
            <small>
              Author: <Link to={'/profile/user.username'}>user.username</Link>
            </small>
            <br />
            <small>Created on: post.created_at</small>
            <br />
            <small>Updated on: post.updated_at</small>
          </p>
        </article>
        <hr className="border-accent" />

        <span>post.content</span>
      </div>
    );
  }
}

export default Post;
