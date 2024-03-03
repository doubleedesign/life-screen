import { FC, useCallback, useState } from 'react';
import { GlobalHeaderWrapper, PopupMenu } from './GlobalHeader.styled';
import { Container, Row } from '../common.styled';
import { useIsDarkMode } from '../../state/selectors.ts';
import Toggle from '../Toggle/Toggle.tsx';
import { setUiMode } from '../../state/actions.ts';
import { useDispatch } from 'react-redux';
import LightbulbIcon from '@atlaskit/icon/glyph/lightbulb';
import LightbulbFilledIcon from '@atlaskit/icon/glyph/lightbulb-filled';
import { Popup } from '@atlaskit/popup';
import Button from '../Button/Button.tsx';
import MoreIcon from '@atlaskit/icon/glyph/more';
import { MenuGroup, Section } from '@atlaskit/menu';

interface GlobalHeaderProps {
}

const GlobalHeader: FC<GlobalHeaderProps> = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const isDarkMode = useIsDarkMode();
	const dispatch = useDispatch();

	const setMode = useCallback( () => {
		dispatch(setUiMode(!isDarkMode));
	}, [isDarkMode, dispatch]);

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<Container>
				<Row>
					<h1>Life Screen</h1>
					<Popup
						isOpen={menuOpen}
						onClose={() => setMenuOpen(false)}
						placement="bottom-end"
						content={() => <PopupMenu>
							<MenuGroup>
								<Section title="Options">
									<Toggle toggledOn={isDarkMode}
										onToggle={setMode}
										label={'Dark mode'}
										onLabel={'Dark mode on'}
										offLabel={'Dark mode off'}
										onIcon={LightbulbFilledIcon}
										offIcon={LightbulbIcon}
										labelVisible
										onColour="mutedDark"
										offColour="mutedLight"
									/>
								</Section>
							</MenuGroup>
						</PopupMenu>}
						trigger={(triggerProps) => (
							<Button
								{...triggerProps}
								label="Menu"
								icon={MoreIcon}
								appearance="subtle"
								onClick={() => setMenuOpen(!menuOpen)}
								isCollapsed
								isActive={menuOpen}/>
						)}
					/>
				</Row>
			</Container>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
