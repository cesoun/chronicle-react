import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <>
        <article className="prose prose-a:after:content-['_↗']">
          <h1>Welcome</h1>
          <p>
            <strong>Chronicle</strong> is a blogging application written
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

        <section className="pt-12">
          {/* TODO: Recent Posts Component */}
        </section>
      </>
    );
  }
}

export default Home;
