import { ComponentStory, ComponentMeta } from '@storybook/react';
import Node from '../../../utils/Node/Node';
import NodeTile from "../NodeTile";

export default {
  title: 'NodeTile',
  component: NodeTile,
} as ComponentMeta<typeof NodeTile>;

const template: ComponentStory<typeof NodeTile> = (args: any) => <NodeTile {...args} />;

export const DirectoryTile = template.bind({});
export const FileTile = template.bind({});
DirectoryTile.args = {
  data: new Node({
    mode: 'dr-sr-sr-x',
    modification_date: 100,
    name: 'directory',
    size: 120,
  }),
  onNodeClick: () => {},
}
FileTile.args = {
  data: new Node({
    mode: 'fr-sr-sr-x',
    modification_date: 100,
    name: 'file',
    size: 120,
  }),
  onNodeClick: () => {},
}