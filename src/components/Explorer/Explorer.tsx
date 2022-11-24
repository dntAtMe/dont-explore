import { ExplorerProps } from "./types";
import Node from "../Node/Node";
import "./Explorer.scss";

export const Explorer = (props: ExplorerProps) => {
	return (
		<div className="d-flex flex-wrap explorer">
				{props.structure.map((nodeData) =>
					<Node data={nodeData} onNodeClick={props.onNodeClick} />
				)}
		</div>
	)
};

export default Explorer;