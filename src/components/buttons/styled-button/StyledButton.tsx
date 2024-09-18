import "./StyledButton.scss";

interface StyledButtonProps {
    children: React.ReactNode;
    className?: string;
    isActive?: boolean;
    onClick: () => void;
    dataTestId?: string;
}

const StyledButton = ({
    children,
    isActive,
    onClick,
    className = "",
    dataTestId = "",
}: StyledButtonProps) => {
    return (
        <button
            data-testId={dataTestId}
            className={`${className} styled-button ${isActive ? "active" : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default StyledButton;
