import PercentModify from "./PercentModify";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PercentModify> = {
    title: "Components/Percent-Modify/PercentModify",
    component: PercentModify,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PercentModify>;

export const Advantage: Story = {
    args: {
        value: 5,
    },
};

export const Disadvantage: Story = {
    args: {
        value: -5,
    },
};
