import React from 'react';
import { FormInput } from '../components/FromInput';

interface InputStates {
  title: string;
  content: string;
  valid: boolean;
  didError: {
    title: boolean | undefined;
    content: boolean | undefined;
  };
  validate: boolean;
}

class NewPost extends React.Component<{}, InputStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: '',
      content: '',
      valid: false,
      didError: {
        title: undefined,
        content: undefined,
      },
      validate: false,
    };
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<InputStates>,
    snapshot?: any
  ) {
    this.validate();
  }

  handleChange = (ev: any, sender: string) => {
    let value = ev.target.value;
    switch (sender) {
      case 'title':
        this.setState({ title: value, validate: true });
        break;
      case 'content':
        this.setState({ content: value, validate: true });
        break;
    }
  };

  // TODO: Handle Post Preview
  handlePreview = (ev: any) => {
    ev.preventDefault();
  };

  // TODO: Handle Post Submit
  handleSubmit = (ev: any) => {
    ev.preventDefault();
  };

  validate = () => {
    if (!this.state.validate) return;

    const titleMin = 5;
    const titleMax = 255;
    const contentMin = 35;
    const contentMax = 65535;

    const { title, content } = this.state;

    let didTitle = title.length >= titleMin && title.length <= titleMax;
    let didContent =
      content.length >= contentMin && content.length <= contentMax;

    this.setState({
      valid: didTitle && didContent && true,
      didError: {
        title: !didTitle,
        content: !didContent,
      },
      validate: false,
    });
  };

  render() {
    return (
      <div className="flex flex-col min-w-full md:w-3/4 gap-8">
        <article className="prose">
          <h2>New Post</h2>
        </article>

        <hr className="border-accent" />

        {/*<div className="alert alert-error">*/}
        {/*  <span>Error</span>*/}
        {/*</div>*/}

        {/*<div className="alert alert-warning">*/}
        {/*  <span>Warning</span>*/}
        {/*</div>*/}

        <form onSubmit={this.handleSubmit}>
          {/* Title */}
          <FormInput
            input={{
              type: 'text',
              name: 'title',
              id: 'title',
              placeholder: 'Hello, Wonderful!',
              altText: 'Simple, Sweet & Informative',
              errorText: 'Min length: 5, Max length: 255',
            }}
            state={{
              value: this.state.title,
              setState: this.handleChange,
              didError: this.state.didError.title,
            }}
          />

          {/* Content */}
          <FormInput
            input={{
              type: 'textarea',
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
              value: this.state.content,
              setState: this.handleChange,
              didError: this.state.didError.content,
            }}
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-end mt-8">
            <label
              className="btn btn-ghost btn-outline w-32"
              htmlFor="preview-modal"
              // onClick={this.handleSubmit}
            >
              Preview
            </label>
            <button
              type="submit"
              className="btn btn-primary w-32"
              disabled={!this.state.valid}
            >
              Create
            </button>
          </div>
        </form>

        <input
          type="checkbox"
          name="preview-modal"
          id="preview-modal"
          className="modal-toggle"
        />
        <div className="modal cursor-pointer modal-bottom sm:modal-middle">
          <div className="modal-box">
            <article
              className="prose"
              id="preview-modal"
            >
              <h1>Title</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <h2>Subheading</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <h3>Subheading</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi,
                asperiores dolore eveniet fuga ipsa nesciunt odio repudiandae
                sed velit. A animi autem laboriosam laborum minus neque, nisi
                praesentium quia voluptatem?
              </p>
            </article>
            <div className="modal-action">
              <label
                htmlFor="preview-modal"
                className="btn"
              >
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewPost;
