import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PaymentsItem } from 'components/payments/components/paymentsItem';
import { WeekSlider } from 'components/payments/components/weekSlider';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import { AddButton } from 'shared/button/add';
import { EmptyState } from 'shared/emptyState';
import { PaymentsPlaceholder } from 'shared/icon/icons';
import { MainPageTemplate } from 'shared/templates';
import { getPayments, paymentsSelectors } from 'store/entities/payments';
import {
  formatApiDate,
  getEndOfWeek,
  getStartOfWeek,
  weeks,
} from 'utils/dates';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const Payments: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const scrollRef = useRef<FlatList<any>>();
  const isFocused = useIsFocused();
  const payments = useSelector(paymentsSelectors.payments);
  const loading = useSelector(paymentsSelectors.loading);
  const meta = useSelector(paymentsSelectors.meta);
  const [onEnd, setOnEnd] = useState(true);
  const [startDate, setStartDate] = useState(getStartOfWeek);
  const [endDate, setEndDate] = useState(getEndOfWeek);



  
  const headerButton = (route: string, image: any, style?: any) => {
    return (
      <TouchableOpacity onPress={() => Navigator.navigate(route)}>
        <Image style={[styles.imagePerfomance, style]} source={image} />
      </TouchableOpacity>
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <View style={styles.row}>
          {headerButton(
            'PaymentsReview',
            require('assets/global/performance.png'),
          )}
          {headerButton(
            'PaymentsSearch',
            require('assets/global/searcn.png'),
            styles.imageSearch,
          )}
        </View>
      ),
      headerLeft: () => <BackButton title={t(translations.payments.header)} />,
    });
  }, [navigation]);
  useEffect(() => {    
    payments?.length &&
      scrollRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    dispatch(
      getPayments({
        limit: 10,
        offset: 0,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
      }),
    );
  }, [isFocused, startDate]);
  const onMore = () => {
    dispatch(
      getPayments({
        limit: 10,
        offset: meta?.offset + 10,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
      }),
    );
  };
  const nextWeek = () => {
    setStartDate(weeks.increment(startDate));
    setEndDate(weeks.increment(endDate));
  };

  const perviousWeek = () => {
    setStartDate(weeks.decrement(startDate));
    setEndDate(weeks.decrement(endDate));
  };
  return (
    <MainPageTemplate loading={loading}>
      <WeekSlider
        start={startDate}
        end={endDate}
        onNext={nextWeek}
        onPrevious={perviousWeek}
      />
      <AddButton
        title={t(translations.payments.addButton)}
        onPress={() => Navigator.navigate('AddPayments')}
      />
      <FlatList
        // @ts-ignore
        ref={scrollRef}
        data={payments || []}
        renderItem={({ item }) => (
          <PaymentsItem
            item={item}
            onPress={() =>
              Navigator.navigate('PaymentDetails', { id: item.id })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => {
          if (!onEnd) {
            onMore();
            setOnEnd(true);
          }
        }}
        onMomentumScrollBegin={() => setOnEnd(false)}
        onEndReachedThreshold={0.1}
        ListEmptyComponent={() => (
          <EmptyState
            type="image"
            image={<PaymentsPlaceholder />}
            header={t(translations.payments.placeholder.header)}
            description={t(translations.payments.placeholder.description)}
            ph={35}
          />
        )}
        contentContainerStyle={styles.content}
      />
    </MainPageTemplate>
  );
};

export default Payments;
