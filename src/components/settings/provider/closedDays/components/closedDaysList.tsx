import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  closedDaysSelectors,
  getClosedDays,
  openEditModal,
} from 'store/entities/closedDays';
import { IClosedDays } from 'types/settings';

import { styles } from '../style';
import { ClosedDaysItem } from './closedDaysItem';

const ClosedDaysList: React.FC = () => {
  const closedDaysList = useSelector(closedDaysSelectors.closedDaysList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClosedDays());
  }, [dispatch]);

  const handlePress = (days: IClosedDays) => () =>
    dispatch(openEditModal(days));

  return (
    <FlatList
      data={closedDaysList}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <ClosedDaysItem onPress={handlePress(item)} {...item} />
      )}
      style={styles.daysList}
      showsVerticalScrollIndicator={false}
    />
  );
};

export { ClosedDaysList };
