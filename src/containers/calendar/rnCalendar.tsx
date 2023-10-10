import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

interface Props {
  selectedDate?: string;
  onChangeDate?: (date: any) => void;
  markedDates?: any[];
}

const RnCalendar: React.FC<Props> = ({
  selectedDate,
  onChangeDate,
  markedDates
}) => {
  const [activeDate, setActiveDate] = useState(moment(selectedDate) || moment());

  const months = ["January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December"];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const nDays: any = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const changeMonth = (n: any) => setActiveDate(moment(activeDate).add('month', n));

  const onPress = (item: any) => {
    if (item == -1) {
      return false;
    }
    const getYear = activeDate.get('year');
    const getMonth = activeDate.get('month');
    const getHours = activeDate.get('hours');
    const getMinutes = activeDate.get('minutes');
    const parsedDate = moment().set({
      'year': getYear,
      'month': getMonth,
      'date': item,
      'hours': getHours,
      'minutes': getMinutes
    });
    //@ts-ignore
    onChangeDate(moment(parsedDate));
    setActiveDate(moment(parsedDate));
  };

  function generateMatrix() {
    var matrix: any = [];
    var counter = 1;
    var year = moment(activeDate).year();
    var month = moment(activeDate).month();
    var firstDay = new Date(year, month, 1).getDay();

    var maxDays = nDays[month];
    if (month == 1) { // February 
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    // The following code creates the header 
    matrix[0] = weekDays;

    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  var matrixArr = generateMatrix();

  var rows = [];
  rows = matrixArr.map((row: any, rowIndex: number) => {
    var rowItems = row.map((item: any, colIndex: number) => {
      const getYear = activeDate.get('year');
      const getMonth = activeDate.get('month');
      const getHours = activeDate.get('hours');
      const getMinutes = activeDate.get('minutes');
      const parsedDate = moment().set({
        'year': getYear,
        'month': getMonth,
        'date': item,
        'hours': getHours,
        'minutes': getMinutes
      });
      const isToday = moment(parsedDate).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD');
      const selected = moment(selectedDate).format('YYYY-MM-DD') == moment(parsedDate).format('YYYY-MM-DD');
      const isAppointmentExist: any = markedDates?.filter(({ date }) => date == moment(parsedDate).format('YYYY-MM-DD'));
      const dotColor = isAppointmentExist[0]?.precent < 30 ?
        COLORS.clearBlue :
        isAppointmentExist[0]?.precent < 70 ?
          COLORS.greenblue :
          COLORS.red;

      return (
        <TouchableOpacity style={[styles.dayTextContainer, {
          backgroundColor: rowIndex == 0 ? COLORS.white : (selected ? COLORS.orange : COLORS.white),
          borderRadius: rowIndex == 0 ? 0 : (selected ? 40 : 0),
        }]}
          activeOpacity={1}
          onPress={() => onPress(item)}>
          <Text
            style={{
              color: rowIndex == 0 ? COLORS.warmGrey : (selected ? COLORS.white : COLORS.blackLacquer),
              fontFamily: rowIndex == 0 ? FONTS.book : (isToday ? FONTS.bold : FONTS.book),
              fontSize: rowIndex == 0 ? 14 : 20,
            }}>
            {item != -1 ? (rowIndex == 0 ? String(item).toUpperCase() : item) : ''}
          </Text>
          {rowIndex !== 0 && item != -1 && (isAppointmentExist?.length !== 0) && (
            <View style={[styles.dot, {
              backgroundColor: dotColor
            }]} />
          )}
        </TouchableOpacity>
      );
    });
    return (
      <View
        style={styles.dayRowContainer}>
        {rowItems}
      </View>
    );
  });

  return (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.headerText}>
            {months[moment(activeDate).month()]} &nbsp;
            {moment(activeDate).year()}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <MaterialIcons
            size={40}
            name={"keyboard-arrow-left"}
            onPress={() => changeMonth(-1)}
            color={COLORS.orange}
          />
          <MaterialIcons
            size={40}
            name={"keyboard-arrow-right"}
            onPress={() => changeMonth(+1)}
            color={COLORS.orange}
          />
        </View>
      </View>
      {rows}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  headerText: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    textAlign: 'center'
  },
  dayRowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 22,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dayTextContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    height: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dot: {
    backgroundColor: COLORS.black,
    height: 5,
    width: 5,
    borderRadius: 5
  }
})

export default RnCalendar;