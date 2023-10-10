import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { ReactText, useEffect, useLayoutEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Pressable } from 'shared/pressable';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import {
  appointmentsSelector,
  getAppointmentsReview,
} from 'store/entities/appointments';
import { theme } from 'theme';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const CalendarReview: React.FC<Props> = ({ navigation }) => {
  const review = useSelector(appointmentsSelector.review);
  const loading = useSelector(appointmentsSelector.reviewLoading);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Review',
      headerTitleStyle: styles.titleReview,
      headerStyle: styles.headerReview,
      headerLeft: () => <BackButton light />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getAppointmentsReview());
  }, [isFocused]);

  const renderListItem = (
    title: string,
    value: ReactText,
    separator: boolean,
    onPress?: () => void,
  ) => (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View style={styles.rowSpace}>
        <Box flex row>
          <Text style={styles.titleItem}>{title}</Text>
          <Text style={styles.valueItem}>{value}</Text>
        </Box>
        {onPress && <Icon src={require('assets/global/arrowRight.png')} />}
      </View>
      {separator && <Separator mv={14} />}
    </Pressable>
  );

  const {
    appointments: { currentMonthCount, currentWeekCount },
    products,
  } = review;    

  return (
    <MainPageTemplate loading={loading}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.header}>
          <Image
            source={require('assets/backgrounds/reviewBackground.png')}
            style={styles.headerImage}
          />
          <Text style={styles.title}>Calendar Details Review</Text>
        </View>
        <Box ph={24}>
          <View
            style={[
              styles.contentContainer,
              styles.shadow,
              theme.spacing.mt(-32),
            ]}
          >
            {renderListItem(
              'Appointments this week',
              currentWeekCount,
              true,
              () =>
                navigation.navigate('CalendarReviewFilter', { filter: 'week', count: currentWeekCount, }),
            )}
            {renderListItem(
              'Appointments this month',
              currentMonthCount,
              false,
              () =>
                navigation.navigate('CalendarReviewFilter', {
                  filter: 'month',
                  count: currentMonthCount,
                }),
            )}
          </View>
          <Text style={styles.topText}>
            Top 3 Appointment Service Activities
          </Text>
          <View style={[styles.contentContainer, styles.shadow]}>
            {products
              ?.slice(0, 3)
              ?.map((product: any, index: number) =>
                renderListItem(
                  product?.name,
                  product?.appointmentsCount,
                  index < 2 && products.length - 1 > index,
                ),
              )}
            {!products?.length ? (
              <Text style={styles.notice}>
                This information is not available as there are 
                no services assigned to some of your appointments
              </Text>
            ) : null}
          </View>
        </Box>
        <Box ai="center">
          <View style={styles.logoPosition}>
            <Image
              source={require('assets/global/logoInactive.png')}
              style={styles.logo}
            />
            <Text style={styles.titleLogo}>Work Smarter</Text>
          </View>
        </Box>
      </ScrollView>
    </MainPageTemplate>
  );
};

export default CalendarReview;
