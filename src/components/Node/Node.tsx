import { NodeProps } from "./types";
import "./Node.scss";
import dayjs from "dayjs";
import { invoke } from "@tauri-apps/api";

export const Node = ({ data, onNodeClick }: NodeProps) => {

	const onClick = () => {
		onNodeClick(data);
	};

	return (
		<div onClick={onClick} className='text-center node d-flex flex-column'>
			<i className=  { data.mode.startsWith('d') ? 'bi bi-folder' : 'bi bi-file-earmark' }></i>	
			<span className="node_name">{data.name} {dayjs.unix(data.modification_date).toString()}</span>
		</div>
	)
};

export default Node;