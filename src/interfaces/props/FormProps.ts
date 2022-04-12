import React from 'react';

export interface FormProps {
  input: {
    type: string;
    required: boolean;
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
