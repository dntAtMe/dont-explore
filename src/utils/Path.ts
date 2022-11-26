import { assert } from "console";

class Path {
	private _path: string;

	constructor(path: string) {
		this._path = path.endsWith('/') ? path : path.concat('/');
	}

	static root() {
		return new Path('/');
	}

	get(): string {
		return this._path;
	}

	go(name: string) {
	 this._path =	this._path.concat(name, '/');
	}

	goBack(): boolean {
		const split = this._path.split('/');
		let wasLastPathValid = false;

		// last element is always empty, because path ends with "/" everytime
		split.pop();
		const last = split.pop();
		if (last && last.length > 0) {
			wasLastPathValid = true;
		}
		this._path = split.join('/')
		
		if (this._path.length !== 1)
			this._path = this._path.concat('/');

		return wasLastPathValid;
	}

}

export default Path;
