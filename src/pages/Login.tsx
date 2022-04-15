import React, { useEffect, useState } from 'react';
import { FormInput } from '../components/FromInput';
import { Link } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';

function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const [didErrorUsername, setDidErrorUsername] = useState<undefined | boolean>(
    undefined
  );
  const [didErrorPassword, setDidErrorPassword] = useState<undefined | boolean>(
    undefined
  );
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);

  const { error, loginUser } = UseAuth();

  useEffect(() => {
    validate();
  });

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    if (!valid) return;

    await loginUser({ username, password });
  };

  const handleChange = (ev: any, sender: string) => {
    const value = ev.target.value;
    switch (sender) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }

    setShouldValidate(true);
  };

  const validate = () => {
    if (!shouldValidate) return;

    const usernameExp = '[a-zA-Z0-9]{1,16}$';
    const passwordExp =
      '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))).{8,32}$';

    let didUsername = username.match(usernameExp) !== null;
    let didPassword = password.match(passwordExp) !== null;

    setValid(didUsername && didPassword && true);
    setDidErrorUsername(!didUsername);
    setDidErrorPassword(!didPassword);
    setShouldValidate(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <article className="prose text-center">
        <h1>Login</h1>
        <p>Welcome back! A lot has happened while you were gone, I think...</p>
        <hr className="bg-accent" />
      </article>

      {error && (
        <div className="alert alert-error shadow-lg">
          <div>{error.msg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
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
            value: username,
            setState: handleChange,
            didError: didErrorUsername,
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
            value: password,
            setState: handleChange,
            didError: didErrorPassword,
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
            disabled={!valid}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
