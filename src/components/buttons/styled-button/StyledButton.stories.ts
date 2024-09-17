import StyledButton from "./StyledButton";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StyledButton> = {
    title: "Components/Buttons/StyledButton",
    component: StyledButton,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StyledButton>;

export const NotActive: Story = {
    args: {
        isActive: false,
        children: "Not Active",
    },
};

export const Active: Story = {
    args: {
        isActive: true,
        children: "Active",
    },
};

export const WithOnClick: Story = {
    args: {
        children: "Active",
        onClick: () => alert("clicked"),
    },
};
