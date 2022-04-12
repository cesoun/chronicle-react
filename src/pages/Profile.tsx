import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component<{}, {}> {
  render() {
    return (
      <div className="flex flex-col min-w-full md:w-3/4">
        {/*<div className="alert alert-error">*/}
        {/*  <div>*/}
        {/*    <span>Error</span>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/* Header */}
        <article className="prose max-w-full prose-ul:list-none prose-ul:p-0 prose-a:no-underline text-center">
          <h1 className="text-3xl">Username</h1>
          <ul className="text-sm text-secondary">
            <li>id: user.id</li>
            <li>role: user.role</li>
            <li>First, Last | Full name</li>
          </ul>
        </article>

        {/* Edit User Button */}
        <div className="flex justify-center">
          <Link
            to={'/profile/:id/edit'}
            className="btn btn-sm btn-ghost"
          >
            Edit
          </Link>
        </div>

        {/* Divider */}
        <div className="pt-4 max-w-3/4">
          <h1>Recent Posts</h1>
          <hr className="border-accent" />
        </div>

        {/* Recent Posts Component */}
      </div>
    );
  }
}

export default Profile;
