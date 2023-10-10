import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import moment from 'moment-timezone';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { EmptyState } from 'shared/emptyState';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import {
  getSalesSpecialById,
  salesSpecialSelectors,
} from 'store/entities/salesSpecial';
import {
  getProvider,
  providersSelectors,
} from 'store/entities/providers';
import COLORS from 'utils/colors';
import { styles } from '../../style';
import { Navigator } from 'service/navigator';
import { capitalize } from 'utils/strings';
import Button from 'shared/button';

type Props = StackScreenProps<RootStackParamList, 'ClientSalesSpecialDetails'>;

const SalesSpecialDetails: React.FC<Props> = ({ navigation, route }) => {
  const loading = useSelector(salesSpecialSelectors.loading);
  const salesSpecial = useSelector(salesSpecialSelectors.salesSpecialById);
  const providerloading = useSelector(providersSelectors.loading);
  const provider = useSelector(providersSelectors.provider);
  const client = useSelector((state: any) => state.client.client);
  const clientOffset = client?.utcOffset;
  const clientTimezone = client?.address?.utctimezone;
  const isQuickPromotion = salesSpecial?.isQuickPromotion;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  let dealPrice = salesSpecial?.salePrice;
  let actualPrice = salesSpecial?.actualPrice;
  let difference = Number(actualPrice) - Number(dealPrice);
  let percentOff = (difference / Number(actualPrice)) * 100;

  const discountedPrice = isQuickPromotion
    ? salesSpecial?.service
      ? (salesSpecial?.service?.price - (salesSpecial?.service?.price * salesSpecial?.discount / 100)).toFixed(0)
      : 0
    : salesSpecial?.salePrice

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={t(translations.clientSalesSpecialDetails.header)} />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getSalesSpecialById({ id: route.params?.id }));
  }, [dispatch]);

  useEffect(() => {
    if (salesSpecial?.profile?.id) {
      dispatch(getProvider(salesSpecial?.profile?.id));
    }
  }, [dispatch, salesSpecial]);

  const navigateToAddAppointment = () =>
    Navigator.navigate('AddAppointment', {
      client: provider,
      selectedSalesSpecial: salesSpecial,
    });

  const DetailComponent = ({ mt = 8, title, description }: any) => {
    return (
      <Paragraph mt={mt} size='s' type='book'>
        {title}
        <Paragraph size='s' type='medium'>
          {description}
        </Paragraph>
      </Paragraph>
    )
  }

  const getValidForDetails = (salesSpecial: any) => {
    let validFor = ''

    if (salesSpecial?.isCombination) {
      if (salesSpecial?.isExistingClient) {
        validFor = `${t(translations.clientSalesSpecialDetails.existingClientsOnly)}, ${t(translations.clientSalesSpecialDetails.noCombination)}`;
      } else {
        validFor = t(translations.clientSalesSpecialDetails.noCombination);
      }
    } else if (salesSpecial?.isExistingClient) {
      validFor = t(translations.clientSalesSpecialDetails.existingClientsOnly);
    }

    return validFor
  }

  return (
    <MainPageTemplate loading={loading || providerloading} bc={COLORS.white}>
      {(!(loading || providerloading)) && (
        <>
          {!salesSpecial ? (
            <EmptyState entities={t(translations.common.entities.salesSpecialDetails)} />
          ) : (
            <>
              <Box pv={24} ph={24}>
                <ImageBackground
                  source={{ uri: salesSpecial.banner?.url ?? 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg' }}
                  resizeMode='stretch'
                  style={styles.bannerImage}>
                  {isQuickPromotion ? (<Paragraph ml={18} size="s">
                    {String(percentOff).includes('-') ? '' :
                      `${salesSpecial?.discount} % Off on \n`}
                    {`${salesSpecial.service ? salesSpecial.service?.name : 'All Service'}`}
                  </Paragraph>) : (
                    <Paragraph ml={18} size="s">
                      {String(percentOff).includes('-') ? '' :
                        ((!salesSpecial?.banner?.url) && salesSpecial?.salePrice) && `${(Math.round(percentOff * 100) / 100).toFixed(2)} % Off on \n`}
                      {((!salesSpecial.banner?.url) && salesSpecial.service?.name) && `${salesSpecial.service?.name}`}
                    </Paragraph>
                  )}
                </ImageBackground>
              </Box>
              <Box ph={24}>
                <Box row jc={'space-between'}>
                  <Paragraph mt={18} size='l' type='bold'>{salesSpecial.title}</Paragraph>
                  {isQuickPromotion ? (salesSpecial?.service ? (
                    <Box row jc={'space-between'} ai={'center'}>
                      <Paragraph mt={18} size='s' type='book' mr={8} lt>{'$'}{salesSpecial.service?.price}</Paragraph>
                      <Paragraph mt={18} size='xl' type='bold' color={COLORS.orange}>{'$'}{discountedPrice}</Paragraph>
                    </Box>
                  ) : null) : (
                    <Box row jc={'space-between'} ai={'center'}>
                      <Paragraph mt={18} size='s' type='book' mr={8} lt>{'$'}{salesSpecial.service?.price}</Paragraph>
                      <Paragraph mt={18} size='xl' type='bold' color={COLORS.orange}>{'$'}{salesSpecial.salePrice}</Paragraph>
                    </Box>
                  )}
                </Box>
                <DetailComponent
                  mt={0}
                  title={'From: '}
                  description={`${salesSpecial.profile?.firstName} ${salesSpecial.profile?.lastName}`} />
                <Box row mt={8} ai={'center'} jc={'space-between'}>
                  <Icon src={require('assets/global/info.png')} size={20} mr={8} />
                  <Paragraph flex size='s' type='book'>{salesSpecial.saleDescription}</Paragraph>
                </Box>
                <Separator mv={12} />
                {salesSpecial.isTimeRestrication && (
                  <DetailComponent
                    title={'Time Restriction: '}
                    description={`${moment.utc(salesSpecial.restricationStartTime, ["HH:mm"]).utcOffset(Number(clientOffset)).format('hh:mm A')} to ${moment.utc(salesSpecial.restricationEndTime, ["HH:mm"]).utcOffset(Number(clientOffset)).format('hh:mm A')}`} />
                )}
                {salesSpecial.saleToday && salesSpecial?.date && (
                  <DetailComponent
                    title={'Date Restriction: '}
                    description={`${moment.tz(salesSpecial.date, clientTimezone).format('MM/DD/YY')}`} />
                )}
                {salesSpecial.isDateRestrication && (
                  <DetailComponent
                    title={'Date Restriction: '}
                    description={`${moment(salesSpecial.restricationStartDate).format('MM/DD/YY hh:mm A')} to ${moment(salesSpecial.restricationEndDate).format('MM/DD/YY hh:mm A')}`} />
                )}
                {salesSpecial.isDayRestrication && (
                  <DetailComponent
                    title={'Special Availability: '}
                    description={`${salesSpecial?.restricationDay.map((e: string) => capitalize(e))?.join(', ')}`} />
                )}
                {(salesSpecial.isCombination || salesSpecial.isExistingClient) && (
                  <DetailComponent
                    title={'Valid for: '}
                    description={getValidForDetails(salesSpecial)} />
                )}
              </Box>
            </>
          )}
        </>
      )}
      {salesSpecial ? (
        <Box ph={24} jc="flex-end" flex>
          <Button
            onPress={navigateToAddAppointment}
            text={t(translations.providers.bookAppointment)}
            buttonStyle={styles.bookAppointmentButton}
          />
        </Box>
      ) : null}
    </MainPageTemplate>
  );
};

export { SalesSpecialDetails };
