import StyledError from "./StyledError";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StyledError> = {
    title: "Components/Errors/StyledError",
    component: StyledError,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StyledError>;

export const Default: Story = {
    args: {
        message: "Error",
        description: "Something went wrong",
    },
};
