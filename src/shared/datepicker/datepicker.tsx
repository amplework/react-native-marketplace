import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { IMargin } from 'utils/styles';

import { styles } from './styles';

type Mode = 'date' | 'time' | 'datetime';

interface Props extends IMargin {
  flex?: boolean;
  editable?: boolean;
  title: string;
  label?: string;
  required?: boolean;
  mode?: Mode;
  date?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  onConfirm: (date: Date) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  timeZoneOffset?: any;
  startDate?: Date;
  endDate?: Date;
}

const Datepicker: React.FC<Props> = ({
  editable,
  startDate,
  endDate,
  flex = false,
  date,
  title,
  label,
  required = false,
  mode = 'date',
  timeZoneOffset,
  minimumDate = undefined,
  onConfirm,
  maximumDate,
  style,
  textStyle,
  icon,
  iconStyle,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => {
  const [isVisible, setVisible] = useState(false);

  const openPicker = () => setVisible(true);

  const closePicker = () => setVisible(false);

  const handleConfirm = (value: Date) => {
    closePicker();
    onConfirm(value);
  };

  return (
    <>
      <TouchableOpacity
        onPress={editable == false ? () => {} : openPicker}
        style={[
          styles.button,
          {
            flex: flex ? 1 : undefined,
            marginTop: mv || mt,
            marginRight: mh || mr,
            marginBottom: mv || mb,
            marginLeft: mh || ml,
          },
          style,
        ]}
      >
        {label && (
          <Text style={styles.label}>{required ? `*${label}` : label}</Text>
        )}
        <Text style={[styles.text, textStyle]}>{title}</Text>
        {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
      </TouchableOpacity>
      <DateTimePicker
        date={date}
        timeZoneOffsetInMinutes={timeZoneOffset}
        minimumDate={startDate}///{minimumDate}
        maximumDate={endDate}//{maximumDate}
        isVisible={isVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={closePicker}
      />
    </>
  );
};

export { Datepicker };
