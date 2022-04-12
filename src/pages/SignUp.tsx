import React from 'react';
import { FormInput } from '../components/FromInput';
import { Link } from 'react-router-dom';
import FormToggle from '../components/FormToggle';

interface InputStates {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  toggle: boolean;
  valid: boolean;
  didError: {
    email: boolean | undefined;
    username: boolean | undefined;
    password: boolean | undefined;
    confirmPassword: boolean | undefined;
  };
  validate: boolean;
}

class SignUp extends React.Component<{}, InputStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      toggle: false,
      valid: false,
      didError: {
        email: undefined,
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
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
      case 'email':
        this.setState({ email: value, validate: true });
        break;
      case 'username':
        this.setState({ username: value, validate: true });
        break;
      case 'password':
        this.setState({ password: value, validate: true });
        break;
      case 'confirmPassword':
        this.setState({ confirmPassword: value, validate: true });
        break;
      case 'toggle':
        value = ev.target.checked;
        this.setState({ toggle: value, validate: true });
        break;
    }
  };

  validate = () => {
    if (!this.state.validate) return;

    const emailExp =
      '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
    const usernameExp = '[a-zA-Z0-9]{1,16}$';
    const passwordExp =
      '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))).{8,32}$';

    const { email, username, password, confirmPassword } = this.state;

    // Validate email.
    let didEmail = email.match(emailExp) !== null;
    // Validate username.
    let didUsername = username.match(usernameExp) !== null;
    // Validate password.
    let didPassword = password.match(passwordExp) !== null;
    // Confirm password.
    let didConfirmPassword =
      confirmPassword !== '' && confirmPassword === password;

    this.setState({
      valid:
        didEmail && didUsername && didPassword && didConfirmPassword && true,
      didError: {
        email: !didEmail,
        username: !didUsername,
        password: !didPassword,
        confirmPassword: !didConfirmPassword,
      },
      validate: false,
    });
  };

  render() {
    return (
      <div className="flex flex-col gap-8">
        <article className="prose text-center">
          <h1>Sign-Up</h1>
          <p>Glad you could join us, we've got golang and algorithms!</p>
          <hr className="bg-accent" />
        </article>

        {/*<div className="alert alert-warning shadow-lg">*/}
        {/*  <div>*/}
        {/*    <p>Warning</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="alert alert-error shadow-lg">*/}
        {/*  <div>*/}
        {/*    <p>Error</p>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <form>
          <FormInput
            input={{
              type: 'email',
              name: 'email',
              id: 'email',
              placeholder: 'internet.enjoyer@email.ext',
              altText: 'Your virtual inbox',
              errorText: 'Letters a-Z, 0-9 only please.',
            }}
            state={{
              value: this.state.email,
              setState: this.handleChange,
              didError: this.state.didError.email,
            }}
          />

          <FormInput
            input={{
              type: 'text',
              name: 'username',
              id: 'username',
              placeholder: 'superuser41',
              altText: 'What should we call you?',
              errorText: 'Letters a-Z, 0-9 only please.',
            }}
            state={{
              value: this.state.username,
              setState: this.handleChange,
              didError: this.state.didError.username,
            }}
          />

          <FormInput
            input={{
              type: this.state.toggle ? 'text' : 'password',
              name: 'password',
              id: 'password',
              placeholder: '********',
              altText: (
                <FormToggle
                  state={this.state.toggle}
                  setState={this.handleChange}
                />
              ),
              errorText:
                'Need 3/4 of these: [0-9], [a-zA-Z], [`~!@#,...]. Len: 8-32',
            }}
            state={{
              value: this.state.password,
              setState: this.handleChange,
              didError: this.state.didError.password,
            }}
          />

          <FormInput
            input={{
              type: this.state.toggle ? 'text' : 'password',
              name: 'confirm password',
              id: 'confirmPassword',
              placeholder: '********',
              altText: '',
              errorText: 'Passwords do not match!',
            }}
            state={{
              value: this.state.confirmPassword,
              setState: this.handleChange,
              didError: this.state.didError.confirmPassword,
            }}
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-between mt-8">
            <Link
              to={'/login'}
              className="btn btn-ghost btn-outline flex-grow"
            >
              Login
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex-grow"
              disabled={!this.state.valid}
            >
              Sign-Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUp;
