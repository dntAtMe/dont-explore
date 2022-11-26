import { ExplorerProps } from "./types";
import Node from "../Node/Node";
import "./Explorer.scss";
import { NodeData } from "../../types";
import { invoke } from "@tauri-apps/api";
import { useDispatch } from "react-redux";
import { AppState } from "../../reducer";
import Header from "../Header/Header";
import { useMemo, useState } from "react";
import Path from "../../utils/Path";

export const Explorer = (props: ExplorerProps) => {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState<Path>(Path.root());
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filterNodes = (nodes: NodeData[]): NodeData[] => props.structure.filter((n) => n.name.includes(searchKeyword));

  const filteredNodes = useMemo(() => {
    return filterNodes(props.structure);
  }, [searchKeyword, props.structure]);

  const onNodeClick = async(data: NodeData) => {
    currentPath.go(data.name);
    invoke("change_path", {  path: currentPath.get()}).then((v: any) => {
      setSearchKeyword('');
      console.log('Success');
      dispatch({ type: 'setNodes', payload: v});
    }).catch((e) => { 
      console.log(e)
    });
  }

  const onGoBackClick = async() => {
    const didGoBack = currentPath.goBack();

    if (didGoBack) {
      invoke("change_path", {  path: currentPath.get()}).then((v: any) => { 
        setSearchKeyword('');
        console.log('Success');
        dispatch({ type: 'setNodes', payload: v});
      }).catch((e) => { 
        console.log(e)
      });
    }
  };
  
  const onSearch = (key: string) => {
    console.log('seach', key)
    setSearchKeyword(key);
  };

  return (
    <>
      <Header onSearch={onSearch} onClick={onGoBackClick} />
      <div className="d-flex flex-wrap explorer">
          {filteredNodes.map((nodeData) =>
            <Node data={nodeData} onNodeClick={onNodeClick} />
          )}
      </div>
    </>
  )
};

export default Explorer;