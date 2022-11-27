import { FileMode, NodeData } from "../types";
import { parseFileMode } from "../utils";

export default class Node {
  _data: NodeData;

  constructor(data: NodeData) {
    this._data = data;
    console.log(data.mode);
  }

  get mode(): FileMode {
    return parseFileMode(this._data.mode);
  };

  get modification_timestamp() {
    return this._data.modification_date;
  };

  get name() {
    return this._data.name;
  };

  get size() {
    return this._data.size;
  };

  compareTo(other: Node): number {
    if (this.mode < other.mode) return 1;
    if (this.mode > other.mode) return -1;

    if (this.name < other.name) return 1;
    if (this.name > other.name) return -1;

    return 0;
  }

};