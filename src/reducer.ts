import { NodeData } from "./types";
import { AnyAction } from 'redux'


export interface AppState {
  nodes: NodeData[];
};

export const initialState: AppState = {
  nodes: [],
};

const rootReducer = (state = initialState, action: AnyAction) => {
  console.log(action.type, action.payload);
  if (action.type === 'setNodes' && (action.payload as NodeData[])) {
    console.log('yup');
    return {
      ...state,
      nodes: action.payload
    }
  }

  return state;
};

export default rootReducer;