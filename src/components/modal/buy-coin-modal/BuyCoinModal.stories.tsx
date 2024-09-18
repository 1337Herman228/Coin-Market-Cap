import { useState } from "react";
import BuyCoinModal from "./BuyCoinModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof BuyCoinModal> = {
    title: "Components/Modals/BuyCoinModal",
    component: BuyCoinModal,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BuyCoinModal>;

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
            <BuyCoinModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                modalId={0}
                coin={{
                    key: "bitcoin",
                    rank: "1",
                    symbol: "BTC",
                    logo: "https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}}@2x.png",
                    name: "bitcoin",
                    priceUsd: "1000",
                    marketCapUsd: "1000",
                    changePercent24Hr: "1000",
                }}
            />
        </div>
    );
};

export const Default: Story = {
    render: () => <Wrapper />,
};
