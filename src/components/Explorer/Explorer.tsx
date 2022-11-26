import { ExplorerProps } from "./types";
import Node from "../Node/Node";
import "./Explorer.scss";
import { NodeData } from "../../types";
import { invoke } from "@tauri-apps/api";
import { useDispatch } from "react-redux";
import { AppState } from "../../reducer";

export const Explorer = (props: ExplorerProps) => {
	const dispatch = useDispatch();

	const onNodeClick = async(data: NodeData) => {
    invoke("change_path", {  path: data.name}).then((v: any) => { 
			console.log('Success');
			dispatch({ type: 'setNodes', payload: v});
    }).catch((e) => { 
			console.log(e)
		});
  }

	return (
		<div className="d-flex flex-wrap explorer">
				{props.structure.map((nodeData) =>
					<Node data={nodeData} onNodeClick={onNodeClick} />
				)}
		</div>
	)
};

export default Explorer;