import React, { FC, useContext, useEffect, useCallback } from 'react';
import {
	CalendarContentWrapper,
	CalendarItemList,
	CalendarUtilityBar,
	CalendarWeekCount
} from './CalendarContent.styled';
import { CalendarContext } from '../../CalendarContext';
import CalendarItem from './CalendarItem/CalendarItem';
import { StyledButton } from '../Button/Button.styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

const CalendarContent: FC = () => {
	const { events, refreshEvents, weeks, setWeeks } = useContext(CalendarContext);

	// @ts-ignore
	const updateWeeks = useCallback((event) => {
		setWeeks(event.currentTarget.value);
	}, [setWeeks]);

	useEffect(() => {
		refreshEvents({ unhide: false });
	}, [weeks]);

	return (
		<CalendarContentWrapper data-testid="CalendarContent">
			<CalendarUtilityBar>
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
						<FontAwesomeIcon icon={['fas', 'arrow-rotate-right']} />
							Refresh
					</span>
					<Tooltip id={'RefreshButtonTooltip'} />
				</StyledButton>
			</CalendarUtilityBar>
			<CalendarItemList>
				{events.map((event, key) => {
					return <CalendarItem key={key} event={event} />;
				})}
			</CalendarItemList>
		</CalendarContentWrapper>
	);
};

export default CalendarContent;
