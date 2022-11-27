import { FileMode } from "./types";

export function parseFileMode(s: string): FileMode {
  if (s.startsWith('-'))
    return { type: 'file' };

  if (s.startsWith('d'))
    return { type: 'directory' };

  return { type: 'unsupported' };
}