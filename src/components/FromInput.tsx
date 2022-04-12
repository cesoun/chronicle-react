import React from 'react';

export interface FormProps {
  input: {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    altText: string | React.ComponentElement<any, any>;
    errorText: string;
  };
  state: {
    value: string;
    setState: Function;
    didError: boolean | undefined;
  };
}

export class FormInput extends React.Component<FormProps, {}> {
  constructor(props: FormProps) {
    super(props);
  }

  getClasses = () => {
    const { state } = this.props;
    if (state.didError === undefined) return null;
    if (state.didError) {
      return 'input-error';
    }

    return 'input-success';
  };

  render() {
    const { input, state } = this.props;

    return (
      <>
        {/* Input */}
        <div className="form-control">
          <label
            htmlFor={input.id}
            className="label"
          >
            <span className="label-text capitalize">{input.name}</span>
            <span className="label-text-alt">{input.altText}</span>
          </label>
          <input
            type={input.type}
            className={`input input-bordered ${this.getClasses()}`}
            id={input.id}
            placeholder={input.placeholder}
            value={state.value}
            onChange={(ev) => state.setState(ev, input.id)}
            required
          />
        </div>
        <label
          htmlFor={input.id}
          className="label"
        >
          {state.didError && (
            <span className="label-text-alt text-error">{input.errorText}</span>
          )}
        </label>
      </>
    );
  }
}
