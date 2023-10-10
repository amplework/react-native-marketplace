import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { closedDaysSelectors } from 'store/entities/closedDays';

import { EditClosedDays } from '../editClosedDays';
import { AddClosedDays } from '../addClosedDay';
import { AddButton } from './components/addButton';
import { ClosedDaysList } from './components/closedDaysList';
import { styles } from './style';

interface Props {
  navigation: StackNavigationProp<any, 'Settings'>;
}

const ClosedDays: React.FC<Props> = ({ navigation }) => {
  const isModalOpened = useSelector(closedDaysSelectors.isModalOpened);
  const isModalVisible = useSelector(closedDaysSelectors.isModalVisible);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.links.closedDays')} />
      ),
    });
  }, [navigation]);  

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {isModalOpened && <EditClosedDays />}
      {isModalVisible && <AddClosedDays />}
      <AddButton />
      <ClosedDaysList />
    </SafeContainer>
  );
};

export { ClosedDays };
