import React from 'react';
import { FormProps } from '../interfaces/props/FormProps';

export class FormInput extends React.Component<FormProps, {}> {
  getClasses = () => {
    const { state, input } = this.props;
    const isTextarea = input.type === 'textarea';

    if (state.didError === undefined) return null;
    if (state.didError) {
      return isTextarea ? 'textarea-error' : 'input-error';
    }

    return isTextarea ? 'textarea-success' : 'input-success';
  };

  render() {
    const { input, state } = this.props;

    if (input.type === 'textarea') {
      return (
        <>
          {/* Textarea */}
          <div className="form-control">
            <label
              htmlFor={input.id}
              className="label"
            >
              <span className="label-text capitalize">{input.name}</span>
              <span className="label-text-alt">{input.altText}</span>
            </label>
            <textarea
              className={`textarea textarea-bordered ${this.getClasses()}`}
              name={input.name}
              id={input.id}
              cols={30}
              rows={10}
              placeholder={input.placeholder}
              value={state.value}
              onChange={(ev) => state.setState(ev, input.id)}
              required
            ></textarea>
          </div>
        </>
      );
    } else {
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
              required={input.required}
            />
          </div>
          <label
            htmlFor={input.id}
            className="label"
          >
            {state.didError && (
              <span className="label-text-alt text-error">
                {input.errorText}
              </span>
            )}
          </label>
        </>
      );
    }
  }
}
