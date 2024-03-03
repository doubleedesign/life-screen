import { ComponentType, FC } from 'react';
import { LinkButtonWrapper, ButtonWrapper } from './Button.style';
import { ThemeColour } from '../../theme.ts';
import VisuallyHidden from '@atlaskit/visually-hidden';
import { IconProps } from '@atlaskit/icon';

type ButtonSharedProps = {
	label: string;
	appearance: ThemeColour;
}

export type ButtonProps = ButtonSharedProps & {
	onClick?: () => void;
	active?: boolean;
}

export type IconButtonProps = ButtonSharedProps & {
	icon: ComponentType<IconProps>;
	collapsed: boolean;
}

export type LinkButtonProps = ButtonSharedProps & {
	href: string;
}

const Button: FC<ButtonProps | IconButtonProps | LinkButtonProps> = ({
	label,
	appearance,
	icon = undefined,
	collapsed = false,
	active = false,
	onClick = undefined,
	href = undefined
}) => {

	if(icon) {
		const IconComponent = icon;
		return collapsed ? (
			<ButtonWrapper appearance={appearance} collapsed active={active} onClick={onClick} data-testid="IconButtonCollapsed">
				<IconComponent label={label}/>
				<VisuallyHidden>{label}</VisuallyHidden>
			</ButtonWrapper>
		) : (
			<ButtonWrapper appearance={appearance} active={active} onClick={onClick} data-testid="IconButton">
				<IconComponent label={label}/>
				{label}
			</ButtonWrapper>
		);
	}

	return (
		href
			? <LinkButtonWrapper appearance={appearance} href={href}>{label}</LinkButtonWrapper>
			: <ButtonWrapper appearance={appearance} onClick={onClick}>{label}</ButtonWrapper>
	);
};

export default Button;

