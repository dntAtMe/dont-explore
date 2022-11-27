import {expect, jest, test, describe, beforeEach, it} from '@jest/globals';
import { NodeData } from '../../types';
import Node from "../Node";

describe("When node is created", () => {
	let directoryData: NodeData;
	let textData: NodeData;
	let otherData: NodeData;

  let node: Node;

  beforeEach(() => {
		directoryData = {
			mode: 'dr-sr-sr-x',
			modification_date: 100,
			name: 'directory',
			size: 0,
		};

		textData = {
			mode: '-r-sr-sr-x',
			modification_date: 100,
			name: 'file',
			size: 120,
		};
		otherData = {
			mode: 'lr-sr-sr-x',
			modification_date: 100,
			name: 'file',
			size: 120,
		};
  });

  it("should hold correct values", () => {
		node = new Node(directoryData);

		expect(node.name).toEqual(directoryData.name);
		expect(node.modification_timestamp).toEqual(directoryData.modification_date);
		expect(node.size).toEqual(directoryData.size);
  });

  it("from directory, should parse file mode correctly", () => {
		node = new Node(directoryData);

		expect(node.mode.type).toEqual('directory');
  });

  it("from text file, should parse file mode correctly", () => {
		node = new Node(textData);

		expect(node.mode.type).toEqual('file');
  });

  it("from other types, should parse file mode correctly", () => {
		node = new Node(otherData);

		expect(node.mode.type).toEqual('unsupported');
  });

  it("should compare to another node correctly", () => {
		const node1 = new Node(directoryData);
		const node2 = new Node(textData);

		expect(node2.compareTo(node1)).toEqual(-1);
  });
});