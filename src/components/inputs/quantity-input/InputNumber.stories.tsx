import { useState } from "react";
import InputNumber from "./InputNumber";
import type { Meta, StoryObj } from "@storybook/react";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";

const meta: Meta<typeof InputNumber> = {
    title: "Components/Inputs/InputNumber",
    component: InputNumber,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

const Wrapper = ({ min, max, label }: any) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState(1);
    return (
        <div className="wrapper">
            <InputNumber
                min={min}
                max={max}
                label={label}
                stateValue={value}
                stateSetter={setValue}
            />
        </div>
    );
};

export const Default: Story = {
    render: () => <Wrapper min={1} max={100} label="Quantity" />,
};
