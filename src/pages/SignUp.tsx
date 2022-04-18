import React, { useEffect, useState } from 'react';
import { FormInput } from '../components/FromInput';
import { Link } from 'react-router-dom';
import FormToggle from '../components/FormToggle';
import UseAuth from '../hooks/UseAuth';

function SignUp() {
  const { error, registerUser } = UseAuth();

  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [toggle, setToggle] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);

  const [didEmail, setDidEmail] = useState<undefined | boolean>(undefined);
  const [didUsername, setDidUsername] = useState<undefined | boolean>(
    undefined
  );
  const [didPassword, setDidPassword] = useState<undefined | boolean>(
    undefined
  );
  const [didConfirmPassword, setDidConfirmPassword] = useState<
    undefined | boolean
  >(undefined);

  useEffect(() => {
    validate();
  });

  const handleChange = (ev: any, sender: string) => {
    let value = ev.target.value;
    switch (sender) {
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'toggle':
        value = ev.target.checked;
        setToggle(value);
        return;
    }

    setShouldValidate(true);
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    if (!valid) return;

    await registerUser({
      username: username,
      password: password,
      email: email,
    });
  };

  const validate = () => {
    if (!shouldValidate) return;

    const emailExp =
      '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
    const usernameExp = '[a-zA-Z0-9]{1,16}$';
    const passwordExp =
      '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))).{8,32}$';

    // Validate email.
    let didEmail = email.match(emailExp) !== null;
    // Validate username.
    let didUsername = username.match(usernameExp) !== null;
    // Validate password.
    let didPassword = password.match(passwordExp) !== null;
    // Confirm password.
    let didConfirmPassword =
      confirmPassword !== '' && confirmPassword === password;

    setValid(
      didEmail && didUsername && didPassword && didConfirmPassword && true
    );

    setDidEmail(!didEmail);
    setDidUsername(!didUsername);
    setDidPassword(!didPassword);
    setDidConfirmPassword(!didConfirmPassword);
    setShouldValidate(false);
  };

  return (
    <div className="flex flex-col gap-8 max-w-3/4">
      <article className="prose text-center max-w-full">
        <h1>Sign-Up</h1>
        <p>Glad you could join us, we've got golang and algorithms!</p>
        <hr className="border-primary" />
      </article>

      {error && (
        <div className="alert alert-error shadow-lg">
          <div>
            <span>{error.msg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <FormInput
          input={{
            type: 'email',
            required: true,
            name: 'email',
            id: 'email',
            placeholder: 'internet.enjoyer@email.ext',
            altText: 'Your virtual inbox',
            errorText: 'Letters a-Z, 0-9 only please.',
          }}
          state={{
            value: email,
            setState: handleChange,
            didError: didEmail,
          }}
        />

        {/* Username */}
        <FormInput
          input={{
            type: 'text',
            required: true,
            name: 'username',
            id: 'username',
            placeholder: 'superuser41',
            altText: 'What should we call you?',
            errorText: 'Letters a-Z, 0-9 only please.',
          }}
          state={{
            value: username,
            setState: handleChange,
            didError: didUsername,
          }}
        />

        {/* Password */}
        <FormInput
          input={{
            type: toggle ? 'text' : 'password',
            required: true,
            name: 'password',
            id: 'password',
            placeholder: '********',
            altText: (
              <FormToggle
                state={toggle}
                setState={handleChange}
              />
            ),
            errorText:
              'Need 3/4 of these: [0-9], [a-zA-Z], [`~!@#,...]. Len: 8-32',
          }}
          state={{
            value: password,
            setState: handleChange,
            didError: didPassword,
          }}
        />

        {/* ConfirmPassword */}
        <FormInput
          input={{
            type: toggle ? 'text' : 'password',
            required: true,
            name: 'confirm password',
            id: 'confirmPassword',
            placeholder: '********',
            altText: '',
            errorText: 'Passwords do not match!',
          }}
          state={{
            value: confirmPassword,
            setState: handleChange,
            didError: didConfirmPassword,
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
            disabled={!valid}
          >
            Sign-Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
