import { ExplorerProps } from "./types";
import NodeTile from "../NodeTile/NodeTile";
import "./Explorer.scss";
import { invoke } from "@tauri-apps/api";
import { useDispatch } from "react-redux";
import { AppState } from "../../reducer";
import Header from "../Header/Header";
import { useEffect, useMemo, useState } from "react";
import Path from "../../utils/Path/Path";
import Node from "../../utils/Node/Node";

export const Explorer = (props: ExplorerProps) => {
  const dispatch = useDispatch();
  const [currentPath, setCurrentPath] = useState<Path>(Path.root());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const filterNodes = (nodes: Node[]): Node[] => props.structure
    .filter((n) => n.name.includes(searchKeyword))
    .sort((a, b) => b.compareTo(a));

  const filteredNodes = useMemo(() => {
    return filterNodes(props.structure);
  }, [searchKeyword, props.structure]);

  const onNodeClick = async(node: Node) => {
    // For now we're only interested in directories to change path
    if (node.mode.type !== 'directory') return;

    setIsLoading(true);
    currentPath.go(node.name);

    invoke("change_path", {  path: currentPath.get()}).then((v: any) => {
      setSearchKeyword('');
      console.log('Success');
      dispatch({ type: 'setNodes', payload: v});
    }).catch((e) => { 
      console.log(e)
    }).finally(() => {
      setIsLoading(true);
    });
  }

  const onGoBackClick = async() => {
    setIsLoading(true);
    const didGoBack = currentPath.goBack();

    if (didGoBack) {
      invoke("change_path", {  path: currentPath.get()}).then((v: any) => { 
        setSearchKeyword('');
        console.log('Success');
        dispatch({ type: 'setNodes', payload: v});
      }).catch((e) => { 
        console.log(e)
      }).finally(() => {
        setIsLoading(true);
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
            <NodeTile data={nodeData} onNodeClick={onNodeClick} />
          )}
      </div>
    </>
  )
};

export default Explorer;