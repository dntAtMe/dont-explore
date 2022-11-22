export type NodeType = 'folder' | 'file';

export type NodeData = {
	type: NodeType,
	name: string,
};

export type Dimensions = {
	x: number,
	y: number,
};