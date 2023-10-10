import { useFocusEffect } from '@react-navigation/core';
import { translations } from 'locales';
import moment from 'moment-timezone';
import RNlocalize from 'react-native-localize';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import SafeContainer from 'shared/container';
import { EmptyState } from 'shared/emptyState';
import { HomePlaceholder } from 'shared/icon/icons';
import { ScheduleBadge } from 'shared/scheduleBadge';
import { Separator } from 'shared/separator';
import { subscriptionSelectors } from 'store/entities/subscription';
import {
  appointmentsSelector,
  clearAppointments,
  getAppointments,
  getScheduledAppointments,
} from 'store/entities/appointments';
import { homeSelectors, openProgressModal, selectHomeDate } from 'store/entities/home';
import { getTasks, tasksSelectors } from 'store/entities/tasks';
import { theme } from 'theme';
import COLORS from 'utils/colors';
import {
  getCalendarSettings,
} from 'store/entities/calendarSetup';

import { AppointmentsList } from './components/appointmentsList';
import { BottomLogoPlaceholder } from './components/bottomLogoPlaceholder';
import { DatepickerModal } from './components/datepickerModal';
import { HomeHeader } from './components/homeHeader';
import { TasksList } from './components/tasksList';
import { WeeklyStatistics } from './components/weeklyStatistic';
import { getStripeSubscriptions, getUserSubscriptionDetails } from 'store/entities/subscription/slice';
import { ProfileSetupBox } from './components/profileSetupBox';
import { SubscriptionSetupBox } from './components/subscriptionSetupBox';
import { ProgressModal } from './components/progressModal';
import { productsSelectors } from 'store/entities/products';
import { getIndustries, industriesSelectors } from 'store/entities/industries';
import { updateProfileCompleteStatus, updateProviderProfileStatus } from 'store/actions/provider';
import { CompleteProfileModal } from './components/completeProfileModal';
import { homeStyles } from './style';

type Props = StackScreenProps<RootStackParamList, 'Calendar'>;

