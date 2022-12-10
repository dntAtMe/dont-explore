import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from '../Input';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

const template: ComponentStory<typeof Input> = (args: any) => <Input {...args} />;

export const WithoutValidation = template.bind({});
export const WithValidation = template.bind({});

WithoutValidation.args = {};
WithValidation.args = {
  validate: (value: string) => value.length > 5,
}