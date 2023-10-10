import React from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import {
  salesSpecialSelectors,
  loadMoreClientSalesSpecials,
} from 'store/entities/salesSpecial';
import _ from 'lodash';
import { Navigator } from 'service/navigator';
import { homeStyles as S } from '../style';
import { theme } from 'theme';
import COLORS from 'utils/colors';
import { LIMIT } from 'api';
import FastImage from 'react-native-fast-image';

const MoreSpecials: React.FC = () => {
  const clientSalesSpecialsLoading = useSelector(salesSpecialSelectors.clientSalesSpecialsLoading);
  const clientSalesSpecialsList = useSelector(salesSpecialSelectors.clientSalesSpecialsList);
  const clientSalesSpecialsLoadingMore = useSelector(salesSpecialSelectors.clientSalesSpecialsLoadingMore);
  const offset = useSelector(salesSpecialSelectors.clientSalesSpecialsOffset);
  const total = useSelector(salesSpecialSelectors.clientSalesSpecialsTotal);

  const defaultImage: string = 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg';

  const dispatch = useDispatch();

  const loadMore = () => {
    if ((clientSalesSpecialsList?.length + 5) < total) {
      dispatch(loadMoreClientSalesSpecials(offset + LIMIT));
    }
  };

  return (clientSalesSpecialsLoading) ? (
    <Box pv={20} ph={20}>
      <Spin size="l" />
    </Box>
  ) : (
    <Box pb={20} ph={20}>
      <Paragraph type="bold" size="xs" mv={12}>
        {'Other Specials'}
      </Paragraph>
      <FlatList
        data={clientSalesSpecialsList}
        keyExtractor={(item) => `${item?.id}`}
        renderItem={({ item, index }) => {
          let dealPrice = item?.salePrice;
          let actualPrice = item?.actualPrice;
          let difference = Number(actualPrice) - Number(dealPrice);
          let percentOff = (difference / Number(actualPrice)) * 100;
          const isQuickPromotion = item?.isQuickPromotion;
          const isAllService = item?.isAllService;

          return (
            <TouchableOpacity
              onPress={() => Navigator.navigate('SalesSpecialDetails', { id: item.id })}>
              <View style={S.image}>
                <View style={[S.bannerContainer, { backgroundColor: item?.bgColor || COLORS.black80 }]}>
                  <View style={S.upperOfferContainer}>
                    {isQuickPromotion ? (
                      <>
                        <Text style={S.offerHeadingText} >{`${item?.discount} % Off \n`}</Text>
                        <Text style={S.offerSubHeadingText} >{`Get ${item?.discount} % Off on`}</Text>
                      </>
                    ) : (
                      <>
                        <Text style={S.offerHeadingText} >{`${(Math.round(percentOff * 100) / 100).toFixed(0)} % Off \n`}</Text>
                        <Text style={S.offerSubHeadingText} >{`Get ${(Math.round(percentOff * 100) / 100).toFixed(0)} % Off on`}</Text>
                      </>
                    )}
                    <Text style={S.offerSubHeadingText} >{item?.service ? item?.service?.name : 'All Services'}</Text>
                  </View>
                  <View style={S.bannerImageConainer}>
                    <FastImage
                      source={{
                        uri: item.banner?.url ?? defaultImage
                      }}
                      resizeMode='stretch'
                      style={S.bannerImage} />
                  </View>
                </View>
                <View style={S.bottomOfferDetailContainer}>
                  <View style={S.bottomOfferDetailBox}>
                    <Text style={S.saleSpecialText}>{item?.title}</Text>
                    <Text style={S.saleSpecialServiceName}>{`Provider: ${item?.profile?.firstName + ' ' + item?.profile?.lastName}`}</Text>
                  </View>
                </View>
              </View>
              {/* <ImageBackground
                  source={{ uri: item.banner?.url ?? 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg' }}
                  resizeMode='stretch'
                  style={[S.image, S.defaultImage]}>
                  <Paragraph ml={18} size="s">
                    {((!item.banner?.url) && item.salePrice) && `$${item.salePrice} Off on \n`}
                    {((!item.banner?.url) && item.service?.name) && `${item.service.name}`}
                  </Paragraph>
                </ImageBackground> */}
            </TouchableOpacity>
          )
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        ListFooterComponent={() => (
          <ActivityIndicator
            size="large"
            color={(clientSalesSpecialsLoadingMore) ? COLORS.clearBlue : COLORS.transparent}
            style={S.loadMoreLoader}
          />
        )}
        contentContainerStyle={theme.styles.grow}
        style={S.list}
      />
    </Box>
  );
};

export { MoreSpecials };