const Home: React.FC<Props> = ({ navigation }: any) => {
  const selectedDate = useSelector(homeSelectors.selectedDate);
  const progressModal = useSelector(homeSelectors.isProgressModalOpened);
  const performancePreview = useSelector(homeSelectors.performancePreview);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const actionCount = useSelector(subscriptionSelectors.actionCount);
  const tasks = useSelector(tasksSelectors.tasks);
  const tasksLoading = useSelector(tasksSelectors.loading);
  const industriesLoading = useSelector(industriesSelectors.loading);
  const appointments = useSelector(appointmentsSelector.appointments);
  const appointmentsLoading = useSelector(appointmentsSelector.loading);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  // const isPremiumProvider = subscription?.subscriptionPlan ? subscription?.subscriptionPlan?.includes('premium') : false;
  const products: any = useSelector(productsSelectors.products);
  const provider: any = useSelector((state: any) => state.provider.provider);
  const profileCompleteModalCount: any = useSelector((state: any) => state.provider.profileInstructionsCount);
  const providerProfileStatus: any = useSelector((state: any) => state.provider.profileCompleted);
  const isFreeTrial = subscription?.subscriptionPlan?.includes('free');

  let timezone = RNlocalize.getTimeZone();
  let localDate: any = moment.tz(timezone).format();

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSelectDate = (date: moment.Moment) => {
    dispatch(clearAppointments());
    dispatch(selectHomeDate(date));
  }

  const onResetCalendar = () => {
    dispatch(selectHomeDate(localDate));
  };

  const navigateToSubscription = () =>
    navigation.navigate('PickSubscription', {
      isSubscriptionExist: true
    });

  const showProgressModal = () => dispatch(openProgressModal());

  const personalInfoChecked = (
    provider?.firstName &&
    provider?.lastName &&
    provider?.phoneNumber &&
    provider?.address?.utctimezone &&
    provider?.industryId &&
    provider?.serviceId &&
    provider?.businessName &&
    provider?.expectedEarning &&
    (products?.length > 0 || provider?.isServices)
  ) ? true : false;

  useEffect(() => {
    if (provider) {
      let profileObj: any = {
        firstName: provider?.firstName ? provider?.firstName : null,
        lastName: provider?.lastName ? provider?.lastName : null,
        telephone: provider?.phoneNumber ? provider?.phoneNumber : null,
        address: provider?.address?.utctimezone ? provider?.address : null,
        industryId: provider?.industryId,
        serviceId: provider?.serviceId,
        businessName: provider?.businessName,
        expectedEarning: provider?.expectedEarning,
        services: (products?.length > 0 || provider?.isServices) ? true : null,
        onlinePayment: (provider?.connectAccountId || provider?.isPayments) ? true : null,
        socialMedia: (provider?.instagramAccessToken || provider?.fbSocialToken || provider?.isSocials) || null,
      }

      Object.keys(profileObj).forEach(key => {
        if (profileObj[key] === null) {
          delete profileObj[key];
        }
      });

      let length = Object.keys(profileObj).length;
      let profileCompletedPercent = Math.round(length / actionCount * 100);

      dispatch(updateProfileCompleteStatus(profileCompletedPercent))
    }
  }, [dispatch, provider, products, subscription]);

  useEffect(() => {
    if (personalInfoChecked && provider?.isProfileCompleted !== true) {
      dispatch(updateProviderProfileStatus({ isProfileCompleted: true }))
    }
  }, [personalInfoChecked]);

  useEffect(() => {
    dispatch(getIndustries())
  }, [!provider?.industryId, !provider?.serviceId])

  useEffect(() => {
    dispatch(getCalendarSettings());
    dispatch(getStripeSubscriptions());
    dispatch(selectHomeDate(localDate));
    dispatch(getUserSubscriptionDetails());
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!selectedDate) {
        return;
      }
      dispatch(
        getAppointments({
          limit: 30,
          order: 'ASC',
          fromDate: moment(selectedDate).format('YYYY-MM-DD'),
          status: ['scheduled', 'blocked'],
        }),
      );
    }, [dispatch, selectedDate]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!selectedDate) {
        return;
      }
      dispatch(
        getScheduledAppointments({
          limit: 30,
          order: 'ASC',
          fromDate: moment().format('YYYY-MM-DD'),
          status: 'scheduled',
        }),
      );
    }, [dispatch, selectedDate]),
  );

  useFocusEffect(
    useCallback(() => {
      if (!selectedDate) {
        return;
      }
      dispatch(
        getTasks({
          fromDate: moment(selectedDate).toISOString(),
          toDate: moment(selectedDate).toISOString(),
        }),
      );
    }, [dispatch, selectedDate]),
  );

  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <DatepickerModal onChangeDate={handleSelectDate} />
      <Box pv={24} ph={24} bc={COLORS.white} >
        <HomeHeader />
        <WeeklyStatistics />
      </Box>
      <Separator />
      <ScheduleBadge
        date={selectedDate}
        isHomeScreen={true}
        value={performancePreview?.busySchedule}
        loading={false}
        onReset={onResetCalendar}
      />
      {tasks.length ||
        appointments.length ||
        appointmentsLoading ||
        industriesLoading ||
        tasksLoading ? (
        <ScrollView style={theme.styles.safeView}>
          {(providerProfileStatus < 100) ? (
            <ProfileSetupBox
              onContinue={showProgressModal}
            />
          ) : null}
          {isFreeTrial ? (
            <SubscriptionSetupBox
              onContinue={navigateToSubscription}
            />) : null}
          <Box pv={24}>
            <AppointmentsList />
            {!liteSubcription && <TasksList />}
            <BottomLogoPlaceholder />
          </Box>
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={
            ((providerProfileStatus < 100) || isFreeTrial) ?
              homeStyles.profileStepContainer :
              homeStyles.emptyScrollContainer
          }
          style={theme.styles.safeView} >
          {(providerProfileStatus < 100) ? (
            <ProfileSetupBox
              onContinue={showProgressModal}
            />
          ) : null}
          {isFreeTrial ? (
            <SubscriptionSetupBox
              onContinue={navigateToSubscription}
            />) : null}
          <EmptyState
            type="image"
            image={<HomePlaceholder />}
            header={t(translations.home.placeholder.header)}
            description={t(translations.home.placeholder.description)}
            ph={35}
            pv={20}
          />
        </ScrollView>
      )}
      {progressModal && <ProgressModal />}
      {(profileCompleteModalCount == 1) && <CompleteProfileModal />}
    </SafeContainer>
  );
};

export { Home };