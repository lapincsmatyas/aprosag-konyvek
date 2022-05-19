// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import {StepperComponent} from "./stepper.component";
import {within} from '@storybook/testing-library'

export default {
  title: 'Aprosag/Stepper',
  component: StepperComponent,
} as Meta;

const Template: Story<StepperComponent> = (args: StepperComponent) => ({
  props: args,
});

export const WithValue = Template.bind({});
WithValue.args = {
  value: 3
};
WithValue.play = async ({ canvasElement}) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button'));
}

export const AllowingZero = Template.bind({});
AllowingZero.args = {
  allowZero: true
};

export const WithMaxValue = Template.bind({});
WithMaxValue.args = {
  maxValue: 10
};

