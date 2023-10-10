import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import { styles } from '../style';
import COLORS from 'utils/colors';

type Props = {
  deals: any;
  onPress: () => void;
};

const DealsItem: React.FC<Props> = ({ deals: item, onPress }) => {

  const defaultImage: string = 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg';

  let dealPrice = item?.salePrice;
  let actualPrice = item?.actualPrice;
  let difference = Number(actualPrice) - Number(dealPrice);
  let percentOff = (difference / Number(actualPrice)) * 100;
  const isQuickPromotion = item?.isQuickPromotion;
  const isAllService = item?.isAllService;

  const discountedPrice = isQuickPromotion
    ? item?.service
      ? (item?.service?.price - (item?.service?.price * item?.discount / 100)).toFixed(0)
      : 0
    : item?.salePrice

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <View style={[styles.bannerContainer, { backgroundColor: item?.bgColor || COLORS.black80 }]}>
          <View style={styles.upperOfferContainer}>
            {isQuickPromotion ? (
              <>
                <Text style={styles.offerHeadingText} >{`${item?.discount} % Off \n`}</Text>
                <Text style={styles.offerSubHeadingText} >{`Get ${item?.discount} % Off on`}</Text>
              </>
            ) : (
              <>
                <Text style={styles.offerHeadingText} >{`${(Math.round(percentOff * 100) / 100).toFixed(0)} % Off \n`}</Text>
                <Text style={styles.offerSubHeadingText} >{`Get ${(Math.round(percentOff * 100) / 100).toFixed(0)} % Off on`}</Text>
              </>
            )}
            <Text style={styles.offerSubHeadingText} >{item?.service ? item?.service?.name : 'All Services'}</Text>
          </View>
          <View style={styles.bannerImageConainer}>
            <FastImage
              source={{
                uri: item.banner?.url ?? defaultImage
              }}
              resizeMode='stretch'
              style={styles.bannerImage} />
          </View>
        </View>
        <View style={styles.bottomOfferDetailContainer}>
          <View style={styles.bottomOfferDetailBox}>
            <Text numberOfLines={2} style={styles.saleSpecialText}>{item?.title}</Text>
            <Text style={styles.saleSpecialServiceName}>{item?.service?.name}</Text>
          </View>
          <View style={styles.priceContainer}>
            {discountedPrice ? <Text style={styles.actualPriceText}>{`$${item?.actualPrice || item?.service?.price}`}</Text> : null}
            {discountedPrice ? <Text style={styles.salePriceText}>{`$${discountedPrice}`}</Text> : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export { DealsItem };