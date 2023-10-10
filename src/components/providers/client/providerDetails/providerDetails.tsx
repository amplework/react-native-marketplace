import { StackScreenProps } from '@react-navigation/stack';
import { translations } from 'locales';
import moment from 'moment';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Animated, Image, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Error } from 'shared/error';
import { Icon } from 'shared/icon';
import { Loader } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { getProductsById } from 'store/entities/products';
import {
  getSalesSpecialsByProvider,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  getProvider,
  providersSelectors,
  shortlistProvider,
  unshortlistProvider,
} from 'store/entities/providers';
import COLORS from 'utils/colors';

import { RootStackParamList } from '../../../../index';
import { DealsTab } from './components/dealsTab';
import { ProviderAppointmentsTab } from './components/providerAppointmentsTab';
import { ProviderDetailsHeader } from './components/providerDetailsHeader';
import { ProviderDetailsTab } from './components/providerDetailsTab';
import { ProviderInvoicesTab } from './components/providerInvoicesTab';
import { ProviderPaymentsTab } from './components/providerPaymentsTab';
import { ProviderSalesTab } from './components/providerSalesTab';
import { styles } from './style';
import { getBlockedProviders } from 'store/entities/providers/slice';
import { TouchableOpacity as TouchableOpacityRNGH } from 'react-native-gesture-handler';
import RNParallaxHeader from 'shared/parallexHeader';
import { ProviderEstimatesTab } from './components/providerEstimatesTab';

const TABS = [
  translations.providers.tabs.details,
  translations.providers.tabs.appointments,
  translations.providers.tabs.invoices,
  translations.providers.tabs.sales,
  translations.providers.tabs.payments,
  translations.providers.tabs.deals,
  translations.providers.tabs.estimates,
];

const DEFAULT_HEADER_MAX_HEIGHT = 323;
const DEFAULT_HEADER_MIN_HEIGHT = 120;

interface Props
  extends StackScreenProps<RootStackParamList, 'ProviderDetails'> { }

