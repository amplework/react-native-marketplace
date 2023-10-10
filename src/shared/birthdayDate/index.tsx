import I18n from 'locales';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { parseDate } from 'utils/dates';

import styles from './style';

export interface Props {
  show: boolean;
  birthday: string;
  date?: Date;
  pressShow: (value: boolean) => void;
  pressDate: (date: Date) => void;
  onCancel: (date: boolean) => void;
}

const BirthdayDate: React.FC<Props> = (props) => {
  const { show, birthday, date, pressShow, pressDate, onCancel } = props;
  return (
    <>
      <TouchableOpacity
        onPress={() => pressShow(true)}
        style={styles.rowWrapper}
      >
        <Text style={styles.birthdateLabel}>
          {birthday || I18n.t('clientDetails.birthday')}
        </Text>
        <Image
          source={require('assets/global/chevron.png')}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <DateTimePickerModal
        date={date}
        isVisible={show}
        mode="date"
        maximumDate={parseDate()}
        onConfirm={pressDate}
        onCancel={onCancel}
      />
    </>
  );
};

export default BirthdayDate;
