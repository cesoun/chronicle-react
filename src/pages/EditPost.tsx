import React from 'react';
import { FormInput } from '../components/FromInput';
import PreviewModal from '../components/PreviewModal';
import { PostInputStates } from '../interfaces/state/PostInputStates';
import { validatePost } from '../utils/Validators';

interface InputStates extends PostInputStates {
  id: number;
}

class EditPost extends React.Component<{}, InputStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      id: -1,
      title: '',
      content: '',
      previewContent: '',
      valid: false,
      didError: {
        title: undefined,
        content: undefined,
      },
      validate: false,
    };
  }

  // TODO: Load the Post
  componentDidMount() {
    this.setState({ id: 1, title: 'Title', content: 'content' });
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<PostInputStates>,
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
    this.setState({ previewContent: '<h1>Testing</h1>' });
  };

  // TODO: Handle Post Update
  handleSubmit = (ev: any) => {
    ev.preventDefault();
  };

  validate = () => {
    if (!this.state.validate) return;

    const { title, content } = this.state;
    const { didTitle, didContent } = validatePost(title, content);

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
          <h2>Edit Post</h2>
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
              required: true,
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
              required: true,
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
              onClick={this.handlePreview}
            >
              Preview
            </label>
            <button
              type="submit"
              className="btn btn-primary w-32"
              disabled={!this.state.valid}
            >
              Update
            </button>
          </div>
        </form>

        <PreviewModal value={this.state.previewContent} />
      </div>
    );
  }
}

export default EditPost;
