import { NodeTileProps } from "./types";
import "./NodeTile.scss";

export const NodeTile = ({ data, onNodeClick }: NodeTileProps) => {

  const onClick = () => {
    onNodeClick(data);
  };

  return (
    <div onClick={onClick} className='text-center node d-flex flex-column'>
      <i className=  { data.mode.type === 'directory' ? 'bi bi-folder' : 'bi bi-file-earmark' }></i>	
      <span className="node_name">{data.name}</span>
    </div>
  )
};

export default NodeTile;