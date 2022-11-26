import { NodeProps } from "./types";
import "./Node.scss";

export const Node = ({ data, onNodeClick }: NodeProps) => {

	const onClick = () => {
		onNodeClick(data);
	};

	return (
		<div onClick={onClick} className='text-center node d-flex flex-column'>
			<i className=  { data.mode.startsWith('d') ? 'bi bi-folder' : 'bi bi-file-earmark' }></i>	
			<span className="node_name">{data.name}</span>
		</div>
	)
};

export default Node;