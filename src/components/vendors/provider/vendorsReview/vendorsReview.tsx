import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { MainPageTemplate } from 'shared/templates';
import { getVendorsReview, vendorsSelectors } from 'store/entities/vendors';
import COLORS from 'utils/colors';
import { currency } from 'utils/currency';
import { formatNumber } from 'utils/numbers';

import { VendorTopItem } from './components/vendorTopItem';
import { vendorsReviewStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList, 'VendorsReview'>;

const VendorsReview: React.FC<Props> = ({ navigation }) => {
  const loading = useSelector(vendorsSelectors.reviewLoading);
  const vendorsReview = useSelector(vendorsSelectors.vendorsReview);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: S.headerBar,
      headerTitle: () => (
        <Paragraph size="l" type="book" color={COLORS.white60}>
          {t(translations.common.review)}
        </Paragraph>
      ),
      headerLeft: () => (
        <BackButton
          light
          onPress={() =>
            navigation.navigate('Vendors', { hasExpensesThisMonth: false })
          }
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getVendorsReview());
  }, []);

  const navigateToExpenseThisMonth = () =>
    navigation.push('Vendors', { hasExpensesThisMonth: true });

  return (
    <MainPageTemplate loading={loading}>
      <View style={S.header}>
        <Image
          source={require('assets/backgrounds/reviewBackground.png')}
          style={S.headerImage}
        />
        <Paragraph size="l" type="bold" color={COLORS.white}>
          {t(translations.vendors.detailsReview)}
        </Paragraph>
      </View>
      <View style={S.content}>
        <View style={S.counterBar}>
          <Box mr={20}>
            <Paragraph size="s" type="book" mb={4}>
              {t(translations.vendors.noOfVendors)}
            </Paragraph>
            <Paragraph size="xxl">{vendorsReview?.count || 0}</Paragraph>
          </Box>
          <Separator vertical mh={20} />
          <Box>
            <Paragraph size="s" type="book" mb={4}>
              {t(translations.vendors.expenseMonth)}
            </Paragraph>
            <Box row ai="flex-end">
              <Text style={S.sign}>$</Text>
              <Paragraph size="xxl">
                {formatNumber(vendorsReview?.expensesCurrentMonthTotal || 0, 2)}
              </Paragraph>
            </Box>
          </Box>
        </View>
        <TouchableOpacity
          style={S.blockContent}
          onPress={navigateToExpenseThisMonth}
        >
          <Box row mb={7} mt={7} jc="space-between" ai="center">
            <Paragraph size="s" type="book">
              {t(translations.vendors.withExpenses)}:
            </Paragraph>
            <Box row ai="center" jc="center">
              <Paragraph size="s" type="book" color={COLORS.black}>
                {vendorsReview?.vendorsWithExpensesCount || 0}
              </Paragraph>
              <Icon
                src={require('assets/global/arrowRight.png')}
                size={20}
                mr={8}
              />
            </Box>
          </Box>
        </TouchableOpacity>
        <Paragraph size="s" type="book" mb={10}>
          {t(translations.vendors.topExpenses)}
        </Paragraph>
        <View style={S.blockContent}>
          {vendorsReview?.topVendorExpenseTypes.map((vendor, index) => (
            <VendorTopItem
              key={vendor.id}
              name={vendor.shortName}
              value={currency.format(vendor.total)}
              isLast={index === vendorsReview?.topVendorExpenseTypes.length - 1}
            />
          ))}
        </View>
      </View>
      <Box row jc="center" ai="center" mb={50}>
        <Icon
          src={require('assets/global/logoInactive.png')}
          size={30}
          mr={8}
        />
        <Paragraph size="s" type="book" color={COLORS.warmGrey}>
          {t(translations.common.workSmarter)}
        </Paragraph>
      </Box>
    </MainPageTemplate>
  );
};

export { VendorsReview };
