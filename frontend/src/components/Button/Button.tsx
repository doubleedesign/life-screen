import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './_Button.scss';

export interface ButtonProps {
	label: string,
	onClick: () => void;
	color?: string,
	icon?: IconProp
}

export const Button: React.FC<ButtonProps> = function({ label, onClick, color, icon }) {

	return (
		<button>
			{label}
			{icon && <FontAwesomeIcon icon={icon}/>}
		</button>
	);
};

export default Button;
