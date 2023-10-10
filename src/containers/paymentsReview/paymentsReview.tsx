import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';
import { LogoPlaceholder, ReviewHeader } from 'shared/review';
import { MainPageTemplate } from 'shared/templates';
import { getPaymentsReview, paymentsSelectors } from 'store/entities/payments';
import { formatNumber } from 'utils/numbers';

import { PaymentsReviewSections } from './components/paymentsReviewSection';
import { paymentsReviewStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

export const PaymentsReview: React.FC<Props> = ({ navigation }) => {
  const review = useSelector(paymentsSelectors.review);
  const loading = useSelector(paymentsSelectors.reviewLoading);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getPaymentsReview());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: t(translations.paymentsReview.header),
      headerTitleStyle: S.titleReview,
      headerStyle: S.headerReview,
      headerLeft: () => <BackButton light />,
    });
  }, [navigation]);

  return (
    <MainPageTemplate loading={loading}>
      <ReviewHeader title={t(translations.paymentsReview.title)} />
      <View style={S.content}>
        <TwinCounter mt={-32}>
          <TwinCounterBar
            label={t(translations.paymentsReview.year)}
            adornment={<Sign>$</Sign>}
          >
            {formatNumber(review.payments.currentYearTotal, 2)}
          </TwinCounterBar>
          <TwinCounterBar
            label={t(translations.paymentsReview.month)}
            adornment={<Sign>$</Sign>}
          >
            {formatNumber(review.payments.currentMonthTotal, 2)}
          </TwinCounterBar>
        </TwinCounter>
      </View>
      <PaymentsReviewSections />
      <LogoPlaceholder />
    </MainPageTemplate>
  );
};
