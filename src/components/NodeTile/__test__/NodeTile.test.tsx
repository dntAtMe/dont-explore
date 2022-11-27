import { describe, it } from "@jest/globals";
import {fireEvent, render, screen} from '@testing-library/react'
import Node from "../../../utils/Node/Node";
import NodeTile from "../NodeTile";

describe('When NodeTile is rendered', () => {
  const node = new Node({
    mode: 'dr-sr-sr-x',
    modification_date: 100,
    name: 'directory',
    size: 120,
  });  

  it("it should render properly", () => {
    const { asFragment } = render(<NodeTile onNodeClick={jest.fn} data={node} />)
    expect(asFragment()).toMatchSnapshot();
  });

  it("Clicking it should call onClick function", () => {
    const fn = jest.fn();
    render(<NodeTile onNodeClick={fn} data={node} />)

    const tile = screen.getByTestId("node");
    fireEvent.click(tile);

    expect(fn).toBeCalled();
  });
});