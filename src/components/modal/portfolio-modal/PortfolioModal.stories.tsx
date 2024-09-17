import { useState } from "react";
import PortfolioModal from "./PortfolioModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PortfolioModal> = {
    title: "Components/Modals/PortfolioModal",
    component: PortfolioModal,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PortfolioModal>;

const Wrapper = () => {
    const [isModalOpen, setIsModalOpen] = useState([false]);
    const toggleModal = (idx: number, target: boolean) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    return (
        <div className="wrapper">
            <button onClick={() => toggleModal(0, true)}>Open modal</button>
            <PortfolioModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                modalId={0}
            />
        </div>
    );
};

export const Default: Story = {
    render: () => <Wrapper />,
};
