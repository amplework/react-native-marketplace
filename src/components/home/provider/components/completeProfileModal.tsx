import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { t, translations } from 'locales';
import { Paragraph } from 'shared/paragraph';
import { BottomSheet } from 'shared/bottomSheet';
import { useDispatch, useSelector } from 'react-redux';
import { productsSelectors } from 'store/entities/products';
import { closeProfileCompleteModal } from 'store/actions/provider';
import { CompleteProfilePlaceholder, IconComponent } from 'shared/icon/icons';
import Button from 'shared/button';
import { openProgressModal } from 'store/entities/home';
import ScrollContainer from 'shared/scrollContainer';

export type ProfileSetup = {
  name: string;
  index: number;
  screen?: string;
  checked?: boolean;
  disabled?: boolean;
};

const CompleteProfileModal: React.FC<any> = () => {

  const products: any = useSelector(productsSelectors.products);
  const provider: any = useSelector((state: any) => state.provider.provider);
  const dispatch = useDispatch();

  const { width, height } = Dimensions.get('window');
  const isSmallDevice = width < 375;


  const closeModal = () => dispatch(closeProfileCompleteModal());

  const handlePressContinue = () => {
    dispatch(closeProfileCompleteModal());
    dispatch(openProgressModal());
  };

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
  ];

  const sortedProfileSetup = ProfileSetupList.sort((a, b) => Number(b.checked) - Number(a.checked));

  return (
    <BottomSheet containerStyle={{ height: isSmallDevice ? '95%' : '65%' }} >
      <Box h={7} w={50} r={5} mt={10} bc={COLORS.pinkishGrey} as='center' />
      <TouchableOpacity onPress={closeModal} style={styles.closeContainer} >
        <Icon src={require('assets/global/close.png')} color={COLORS.brownishGrey} />
      </TouchableOpacity>
      <ScrollContainer>
        <Box ai='center'>
          <IconComponent
            size={160}
            Component={CompleteProfilePlaceholder}
          />
        </Box>
        <Box ph={32}>
          <Box row ai='center' jc="space-between" >
            {sortedProfileSetup?.map((item: ProfileSetup, index) => {
              const lineColor = item?.checked ? COLORS.clearBlue : COLORS.clearBlue10
              return (
                <Box
                  key={index}
                  h={5} w={'30%'} r={5} mt={10}
                  bc={lineColor} />
              )
            })}
          </Box>
          <Paragraph color={COLORS.black} type="bold" size="l" mv={15} >{"Complete your profile"}</Paragraph>
          <Paragraph type="book">{t(translations.common.profileSetupSteps.description)}</Paragraph>
        </Box>
        <Box ph={12}>
          <Button
            text='Continue'
            onPress={handlePressContinue}
            buttonStyle={{ marginVertical: 20 }}
          />
        </Box>
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
    marginRight: 12,
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

export { CompleteProfileModal };