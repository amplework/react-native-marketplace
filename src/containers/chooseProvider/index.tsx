import { StackNavigationProp } from '@react-navigation/stack';
import { ProvidersItem } from 'components/providers/client/components/providersItem';
import React, { useEffect, useLayoutEffect } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import {
  getProviders,
  providersSelectors,
  refreshProviders,
} from 'store/entities/providers';
import COLORS from 'utils/colors';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const ChooseProvider: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const providers = useSelector(providersSelectors.providers);
  const isLoading = useSelector(providersSelectors.loading);
  const isRefreshing = useSelector(providersSelectors.refreshing);
  const page = useSelector(providersSelectors.offset);
  const totalCount = useSelector(providersSelectors.total);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={'Choose Provider'} />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(refreshProviders({ offset: 0 }));
  }, [dispatch]);

  const refresh = () => dispatch(refreshProviders({ offset: 0 }));

  const loadMore = () => {
    if (providers.length < totalCount) {
      dispatch(getProviders({ offset: page + 1 }));
    }
  };

  return (
    <SafeContainer containerStyle={styles.container} safeStyle={styles.safe}>
      <FlatList
        data={providers}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <ProvidersItem
            provider={item}
            showStar={false}
            onPress={() =>
              navigation.navigate('AddAppointment', {
                client: item,
                selectedDayStart: route?.params?.selectedDayStart || '',
                selectedDayEnd: route?.params?.selectedDayEnd || '',
              })
            }
          />
        )}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        style={styles.providersList}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <Button
            buttonStyle={[styles.buttonSpace, styles.shadow]}
            textStyle={styles.buttonTitle}
            text={'Find New Provider'}
            image={require('assets/global/add.png')}
            onPress={() =>
              Navigator.navigate('SearchProviders', {
                action: 'book',
                selectedDayStart: route?.params?.selectedDayStart || '',
                selectedDayEnd: route?.params?.selectedDayEnd || '',
              })
            }
          />
        )}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={isLoading ? COLORS.clearBlue : COLORS.transparent}
            style={styles.loader}
          />
        )}
      />
    </SafeContainer>
  );
};

export default ChooseProvider;
