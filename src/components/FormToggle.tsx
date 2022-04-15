import React from 'react';

interface FormToggleProps {
  state: boolean;
  setState: Function;
}

class FormToggle extends React.Component<FormToggleProps, {}> {
  render() {
    const { state, setState } = this.props;

    return (
      <input
        type="checkbox"
        className="toggle toggle-xs"
        checked={state ? state : false}
        onChange={(ev) => setState(ev, 'toggle')}
      />
    );
  }
}

export default FormToggle;
