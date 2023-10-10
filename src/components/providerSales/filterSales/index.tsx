import { ReviewBlock } from 'components/sales/components/reviewBlock';
import { SalesItem } from 'components/sales/components/salesItem';
import { translations } from 'locales';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Navigator } from 'service/navigator';
import { EmptyState } from 'shared/emptyState';
import { SmallDateRange } from 'utils/dates';

import styles from './style';

export interface Props {
  startDate: any;
  endDate: any;
  meta: any;
  scrollRef: any;
  onMinus: () => void;
  onPlus: () => void;
  sales: any;
  totalSum: number;
  onEnd: boolean;
  onMore: () => void;
  setEnd: (value: boolean) => void;
  range: SmallDateRange;
}

const FilterSales: React.FC<Props> = ({
  startDate,
  endDate,
  meta,
  onMinus,
  totalSum,
  onPlus,
  sales,
  onEnd,
  onMore,
  setEnd,
  scrollRef,
  range,
}) => {
  const { t } = useTranslation();

  const getDate = (data: any) => moment(data).format('Do MMM');

  const getYear = (data: any) => new Date(data).getFullYear();

  const renderPeriod = () =>
    `${getDate(startDate)} - ${getDate(endDate)} ${getYear(endDate)}`;

  const renderArrow = (onPress: () => void, image: any) => (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.arrow} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.positionTopContainer}>
        <View style={styles.containerOfDays}>
          {renderArrow(onMinus, require('assets/global/sliderLeft.png'))}
          <Text style={styles.date}>{renderPeriod()}</Text>
          {renderArrow(onPlus, require('assets/global/sliderRight.png'))}
        </View>
      </View>
      <FlatList
        ref={scrollRef}
        data={sales || []}
        ListHeaderComponent={() => (
          <ReviewBlock totalSum={totalSum} count={meta?.totalCount} />
        )}
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
            setEnd(true);
          }
        }}
        onMomentumScrollBegin={() => setEnd(false)}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 24,
          paddingBottom: 150,
        }}
        ListEmptyComponent={
          <EmptyState
            entities={t(translations.common.entities.sales)}
            type={range}
          />
        }
      />
    </>
  );
};

export default FilterSales;
