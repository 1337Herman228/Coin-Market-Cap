import FavouriteBtn from "./FavouriteBtn";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FavouriteBtn> = {
    title: "Components/Buttons/FavouriteBtn",
    component: FavouriteBtn,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FavouriteBtn>;

export const WithOnClick: Story = {
    args: {
        onClick: () => alert("clicked"),
    },
};
