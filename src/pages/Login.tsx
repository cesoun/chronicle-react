import React from 'react';
import { FormInput } from '../components/FromInput';
import { Link } from 'react-router-dom';

interface InputStates {
  username: string;
  password: string;
  valid: boolean;
  didError: {
    username: boolean | undefined;
    password: boolean | undefined;
  };
  validate: boolean;
}

class Login extends React.Component<{}, InputStates> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: '',
      password: '',
      valid: false,
      didError: {
        username: undefined,
        password: undefined,
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
      case 'username':
        this.setState({ username: value, validate: true });
        break;
      case 'password':
        this.setState({ password: value, validate: true });
        break;
    }
  };

  // TODO: Handle Login
  handleSubmit = (ev: any) => {
    ev.preventDefault();
  };

  validate = () => {
    if (!this.state.validate) return;

    const usernameExp = '[a-zA-Z0-9]{1,16}$';
    const passwordExp =
      '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))).{8,32}$';

    const { username, password } = this.state;

    let didUsername = username.match(usernameExp) !== null;
    let didPassword = password.match(passwordExp) !== null;

    this.setState({
      valid: didUsername && didPassword && true,
      didError: {
        username: !didUsername,
        password: !didPassword,
      },
      validate: false,
    });
  };

  render() {
    return (
      <div className="flex flex-col gap-8">
        <article className="prose text-center">
          <h1>Login</h1>
          <p>
            Welcome back! A lot has happened while you were gone, I think...
          </p>
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

        <form onSubmit={this.handleSubmit}>
          {/* Username */}
          <FormInput
            input={{
              type: 'text',
              required: true,
              name: 'username',
              id: 'username',
              placeholder: 'superuser41',
              altText: '',
              errorText: 'Letters a-Z, 0-9 only please.',
            }}
            state={{
              value: this.state.username,
              setState: this.handleChange,
              didError: this.state.didError.username,
            }}
          />

          {/* Password */}
          <FormInput
            input={{
              type: 'password',
              required: true,
              name: 'password',
              id: 'password',
              placeholder: '********',
              altText: '',
              errorText:
                'Need 3/4 of these: [0-9], [a-zA-Z], [`~!@#,...]. Len: 8-32',
            }}
            state={{
              value: this.state.password,
              setState: this.handleChange,
              didError: this.state.didError.password,
            }}
          />

          {/* Buttons */}
          <div className="flex gap-4 justify-between mt-8">
            <Link
              to={'/signup'}
              className="btn btn-ghost btn-outline flex-grow"
            >
              Sign-Up
            </Link>
            <button
              type="submit"
              className="btn btn-primary flex-grow"
              disabled={!this.state.valid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
