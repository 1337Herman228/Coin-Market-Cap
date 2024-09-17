
import './StyledButton.scss';

interface StyledButtonProps {
    children: React.ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

const StyledButton = ({children,isActive, onClick}: StyledButtonProps) => {
    return (
        <button 
            className={`styled-button ${isActive ? 'active' : ''}`} 
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default StyledButton;