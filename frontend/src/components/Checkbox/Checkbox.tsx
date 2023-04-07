import React, { FC } from 'react';
import { CheckboxWrapper } from './Checkbox.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface CheckboxProps {
	label: string;
	checked: boolean
	onChange: () => void;
}

const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => (
	<CheckboxWrapper data-testid="Checkbox" checked={checked} >
		<input type="checkbox" id={label} name={label} checked={checked} onChange={onChange} />
		<label htmlFor={label}>
			{checked ? <FontAwesomeIcon icon={['fas', 'circle-check']} /> : <FontAwesomeIcon icon={['fal', 'circle-check']} />}
			{label}
		</label>
	</CheckboxWrapper>
);

export default Checkbox;