const ProviderDetails: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const scrollYRef = useRef(new Animated.Value(0));

  const provider: any = useSelector(providersSelectors.provider);
  const loading = useSelector(providersSelectors.providerLoading);
  const error = useSelector(providersSelectors.providerError);
  const salesSpecialsByProvider = useSelector(salesSpecialSelectors.salesSpecialsByProvider);

  const shortlistLoading = useSelector(providersSelectors.shortlistLoading);

  const [activeTab, setActiveTab] = useState(0);
  const [rewardModalVisibility, setRewardModalVisibility] = useState(false);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  function getHeaderScrollDistance() {
    return DEFAULT_HEADER_MAX_HEIGHT - DEFAULT_HEADER_MIN_HEIGHT
  }

  function getInputRange() {
    return [-(20), 0, getHeaderScrollDistance()];
  }

  function getAnimatedTabHeight() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 13, 26, 39, 55],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedPhoneFontSize() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 4, 8, 12, 16],
      extrapolate: 'clamp',
    });
  }

  function getNavBarForegroundOpacity() {
    return scrollYRef.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
  }

  const confirmUnshortlist = useCallback(() => {
    Alert.alert(
      t(translations.common.warning),
      t(translations.providers.unshortlistWarning),
      [
        {
          text: t(translations.common.cancel),
          style: 'cancel',
        },
        {
          text: t(translations.common.remove),
          onPress: () => dispatch(unshortlistProvider(provider!)),
          style: 'destructive',
        },
      ],
    );
  }, [dispatch, provider]);

  const toggleShortlist = useCallback(() => {
    provider?.isShortlisted
      ? confirmUnshortlist()
      : dispatch(shortlistProvider(provider!));
  }, [provider, dispatch, confirmUnshortlist]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
      headerRight: () =>
        loading ? null : (
          <Icon
            src={
              provider?.isShortlisted
                ? require('assets/global/starActive.png')
                : require('assets/global/star.png')
            }
            onPress={toggleShortlist}
            disabled={shortlistLoading}
            mr={16}
          />
        ),
    });
  }, [navigation, loading, provider, toggleShortlist, shortlistLoading]);

  useEffect(() => {
    dispatch(getProductsById({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getProvider(id));
    dispatch(getBlockedProviders({ query: '' }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getSalesSpecialsByProvider({ id }));
  }, [dispatch, id]);

  const fetchProvider = () => dispatch(getProvider(id));

  const changeTab = (tab: number) => () => setActiveTab(tab);

  const navigateToAddAppointment = () =>
    Navigator.navigate('AddAppointment', {
      client: provider,
      selectedDayStart: moment.utc(new Date()).startOf('day'),
      selectedDayEnd: moment.utc(new Date()).endOf('day'),
    });

  const openRewardModal = () => setRewardModalVisibility(true)
  const closeRewardModal = () => setRewardModalVisibility(false)

  const renderTabs = () => (
    <ScrollView
      horizontal
      contentContainerStyle={styles.scrollContent}
      style={styles.scroll}
      showsHorizontalScrollIndicator={false}
    >
      {TABS.map((tab, index) => {
        const isActive = index === activeTab;

        return (
          <TouchableOpacityRNGH
            key={tab}
            onPress={changeTab(index)}
          >
            <View style={[styles.tab, isActive && styles.activeIndicator]}>
              <Text style={styles.headerTitle}>
                {(t(tab) == 'Deals' && (salesSpecialsByProvider?.length > 0)) ? `${t(tab)} (${salesSpecialsByProvider?.length})` : t(tab)}
              </Text>
            </View>
          </TouchableOpacityRNGH>
        );
      })}
    </ScrollView>
  );

  const renderBackgroundTabs = () => {
    const tabHeight = getAnimatedTabHeight();
    const titleTextSize = getAnimatedPhoneFontSize();
    const contentOpacity = getNavBarForegroundOpacity();
    return (
      <Animated.ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        style={[styles.scroll, {
          minHeight: tabHeight,
          maxHeight: tabHeight,
          // borderTopWidth: borderTopWidth,
          opacity: contentOpacity
        }]}
        showsHorizontalScrollIndicator={false}
      >
        {TABS.map((tab, index) => {
          const isActive = index === activeTab;

          return (
            <TouchableOpacityRNGH
              key={tab}
              onPress={changeTab(index)}
            >
              <Animated.View style={[styles.tab, isActive && styles.activeIndicator]}>
                <Animated.Text style={[styles.headerTitle, {
                  fontSize: titleTextSize
                }]}>
                  {(t(tab) == 'Deals' && (salesSpecialsByProvider?.length > 0)) ? `${t(tab)} (${salesSpecialsByProvider?.length})` : t(tab)}
                </Animated.Text>
              </Animated.View>
            </TouchableOpacityRNGH>
          );
        })}
      </Animated.ScrollView>
    )
  };

  const renderTitle = () => (
    <>
      <ProviderDetailsHeader
        openRewardModal={openRewardModal} />
      <Separator />
      {renderTabs()}
    </>
  );

  const renderNavBar = () => (
    <>
      <ProviderDetailsHeader compact scrollYRef={scrollYRef} />
      <Separator />
      {renderBackgroundTabs()}
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <ProviderDetailsTab providerDetails={provider} />;
      case 1:
        return <ProviderAppointmentsTab />;
      case 2:
        return <ProviderInvoicesTab />;
      case 3:
        return <ProviderSalesTab />;
      case 4:
        return <ProviderPaymentsTab />;
      case 5:
        return <DealsTab />;
      case 6:
        return <ProviderEstimatesTab />;
    }
  };

  if (error) {
    return <Error onRetry={fetchProvider} />;
  }

  return loading ? (
    <Loader loading />
  ) : (
    <SafeContainer containerStyle={styles.container}>
      <RNParallaxHeader
        extraScrollHeight={20}
        navbarColor={COLORS.white}
        backgroundColor={COLORS.white}
        title={renderTitle()}
        scrollY={scrollYRef}
        backgroundImageScale={1.2}
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        innerContainerStyle={styles.container}
        headerMinHeight={DEFAULT_HEADER_MIN_HEIGHT}
        headerMaxHeight={DEFAULT_HEADER_MAX_HEIGHT}
      />
      <View style={styles.bookAppointmentContainer}>
        <Button
          text={t(translations.providers.bookAppointment)}
          onPress={navigateToAddAppointment}
          buttonStyle={styles.bookAppointmentButton}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={rewardModalVisibility}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.posHeader}>
                <View style={styles.titleNewCenter}>
                  <Text style={styles.titleNewService}>{'Available Rewards'}</Text>
                </View>
                <TouchableOpacity
                  onPress={closeRewardModal}
                >
                  <Image
                    source={require('assets/global/close.png')}
                    style={styles.closeImage}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView contentContainerStyle={styles.rewardModalContainer}>
                <View style={styles.paddingContentScroll}>
                  <View style={styles.paddingContentScrollInner}>
                    {provider?.rewards
                      ?.filter((val: any) => (val?.type == "birthday" || val?.type == "loyalty"))
                      ?.map((item: any) => {
                        let discountAfter = item?.rewardType == 'discount percent'
                          ? item?.services?.map((val: any) => `${val?.name} [$${val?.price - item?.discountRate / 100 * val?.price}]`)?.join(', ')
                          : item?.services?.map((val: any) => `${val?.name} [$${val?.price - item?.discount}]`)?.join(', ')

                        return (
                          <View style={styles.rewardCard}>
                            <Text style={[styles.firstName, { textTransform: 'capitalize' }]}>
                              {item?.type}{' Reward'}
                            </Text>
                            {(item?.services?.length > 0) && (
                              <Paragraph mt={6} size='s' type='book'>
                                {'Services: '}
                                <Paragraph size='s' type='medium'>
                                  {item?.services?.map((val: any) => `${val?.name} [$${val?.price}]`)?.join(', ')}
                                </Paragraph>
                              </Paragraph>
                            )}
                            {(item?.rewardType == 'discount amount') && (
                              <Paragraph mt={6} size='s' type='book'>
                                {'Offer: '}
                                <Paragraph size='s' type='medium'>
                                  {'$'}{item?.discount}
                                </Paragraph>
                              </Paragraph>
                            )}
                            {(item?.rewardType == 'discount percent') && (
                              <Paragraph mt={6} size='s' type='book'>
                                {'Offer: '}
                                <Paragraph size='s' type='medium'>
                                  {item?.discountRate}{'%'}
                                </Paragraph>
                              </Paragraph>
                            )}
                            <Paragraph mt={6} size='s' type='book'>
                              {'Description: '}
                              <Paragraph size='s' type='medium'>
                                {item?.description}
                              </Paragraph>
                            </Paragraph>
                            {(item?.services?.length > 0) && (
                              <Paragraph mt={6} size='s' type='book'>
                                {'Service amount after offer: '}
                                <Paragraph size='s' type='medium'>
                                  {discountAfter}
                                </Paragraph>
                              </Paragraph>
                            )}
                          </View>
                        )
                      })}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeContainer>
  );
};

export { ProviderDetails };
