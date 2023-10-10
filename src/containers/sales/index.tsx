import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SalesItem } from 'components/sales/components/salesItem';
import { WeekSlider } from 'components/sales/components/weekSlider';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { Navigator } from 'service/navigator';
import { AddButton } from 'shared/button/add';
import { EmptyState } from 'shared/emptyState';
import { Heading } from 'shared/heading';
import { SalesPlaceholder } from 'shared/icon/icons';
import { MainPageTemplate } from 'shared/templates';
import { getSales, resetSale, salesSelectors } from 'store/entities/sales';
import {
  formatApiDate,
  getEndOfWeek,
  getStartOfWeek,
  weeks,
} from 'utils/dates';

import styles from './style';

type Props = StackScreenProps<RootStackParamList, 'Sales'>;

const Sales: React.FC<Props> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

  const scrollRef = useRef<FlatList<any>>();

  const sales = useSelector(salesSelectors.sales);
  const loading = useSelector(salesSelectors.loading);
  const meta = useSelector(salesSelectors.meta);

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
          {headerButton('SaleReview', require('assets/global/performance.png'))}
          {headerButton(
            'SalesSearch',
            require('assets/global/searcn.png'),
            styles.imageSearch,
          )}
        </View>
      ),
      headerLeft: () => (
        <Heading
          title={t(translations.sales.header)}
          back={route?.params?.showBackButton}
        />
      ),
    });
  }, [navigation, t]);

  useEffect(() => {
    sales?.length &&
      scrollRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      });
    dispatch(
      getSales({
        limit: 10,
        offset: 0,
        fromDate: formatApiDate(startDate),
        toDate: formatApiDate(endDate),
      }),
    );
  }, [isFocused, startDate]);

  const onMore = () => {
    dispatch(
      getSales({
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

  const onAddSalePress = () => {
    dispatch(resetSale());
    Navigator.navigate('AddSale', {startDate, endDate, isFromAddSale: true});
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
        title={t(translations.sales.addButton)}
        onPress={onAddSalePress}
      />
      <FlatList
        // @ts-ignore
        ref={scrollRef}
        data={sales || []}
        renderItem={({ item }) => (
          <SalesItem
            sale={item}
            onPress={() => Navigator.navigate('SaleDetails', { id: item.id })}
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
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 150,
        }}
        ListEmptyComponent={
          <EmptyState
            type="image"
            image={<SalesPlaceholder />}
            header={t(translations.sales.placeholder.header)}
            description={t(translations.sales.placeholder.description)}
            ph={11}
          />
        }
      />
    </MainPageTemplate>
  );
};

export default Sales;
