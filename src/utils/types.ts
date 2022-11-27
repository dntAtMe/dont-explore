export type NodeData = {
	mode: string,
	name: string,
	size: number,
	modification_date: number,
};

// TODO: Support all types of files
// https://docs.oracle.com/cd/E19120-01/open.solaris/819-3321/secfile-60/index.html
export type FileType = 'file' | 'directory' | 'unsupported'

// TODO: Support permission flags
export type FileMode = {
	type: FileType
}
