import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import SafeContainer from 'shared/container';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { estimatesSelectors, getEstimatesReview, getFilteredEstimates } from 'store/entities/estimates';
import { theme } from 'theme';
import COLORS from 'utils/colors';

import { CounterBar } from './components/counterBar';
import { DetailsSection } from './components/detailsSection';
import { LogoPlaceholder } from './components/logoPlaceholder';
import { ReviewHeader } from './components/reviewHeader';
import { styles } from './style';
import { formatApiDate, getEndOfMonth } from 'utils/dates';
import moment from 'moment';

type Props = StackScreenProps<RootStackParamList>;

const EstimatesReview: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector(estimatesSelectors.reviewLoading);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: styles.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {I18n.t('estimates.review')}
        </Paragraph>
      ),
      headerLeft: () => <BackButton light />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getEstimatesReview());
    dispatch(getFilteredEstimates({
      fromDate: formatApiDate(moment().toDate()),
      toDate: formatApiDate(getEndOfMonth()),
    }));
  }, [dispatch]);

  return (
    <SafeContainer safeStyle={styles.safe} containerStyle={styles.container}>
      <ScrollView style={theme.styles.flex} bounces={false}>
        <Loader loading={loading} />
        <ReviewHeader />
        <View style={styles.content}>
          <CounterBar />
          <DetailsSection />
          <LogoPlaceholder />
        </View>
      </ScrollView>
    </SafeContainer>
  );
};

export { EstimatesReview };
