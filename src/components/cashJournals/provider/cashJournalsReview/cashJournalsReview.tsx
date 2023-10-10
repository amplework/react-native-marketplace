import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import {
  cashJournalsSelectors,
  getCashJournalsReview,
} from 'store/entities/cashJournals';
import { theme } from 'theme';
import COLORS from 'utils/colors';

import { CashJournalsDetailsSections } from './components/cashJournalsDetailsSections';
import { CashJournalsReviewHeader } from './components/cashJournalsReviewHeader';
import { LogoPlaceholder } from './components/logoPlaceholder';
import { cashJournalsReviewStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const CashJournalsReview: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector(cashJournalsSelectors.reviewLoading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: S.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {t(translations.cashJournals.review.header)}
        </Paragraph>
      ),
      headerLeft: () => <BackButton light />,
    });
  }, [navigation, t]);

  useEffect(() => {
    dispatch(getCashJournalsReview());
  }, [dispatch]);

  return (
    <SafeContainer
      safeStyle={theme.styles.safeView}
      containerStyle={theme.styles.flex}
    >
      <Loader loading={loading} />
      <CashJournalsReviewHeader />
      <View style={[theme.styles.grow, theme.spacing.ph(24)]}>
        <CashJournalsDetailsSections />
      </View>
      <LogoPlaceholder />
    </SafeContainer>
  );
};

export { CashJournalsReview };
