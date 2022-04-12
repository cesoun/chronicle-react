import React from 'react';

class Posts extends React.Component<{}, {}> {
  render() {
    return (
      <div className="flex flex-col">
        <article className="prose">
          <h1>Posts</h1>
          <p>
            There has to be at least one thing in this ol' database worth
            reading. If not then it might be a you thing... definitely not a me
            thing, im perfect.
          </p>
          <hr className="border-accent" />
        </article>

        {/* Post Paginator */}
      </div>
    );
  }
}

export default Posts;
