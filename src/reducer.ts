import { AnyAction } from 'redux'
import { Node } from './utils/Node/Node';
import { NodeData } from './utils/types';


export interface AppState {
  nodes: Node[];
};

export const initialState: AppState = {
  nodes: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  console.log(action.type, action.payload);
  if (action.type === 'setNodes' && (action.payload as NodeData[])) {
    const nodes = action.payload as NodeData[];
    return {
      ...state,
      nodes: nodes.map((n) => new Node(n))
    }
  }

  return state;
};

export default rootReducer;