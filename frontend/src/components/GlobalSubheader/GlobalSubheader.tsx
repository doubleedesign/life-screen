import React, { FC, useContext, useCallback } from 'react';
import { GlobalSubheaderWrapper } from './GlobalSubheader.styled';
import { CalendarUtilityBar, CalendarWeekCount } from './GlobalSubheader.styled';
import { StyledButton } from '../Button/Button.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';
import { CalendarContext } from '../../CalendarContext';
import CalendarMenu from '../CalendarMenu/CalendarMenu';
import { Block } from '../common';

const GlobalSubheader: FC = () => {
	const { calendars, events, refreshEvents, weeks, setWeeks } = useContext(CalendarContext);

	// @ts-ignore
	const updateWeeks = useCallback((event) => {
		setWeeks(event.currentTarget.value);
	}, [setWeeks]);

	return (
		<GlobalSubheaderWrapper data-testid="GlobalSubheader">
			<CalendarUtilityBar>
				<Block>
					<CalendarMenu />
				</Block>
				<Block>
					<CalendarWeekCount>
						<label htmlFor="CalendarWeekCount">Weeks</label>
						<input id="CalendarWeekCount" type="number" value={weeks} onChange={updateWeeks}/>
					</CalendarWeekCount>
					<StyledButton color="dark" onClick={() => refreshEvents({ unhide: true })}>
						<span className="react-tooltip-trigger"
							data-tooltip-id={'RefreshButtonTooltip'}
							data-tooltip-content="Reload current calendars and un-hide hidden items"
							data-tooltip-place="bottom"
							data-tooltip-delay-hide={200}
						>
							<FontAwesomeIcon icon={['fas', 'arrow-rotate-right']}/>
							Refresh
						</span>
						<Tooltip id={'RefreshButtonTooltip'}/>
					</StyledButton>
				</Block>
			</CalendarUtilityBar>
		</GlobalSubheaderWrapper>
	);
};

export default GlobalSubheader;
