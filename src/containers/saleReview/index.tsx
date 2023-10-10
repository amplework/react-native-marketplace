import { StackNavigationProp } from '@react-navigation/stack';
import { SalesApi } from 'api/sales';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { Separator } from 'shared/separator';
import { toast } from 'shared/toast';

import { Navigator } from '../../service/navigator';
import { LABELS } from './labels';
import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const SaleReview: React.FC<Props> = ({ navigation }) => {
  const [saleReview, setSaleReview] = useState<any>({});

  useEffect(() => {
    getSaleReview();
  }, []);

  const getSaleReview = async () => {
    try {
      const { data } = await SalesApi.salesReview();
      setSaleReview(data?.sales);
    } catch (error) {
      toast.info(error?.message);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: LABELS.header,
      headerTitleStyle: styles.titleReview,
      headerStyle: styles.headerReview,
      headerLeft: () => <BackButton light />,
    });
  }, [navigation]);

  const renderListItem = (
    title: string,
    value: number | string,
    separator: boolean,
    onPress?: () => void,
  ) => (
    <View>
      <TouchableOpacity
        style={styles.rowSpace}
        onPress={onPress}
        activeOpacity={onPress ? 0 : 1}
      >
        <Text style={styles.titleItem}>{title}</Text>
        <View style={styles.row}>
          <Text style={styles.valueItem}>{value}</Text>
          {onPress && (
            <Image
              source={require('assets/global/arrowRight.png')}
              style={styles.arrow}
            />
          )}
        </View>
      </TouchableOpacity>
      {separator && <Separator mv={14} />}
    </View>
  );
  const {
    currentMonthCount,
    currentWeekCount,
    currentMonthTotal,
    currentWeekTotal,
    currentYearTotal,
  } = saleReview || {};

  return (
    <SafeContainer safeStyle={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <Image
            source={require('assets/backgrounds/reviewBackground.png')}
            style={styles.headerImage}
          />
          <Text style={styles.title}>{LABELS.title}</Text>
        </View>
        <View style={[styles.headerContainer, styles.shadow]}>
          <Box flex>
            <Text style={styles.titleOfHeader}>{LABELS.week}</Text>
            <Text style={styles.valueOfHeader}>
              <Text style={styles.subValue}>$ </Text>
              {currentWeekTotal || 0}
            </Text>
          </Box>
          <Separator vertical mh={26} />
          <Box flex>
            <Text style={styles.titleOfHeader}>{LABELS.month}</Text>
            <Text style={styles.valueOfHeader}>
              <Text style={styles.subValue}>$ </Text>
              {currentMonthTotal || 0}
            </Text>
          </Box>
        </View>
        <View style={[styles.contentContainer, styles.shadow]}>
          {renderListItem(LABELS.totalWeek, currentWeekCount || 0, true, () =>
            Navigator.navigate('SalesReviewFilter', { filter: 'week' }),
          )}
          {renderListItem(LABELS.totalMonth, currentMonthCount || 0, true, () =>
            Navigator.navigate('SalesReviewFilter', { filter: 'month' }),
          )}
          {renderListItem(
            LABELS.totalYear,
            `$ ${currentYearTotal || 0}`,
            false,
          )}
        </View>
        <View style={styles.logoPosition}>
          <Image
            source={require('assets/global/logoInactive.png')}
            style={styles.logo}
          />
          <Text style={styles.titleLogo}>{LABELS.bottomTitle}</Text>
        </View>
      </ScrollView>
    </SafeContainer>
  );
};

export default SaleReview;
