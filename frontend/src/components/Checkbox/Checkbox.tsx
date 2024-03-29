import React, { FC } from 'react';
import { CheckboxWrapper } from './Checkbox.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CheckboxProps {
	label: string;
	image?: string;
	color: string;
	checked: boolean
	onChange: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, image, color, checked, onChange }) => (
	<CheckboxWrapper data-testid="Checkbox" checked={checked} color={color}>
		<input type="checkbox" id={label} name={label} checked={checked} onChange={onChange} />
		<label htmlFor={label}>
			<span>
				{image ? <img src={`/images/${image}`} alt="" className={`icon-${image.replace('.svg', '')}`} /> : <FontAwesomeIcon icon={['fas', 'calendar-star']} /> }
			</span>
			{checked ? <FontAwesomeIcon icon={['fas', 'circle-check']} /> : <FontAwesomeIcon icon={['fal', 'circle-check']} />}
			{label}
		</label>
	</CheckboxWrapper>
);

export default Checkbox;
