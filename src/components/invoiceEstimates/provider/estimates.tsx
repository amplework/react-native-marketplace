import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useCallback, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { AddButton } from 'shared/button/add';
import SafeContainer from 'shared/container';
import { Heading } from 'shared/heading';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { estimatesSelectors, switchTab } from 'store/entities/estimates';
import COLORS from 'utils/colors';

import { TABS } from '../helpers/constants';
import { CounterBar } from './components/counterBar';
import { EstimatesList } from './components/estimatesList';
import { styles } from './style';

type Props = StackScreenProps<RootStackParamList, 'MoreStack'>;

const Estimates: React.FC<Props> = ({ navigation, route }) => {
  const tab = useSelector(estimatesSelectors.tab);

  const dispatch = useDispatch();

  const navigateToReview = useCallback(
    () => Navigator.navigate('EstimatesReview'),
    [],
  );

  const navigateToSearch = useCallback(
    () => Navigator.navigate('SearchEstimates'),
    [],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <Heading
          title={I18n.t('estimates.header')}
          back={route.params?.showBackButton}
        />
      ),
      headerRight: () => (
        <Box row mr={24}>
          <Icon
            src={require('assets/global/performance.png')}
            onPress={navigateToReview}
            size={20}
            mr={20}
          />
          <Icon
            src={require('assets/global/search.png')}
            onPress={navigateToSearch}
            size={20}
          />
        </Box>
      ),
    });
  }, [navigation, navigateToReview, navigateToSearch]);

  const navigateToAddInvoice = () => Navigator.navigate('AddEditEstimate');

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <Box row w="100%" bc={COLORS.white}>
        {TABS.map(({ type, name }) => {

          const active = type === tab;

          const changeTab = () => dispatch(switchTab(type))

          return (
            <TouchableOpacity
              key={type}
              onPress={changeTab}
              style={[styles.tab, active && styles.activeTab]}
            >
              <Paragraph size="s" type={active ? 'medium' : 'book'}>
                {name}
              </Paragraph>
            </TouchableOpacity>
          );
        })}
      </Box>
      <AddButton
        title={I18n.t('estimates.add')}
        onPress={navigateToAddInvoice}
      />
      <CounterBar />
      <EstimatesList />
    </SafeContainer>
  );
};
export { Estimates };