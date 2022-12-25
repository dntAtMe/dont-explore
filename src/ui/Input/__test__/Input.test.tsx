import { describe, it } from "@jest/globals";
import {fireEvent, render, screen} from '@testing-library/react'
import Input from "../Input";
import { InputProps } from '../types';

describe('Input w/ validation', () => {
  const inputPropsOk: InputProps = {
    validate: jest.fn().mockReturnValue(true)
  };

  const inputPropsFail: InputProps = {
    validate: jest.fn().mockReturnValue(false)
  };

  it("should render properly when validation successful", () => {
    const rendered = render(<Input validate={inputPropsOk.validate} />)
    const input = rendered.getByTestId('test-input');

    fireEvent.input(input, { target: { value: 'test' } });

    expect(inputPropsOk.validate).toBeCalledTimes(1);
    expect(inputPropsOk.validate).toBeCalledWith('test');
    expect(rendered.asFragment()).toMatchSnapshot();
  });

  it("should render properly when validation failed", () => {
    const rendered = render(<Input validate={inputPropsFail.validate} />)
    const input = rendered.getByTestId('test-input');

    fireEvent.input(input, { target: { value: 'test' } });

    expect(inputPropsFail.validate).toBeCalledTimes(1);
    expect(inputPropsFail.validate).toBeCalledWith('test');
    expect(rendered.asFragment()).toMatchSnapshot();
  });
});

describe('Input w/out validation', () => {
  const inputProps: InputProps = { } as unknown as InputProps;

  it("should render properly", () => {
    const { asFragment } = render(<Input />)
    expect(asFragment()).toMatchSnapshot();
  });
});