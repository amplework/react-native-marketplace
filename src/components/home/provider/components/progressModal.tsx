import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import CheckBox from 'shared/checkbox';
import { t, translations } from 'locales';
import { Paragraph } from 'shared/paragraph';
import { Navigator } from 'service/navigator';
import { BottomSheet } from 'shared/bottomSheet';
import ScrollContainer from 'shared/scrollContainer';
import { useDispatch, useSelector } from 'react-redux';
import { closeProgressModal } from 'store/entities/home';
import { productsSelectors } from 'store/entities/products';
import { subscriptionSelectors } from 'store/entities/subscription';

export type ProfileSetup = {
  name: string;
  index: number;
  screen?: string;
  checked?: boolean;
  disabled?: boolean;
};

const ProgressModal: React.FC<any> = () => {

  const products: any = useSelector(productsSelectors.products);
  const subscription: any = useSelector(subscriptionSelectors.subscription);
  const providerProfileStatus: any = useSelector((state: any) => state.provider.profileCompleted);
  const isPremiumProvider = subscription?.subscriptionPlanId ? subscription?.subscriptionPlanId?.includes('premium') : false;
  const provider: any = useSelector((state: any) => state.provider.provider);
  const dispatch = useDispatch();

  const navigateToScreen = (screen: any) => Navigator.navigate(screen);
  const closeModal = () => dispatch(closeProgressModal());

  const personalInfoChecked = (
    provider?.firstName &&
    provider?.lastName &&
    provider?.phoneNumber &&
    provider?.address?.utctimezone
  ) ? true : false

  const businessInfoChecked = (
    provider?.industryId &&
    provider?.serviceId &&
    provider?.businessName &&
    provider?.expectedEarning
  ) ? true : false;

  const servicesChecked = (products?.length > 0 || provider?.isServices) ? true : false;

  const onlinePaymentChecked = (provider?.connectAccountId || provider?.isPayments) ? true : false;

  const socialChecked = (provider?.twiOauthToken || provider?.fbSocialToken || provider?.instagramAccessToken || provider?.isSocials) ? true : false;

  const getProfilePercent = () => {
    if (providerProfileStatus == 0) {
      return 10;
    }
    if (providerProfileStatus >= 100) {
      return 100;
    }
    return providerProfileStatus;
  }

  const ProfileSetupList: ProfileSetup[] = [
    {
      name: t(translations.common.profileSetupSteps.info),
      index: 0,
      screen: 'PersonalInfo',
      checked: personalInfoChecked,
      disabled: false,
    },
    {
      name: t(translations.common.profileSetupSteps.business),
      index: 1,
      screen: 'BusinessDetails',
      checked: businessInfoChecked,
      disabled: false,
    },
    {
      name: t(translations.common.profileSetupSteps.services),
      index: 2,
      screen: 'Services',
      checked: servicesChecked,
      disabled: false,
    },
    {
      name: t(translations.common.profileSetupSteps.paymentSetup),
      index: 3,
      screen: 'PaymentSetup',
      checked: onlinePaymentChecked,
      disabled: !isPremiumProvider ? true : false,
    },
    {
      name: t(translations.common.profileSetupSteps.social),
      index: 4,
      screen: 'SocialSetup',
      checked: socialChecked,
      disabled: !isPremiumProvider ? true : false,
    },
  ];

  return (
    <BottomSheet containerStyle={{ paddingHorizontal: 20, height: '65%' }} >
      <Box h={7} w={50} r={5} mt={10} bc={COLORS.pinkishGrey} as='center' />
      <TouchableOpacity onPress={closeModal} style={styles.closeContainer} >
        <Icon src={require('assets/global/close.png')} color={COLORS.brownishGrey} />
      </TouchableOpacity>
      <ScrollContainer>
        <Paragraph size='l' type='bold' >{t(translations.profileSetup.title)}</Paragraph>
        <Paragraph mb={15} size='s' type='book' >{t(translations.profileSetup.subHeading)}</Paragraph>
        <Box h={7} w={'100%'} r={5} bc={COLORS.clearBlue20} as='center'>
          <Box h={7} w={`${getProfilePercent()}%`} r={5} bc={COLORS.clearBlue} />
        </Box>
        {ProfileSetupList.map((notification: ProfileSetup) => (
          <CheckBox
            arrow
            key={notification.index}
            boxType='circle'
            onChange={() => { }}
            checked={notification.checked}
            disabled={notification?.disabled}
            onPressLabel={() => {
              closeModal();
              navigateToScreen(notification.screen);
            }}
            label={notification.name}
            styleContainer={styles.secondaryCheckbox}
            styleLabel={styles.secondaryLabel}
          />
        ))}
      </ScrollContainer>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  closeContainer: {
    height: 40,
    width: 40,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    backgroundColor: COLORS.whiteGray,
  },
  secondaryLabel: {
    color: COLORS.black,
    fontFamily: FONTS.book,
    fontSize: 20,
    lineHeight: 34,
  },
  secondaryCheckbox: {
    marginLeft: 2,
    top: 20,
    marginBottom: 6,
  },
})

export { ProgressModal };