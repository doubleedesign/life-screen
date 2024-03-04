import { FC, useCallback, useState } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
import { Container, Row } from '../common.styled';
import { useIsDarkMode } from '../../state/selectors.ts';
import Toggle from '../Toggle/Toggle.tsx';
import { setUiMode } from '../../state/actions.ts';
import { useDispatch } from 'react-redux';
import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb';
import LightbulbFilledIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import Button from '../Button/Button.tsx';
import MoreIcon from '@atlaskit/icon/glyph/more';
import PopupMenu from '../PopupMenu/PopupMenu.tsx';
import PopupMenuSection from '../PopupMenuSection/PopupMenuSection.tsx';
import AccountsMenu from '../AccountsMenu/AccountsMenu.tsx';

interface GlobalHeaderProps {
}

const GlobalHeader: FC<GlobalHeaderProps> = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const isDarkMode = useIsDarkMode();
	const dispatch = useDispatch();

	const setMode = useCallback( () => {
		dispatch(setUiMode(!isDarkMode));
	}, [isDarkMode, dispatch]);

	const triggerButton = <Button
		label="Menu"
		icon={MoreIcon}
		appearance="subtle"
		onClick={() => setMenuOpen(!menuOpen)}
		isCollapsed
		isActive={menuOpen}
	/>;

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<Container>
				<Row>
					<h1>Life Screen</h1>
					<PopupMenu isOpen={menuOpen} trigger={triggerButton}>
						<PopupMenuSection title="Accounts">
							<AccountsMenu onMenuItemClick={() => setMenuOpen(false)}/>
						</PopupMenuSection>
						<PopupMenuSection title="Settings">
							<Toggle toggledOn={isDarkMode}
								onToggle={setMode}
								label={'Dark mode'}
								onLabel={'Dark mode is on'}
								offLabel={'Dark mode is off'}
								onIcon={LightbulbFilledIcon}
								offIcon={LightbulbIcon}
								labelVisible
								onColour="mutedDark"
								offColour="mutedLight"
								aria-haspopup="menu"
								aria-expanded={menuOpen}
							/>
						</PopupMenuSection>
					</PopupMenu>
				</Row>
			</Container>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
