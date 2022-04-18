import React, { useEffect, useState } from 'react';
import { User } from '../interfaces/models/UserModels';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../services/UserService';
import ErrorModel, {
  InstanceOfErrorModel,
} from '../interfaces/models/ErrorModel';
import { FormInput } from '../components/FromInput';
import FormToggle from '../components/FormToggle';
import UseAuth from '../hooks/UseAuth';

function EditProfile() {
  const { logoutUser } = UseAuth();

  const [user, setUser] = useState<null | User>(null);
  const { username } = useParams();

  const [uname, setUname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const [didUname, setDidUname] = useState<undefined | boolean>(undefined);
  const [didPassword, setDidPassword] = useState<undefined | boolean>(
    undefined
  );
  const [didConfirmPassword, setDidConfirmPassword] = useState<
    undefined | boolean
  >(undefined);
  const [didOldPassword, setDidOldPassword] = useState<undefined | boolean>(
    undefined
  );
  const [didFirstname, setDidFirstname] = useState<undefined | boolean>(
    undefined
  );
  const [didLastname, setDidLastname] = useState<undefined | boolean>(
    undefined
  );

  const [toggle, setToggle] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);
  const [shouldValidate, setShouldValidate] = useState<boolean>(false);

  const [error, setError] = useState<null | ErrorModel>(null);

  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getUserByUsername();
    }

    validate();
  }, [uname, firstname, lastname, password, confirmPassword, oldPassword]);

  const getUserByUsername = async () => {
    if (!username) {
      navigate('/');
      return;
    }

    const res = await UserService.getUserByUsername(username);
    if (InstanceOfErrorModel(res)) {
      navigate('/');
      return;
    }

    let user = res as User;

    setUser(user);
    setUname(user.username);
    setFirstname(user.first_name || '');
    setLastname(user.last_name || '');
  };

  const handleSubmit = async (ev: any) => {
    ev.preventDefault();

    if (!valid) return;

    const res = await UserService.putUserById(user!.id!, {
      new: {
        username: uname,
        first_name: firstname,
        last_name: lastname,
        password: password,
        role: user!.role,
      },
      password: oldPassword,
    });

    if (InstanceOfErrorModel(res)) {
      setError(res as ErrorModel);
      return;
    }

    logoutUser();
  };

  const handleChange = (ev: any, sender: string) => {
    let value = ev.target.value;

    switch (sender) {
      case 'uname':
        setUname(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'oldPassword':
        setOldPassword(value);
        break;
      case 'firstname':
        setFirstname(value);
        break;
      case 'lastname':
        setLastname(value);
        break;
      case 'toggle':
        value = ev.target.checked;
        setToggle(value);
        return;
    }

    setShouldValidate(true);
  };

  const validate = () => {
    if (!shouldValidate) return;

    const usernameExp = '[a-zA-Z0-9]{1,16}$';
    const passwordExp =
      '^(?:(?:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]))|(?:(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))|(?:(?=.*[0-9])(?=.*[a-z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\\\\]))).{8,32}$';

    let didUsername = uname.match(usernameExp) !== null;
    let didPassword = password.match(passwordExp) !== null;
    let didConfirmPassword =
      confirmPassword !== '' && confirmPassword === password;
    let didOldPassword = oldPassword.match(passwordExp) !== null;
    let didFirstname = firstname.length > 0 && firstname.length <= 32;
    let didLastname = lastname.length > 0 && lastname.length <= 32;

    setValid(
      didUsername &&
        didPassword &&
        didConfirmPassword &&
        didOldPassword &&
        didFirstname &&
        didLastname &&
        true
    );

    setDidUname(!didUsername);
    setDidPassword(!didPassword);
    setDidConfirmPassword(!didConfirmPassword);
    setDidOldPassword(!didOldPassword);
    setDidFirstname(!didFirstname);
    setDidLastname(!didLastname);

    setShouldValidate(false);
  };

  if (!user) {
    return <p className="btn btn-ghost loading">Loading User...</p>;
  }

  return (
    <div className="flex flex-col gap-8 min-w-full md:w-3/4">
      <article className="prose">
        <h2>Edit Profile</h2>
      </article>
      <hr className="border-primary" />

      {error && (
        <div className="alert alert-error">
          <div>
            <span>{error.msg}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <FormInput
          input={{
            type: 'text',
            required: true,
            name: 'username',
            id: 'uname',
            placeholder: 'superuser41',
            altText: 'What should we call you?',
            errorText: 'Letters a-Z, 0-9 only please.',
          }}
          state={{
            value: uname,
            setState: handleChange,
            didError: didUname,
          }}
        />

        {/* Firstname */}
        <FormInput
          input={{
            type: 'text',
            required: true,
            name: 'firstname',
            id: 'firstname',
            placeholder: 'John',
            altText: 'What do people call you?',
            errorText: 'Max Length 32',
          }}
          state={{
            value: firstname,
            setState: handleChange,
            didError: didFirstname,
          }}
        />

        {/* Lastname */}
        <FormInput
          input={{
            type: 'text',
            required: true,
            name: 'lastname',
            id: 'lastname',
            placeholder: 'Doe',
            altText: `Your name's closing brace`,
            errorText: 'Max Length 32',
          }}
          state={{
            value: lastname,
            setState: handleChange,
            didError: didLastname,
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

        <hr className="border-primary my-4" />

        {/* Current Password */}
        <FormInput
          input={{
            type: toggle ? 'text' : 'password',
            required: true,
            name: 'current password',
            id: 'oldPassword',
            placeholder: '********',
            altText: '',
            errorText:
              'Need 3/4 of these: [0-9], [a-zA-Z], [`~!@#,...]. Len: 8-32',
          }}
          state={{
            value: oldPassword,
            setState: handleChange,
            didError: didOldPassword,
          }}
        />

        <div className="flex justify-end gap-4">
          <button
            className="btn btn-primary"
            disabled={!valid}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
