import { FC, useCallback, useState } from 'react';
import { GlobalHeaderWrapper } from './GlobalHeader.styled';
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

interface GlobalHeaderProps {
}

const GlobalHeader: FC<GlobalHeaderProps> = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const isDarkMode = useIsDarkMode();
	const dispatch = useDispatch();

	const setMode = useCallback( () => {
		dispatch(setUiMode(!isDarkMode));
	}, [isDarkMode, dispatch]);

	const handleMenu = useCallback(() => {
		setMenuOpen(!menuOpen);
	}, [menuOpen]);

	return (
		<GlobalHeaderWrapper data-testid="GlobalHeader">
			<Container>
				<Row>
					<h1>Life Screen</h1>
					<Toggle toggledOn={isDarkMode}
						onToggle={setMode}
						label={'Dark mode'}
						onLabel={'Dark mode on'}
						offLabel={'Dark mode off'}
						onIcon={LightbulbFilledIcon}
						offIcon={LightbulbIcon}
						labelVisible={false}
						onColour="mutedDark"
						offColour="mutedLight"
					/>
					<Button label="Menu" icon={MoreIcon} onClick={handleMenu} appearance="subtle" collapsed active={menuOpen}/>
				</Row>
			</Container>
		</GlobalHeaderWrapper>
	);
};

export default GlobalHeader;
