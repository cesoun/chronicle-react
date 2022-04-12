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
