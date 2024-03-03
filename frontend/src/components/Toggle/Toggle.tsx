import { ComponentType, FC, useId } from 'react';
import { ToggleIconWrapper, ToggleInput, ToggleLabel, ToggleSwitch, ToggleWrapper } from './Toggle.style';
import { IconProps } from '@atlaskit/icon';
import Tooltip from '@atlaskit/tooltip';
import VisuallyHidden from '@atlaskit/visually-hidden';
import { ThemeColour } from '../../theme.ts';
import CheckIcon from '@atlaskit/icon/glyph/check';
import CrossIcon from '@atlaskit/icon/glyph/cross';

interface ToggleProps {
	label: string;
	onLabel: string;
	offLabel: string;
	toggledOn: boolean;
	onToggle: () => void;
	onIcon?: ComponentType<IconProps>;
	offIcon?: ComponentType<IconProps>;
	labelVisible?: boolean;
	onColour?: ThemeColour;
	offColour?: ThemeColour;
}

const Toggle: FC<ToggleProps> = ({
	label, onLabel,
	offLabel,
	toggledOn,
	onToggle,
	onIcon = CheckIcon,
	offIcon = CrossIcon,
	labelVisible = true,
	onColour = 'success',
	offColour = 'error'
}) => {
	const id = useId();
	const name = `toggle_${id}`;

	const IconComponent = toggledOn ? onIcon : offIcon;

	return (
		<Tooltip content={toggledOn ? onLabel : offLabel}>
			<ToggleWrapper data-testid="Toggle" aria-label={`Toggle for ${label}`} $background={toggledOn? onColour : offColour}>
				<ToggleLabel>
					{labelVisible ? label : <VisuallyHidden>{label}</VisuallyHidden>}
					<ToggleInput name={name} checked={toggledOn} onChange={onToggle}/>
				</ToggleLabel>
				<ToggleIconWrapper>
					<IconComponent label="Toggle icon"/>
				</ToggleIconWrapper>
				<ToggleSwitch $toggledOn={toggledOn}/>
			</ToggleWrapper>
		</Tooltip>
	);
};

export default Toggle;

