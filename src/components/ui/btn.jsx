import { useNavigate } from 'react-router-dom';

const CustomButton = ({
    children,
    onClick,
    to, // prop para la navegación
    type = 'button',
    className = '',
}) => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
        }
        if (to) {
            navigate(to);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            className={`focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;
