import { StackScreenProps } from '@react-navigation/stack';
import { formatPerformanceReviewRange } from 'components/home/helpers/dates';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Paragraph } from 'shared/paragraph';
import { LogoPlaceholder, ReviewHeader } from 'shared/review';
import { MainPageTemplate } from 'shared/templates';
import {
  getPerformanceReview,
  homeSelectors,
  openPeriodModal,
} from 'store/entities/home';
import { subscriptionSelectors } from 'store/entities/subscription';
import { theme } from 'theme';
import { LITE } from 'types/subscription';
import COLORS from 'utils/colors';

import { PerformanceReviewCounter } from './components/performanceReviewCounter';
import { PerformanceReviewDetails } from './components/performanceReviewDetails';
import { PeriodSheet } from './components/periodSheet';
import { performanceReviewStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const PerformanceReview: React.FC<Props> = ({ navigation }) => {
  const isPeriodModalOpened = useSelector(homeSelectors.isPeriodModalOpened);
  const period = useSelector(homeSelectors.period);
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const loading = useSelector(homeSelectors.performanceReviewLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: S.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {t(translations.home.review.header)}
        </Paragraph>
      ),
      headerLeft: () => <BackButton light />,
    });
  }, [navigation, t]);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    dispatch(
      getPerformanceReview({ 
        date: moment(selectedDate).format('YYYY-MM-DD'), 
        period 
      }),
    );
  }, [dispatch, selectedDate, period]);

  const openModal = () => dispatch(openPeriodModal());

  return (
    <MainPageTemplate loading={loading}>
      {isPeriodModalOpened && <PeriodSheet />}
      <ScrollView style={theme.styles.flex} bounces={false}>
        <ReviewHeader
          title={t(translations.home.review.periods[period])}
          pressable
          onPress={openModal}
        >
          <Paragraph color={COLORS.whiteGray}>
            {formatPerformanceReviewRange(period, moment(selectedDate))}
          </Paragraph>
          <Paragraph size="xs" color={COLORS.warmGrey} mb={16}>
            {t(translations.home.review.hint)}
          </Paragraph>
        </ReviewHeader>
        <PerformanceReviewCounter />
        <PerformanceReviewDetails />
        <LogoPlaceholder />
      </ScrollView>
    </MainPageTemplate>
  );
};

export { PerformanceReview };
