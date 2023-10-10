// import moment from 'moment';
import React from 'react';
import moment from 'moment-timezone';
import RNlocalize from 'react-native-localize';
import CalendarStrip from 'react-native-calendar-strip';
import COLORS from 'utils/colors';
import { getStartOfWeek } from 'utils/dates';

import { calendarStyles as S } from './style';

type Props = {
  selectedDate: any;
  markedDated?: any;
  onPress?: (date: moment.Moment) => void;
  customDatesStyles?: any | undefined;
  rounded?: boolean;
};

let fetchedDates = ["2022-02-20", "2022-02-21", "2022-02-22", "2022-02-23"];
let markedDatesArray: any = [];

for (let i = 0; i < fetchedDates.length; i++) {
  markedDatesArray.push({
    date: moment(`${fetchedDates[i]}`, "YYYY-MM-DD"),
    dots: [
      {
        color: COLORS.orange10,
      },
    ],
  });
}



const Calendar: React.FC<Props> = ({
  selectedDate,
  onPress,
  markedDated,
  rounded = false,
  customDatesStyles,
}) => {
  return (
    <CalendarStrip
      numDaysInWeek={7}
      scrollable={true}
      style={[S.calendarContainer, rounded && S.rounded]}
      calendarColor={COLORS.white}
      useIsoWeekday={false}
      shouldAllowFontScaling={false}
      startingDate={moment(getStartOfWeek())}
      calendarHeaderStyle={S.calendarHeader}
      dateNumberStyle={S.calendarNumber}
      highlightDateContainerStyle={S.selectedDateContainer}
      highlightDateNumberStyle={[S.calendarNumber, S.calendarNumberSelected]}
      customDatesStyles={customDatesStyles}
      dateNameStyle={S.calendarName}
      highlightDateNameStyle={[S.calendarName, S.calendarNameSelected]}
      selectedDate={selectedDate}
      updateWeek={true}
      markedDatesStyle={S.dotStyle}
      iconRight={require('assets/global/sliderRight.png')}
      iconLeft={require('assets/global/sliderLeft.png')}
      iconStyle={S.sliderArrow}
      onDateSelected={onPress}
      scrollToOnSetSelectedDate={true}
      markedDates={markedDated}
      iconContainer={{ flex: 0.1 }}
    />
  );
}

export default Calendar;
