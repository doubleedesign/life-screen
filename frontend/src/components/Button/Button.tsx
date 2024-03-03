import { ComponentType, FC, ForwardedRef, forwardRef } from 'react';
import { ThemeColour } from '../../theme.ts';
import VisuallyHidden from '@atlaskit/visually-hidden';
import { IconProps } from '@atlaskit/icon';
import { ButtonWrapper, LinkButtonWrapper } from './Button.style.ts';

type ButtonSharedProps = {
	label: string;
	appearance: ThemeColour;
}

export type ButtonProps = ButtonSharedProps & {
	onClick?: () => void;
	isActive?: boolean;
}

export type IconButtonProps = ButtonProps & ButtonSharedProps & {
	icon: ComponentType<IconProps>;
	isCollapsed: boolean;
}

export type LinkButtonProps = ButtonSharedProps & {
	href: string;
}

const Button: FC<ButtonProps | IconButtonProps | LinkButtonProps> = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
	const {
		label,
		appearance,
		// @ts-expect-error TS2339: Property isCollapsed does not exist on type
		isCollapsed = false,
		isActive = false,
		// @ts-expect-error TS2339: Property icon does not exist on type
		icon = undefined,
		...restProps
	} = props;

	if(icon) {
		const IconComponent = icon;
		return isCollapsed ? (
			<ButtonWrapper data-testid="IconButtonCollapsed" ref={ref ? ref as ForwardedRef<HTMLButtonElement> : null} $appearance={appearance} $isCollapsed={isCollapsed} $isActive={isActive} {...restProps}>
				<IconComponent label={label}/>
				<VisuallyHidden>{label}</VisuallyHidden>
			</ButtonWrapper>
		) : (
			<ButtonWrapper data-testid="IconButton" ref={ref ? ref as ForwardedRef<HTMLButtonElement> : null} $appearance={appearance} $isCollapsed={false} $isActive={isActive} {...restProps}>
				<IconComponent label={label}/>
				{label}
			</ButtonWrapper>
		);
	}

	return (
		// @ts-expect-error TS2339: Property href does not exist on type
		restProps?.href
			? <LinkButtonWrapper ref={ref ? ref as ForwardedRef<HTMLAnchorElement> : null} data-testid="LinkButton" $appearance={appearance} {...restProps}>{label}</LinkButtonWrapper>
			: <ButtonWrapper ref={ref ? ref as ForwardedRef<HTMLButtonElement> : null} data-testid="Button" $appearance={appearance} {...restProps}>{label}</ButtonWrapper>
	);
});

export default Button;

