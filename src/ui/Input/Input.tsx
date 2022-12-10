import { useState } from 'react';
import { InputProps } from "./types";

import './Input.scss';

export const Input = ({ validate }: InputProps) => {

  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const onInput = (e: any) => {
    if (validate)
      setIsValid(validate(e.target.value))
  }

  const getValidationClassName = () => {
    switch (isValid) {
      case true:
        return 'valid';
      case false:
        return 'invalid';
      default:
        return 'neutral';
    }
  }

  return (
    <input className={`${getValidationClassName()}`} type="text" onInput={onInput} />
  )
};

export default Input;