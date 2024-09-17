import { useState } from "react";
import StyledModal from "./StyledModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof StyledModal> = {
    title: "Components/Modals/StyledModal",
    component: StyledModal,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StyledModal>;

interface WrapperProps {
    centered?: boolean;
    style?: React.CSSProperties;
    width?: number;
}

const Wrapper = ({ centered = false, style, width }: any) => {
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
            <StyledModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                modalId={0}
                width={width}
                style={style}
                centered={centered}
            >
                Some content...
            </StyledModal>
        </div>
    );
};

export const Default: Story = {
    render: () => <Wrapper />,
};

export const Centered: Story = {
    render: () => <Wrapper centered={true} />,
};

export const Width1200px: Story = {
    render: () => <Wrapper width={1200} />,
};
