import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
};

export const Button = ({ isOutlined, ...props}: ButtonProps) => (
    <button className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props}
    />
);

export default Button;