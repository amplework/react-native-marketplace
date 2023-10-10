import React from 'react';
import moment from 'moment-timezone';
import { Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Calendar from 'shared/calendar';
import {
  appointmentsSelector,
  clearAppointments,
} from 'store/entities/appointments';
import {
  closeDatepickerModal,
  homeSelectors,
  selectHomeDate,
} from 'store/entities/home';
import { homeStyles as S } from '../style';
import { liteSchedule, busySchedule, normalSchedule } from 'utils/array';

type Props = {
  onChangeDate: (date: moment.Moment) => void;
};

const DatepickerModal: React.FC<Props> = ({onChangeDate}) => {
  const isModalOpened = useSelector(homeSelectors.isModalOpened);
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const scheduledAppointments = useSelector(appointmentsSelector.scheduledAppointments);

  let filteredArray = scheduledAppointments; 

  let scheduledArray = filteredArray.map((e: any) => (
    {
      ...e,
      dots: (e.precent < 30) ? liteSchedule : (e.precent < 70) ? normalSchedule : busySchedule
    }
  )
  )   

  const dispatch = useDispatch();

  const handleCloseModal = () => dispatch(closeDatepickerModal());

  return (
    <Modal visible={isModalOpened} transparent animationType="fade">
      <TouchableOpacity
        onPress={handleCloseModal}
        activeOpacity={1}
        style={S.overlay}
      >
        <Calendar
          selectedDate={selectedDate}
          onPress={onChangeDate}
          markedDated={scheduledArray}
          rounded
        />
      </TouchableOpacity>
    </Modal>
  );
};

export { DatepickerModal };