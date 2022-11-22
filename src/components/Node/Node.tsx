import { NodeProps } from "./types";
import "./Node.scss";

export const Node = ({ data }: NodeProps) => {
	return (
		<div className='text-center node d-flex flex-column'>
			<i className=  { data.type === 'file' ? 'bi bi-file-earmark' : 'bi bi-folder' }></i>	
			<span className="node_name">{data.name}</span>
		</div>
	)
};

export default Node;