import {expect, jest, test, describe, beforeEach, it} from '@jest/globals';


import Path from "../Path";

describe("When user", () => {
	let path: Path;

	beforeEach(() => {
		path = Path.root();
	});

	it("is in root, object should contain valid path", () => {
		expect(path.get()).toEqual('/');
	});

	it("goes back to root, object should contain valid path", () => {
		path = new Path('/test');
	
		expect(path.get()).toEqual('/test/');

		const ret = path.goBack();

		expect(path.get()).toEqual('/');
		expect(ret).toEqual(true);
	});

	it("goes back from root, object should contain valid path", () => {
		const ret = path.goBack();

		expect(path.get()).toEqual('/');
		expect(ret).toEqual(false);
	});

	it ("goes to location, object should contain valid path", () => {
		path.go('test2');

		expect(path.get()).toEqual('/test2/');
	});
});