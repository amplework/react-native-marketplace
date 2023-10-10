import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { getInvoicesReview, invoicesSelectors } from 'store/entities/invoices';
import COLORS from 'utils/colors';

import { CounterBar } from './components/counterBar';
import { DetailsSection } from './components/detailsSection';
import { LogoPlaceholder } from './components/logoPlaceholder';
import { ReviewHeader } from './components/reviewHeader';
import { styles } from './style';

type Props = StackScreenProps<RootStackParamList>;

const InvoicesReview: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector(invoicesSelectors.reviewLoading);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: styles.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {I18n.t('invoices.review')}
        </Paragraph>
      ),
      headerLeft: () => <BackButton light />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getInvoicesReview());
  }, [dispatch]);

  return (
    <SafeContainer safeStyle={styles.safe} containerStyle={styles.container}>
      <Loader loading={loading} />
      <ReviewHeader />
      <View style={styles.content}>
        <CounterBar />
        <DetailsSection />
      </View>
      <LogoPlaceholder />
    </SafeContainer>
  );
};

export { InvoicesReview };
