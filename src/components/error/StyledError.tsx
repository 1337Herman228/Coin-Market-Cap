import { Alert } from "antd";
import React from "react";

interface StyledErrorProps {
    message: string;
    description: string;
}

const StyledError = ({ message, description }: StyledErrorProps) => {
    return (
        <span data-testId="error">
            <Alert
                style={{ width: 400 }}
                message={message}
                description={description}
                type="error"
                showIcon
            />
        </span>
    );
};

export default StyledError;
