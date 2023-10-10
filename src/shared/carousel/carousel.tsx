import React, { useState, useRef } from 'react';
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import COLORS from 'utils/colors';
import { carouselSliderStyles as S } from './style';
import { Navigator } from 'service/navigator';
import FastImage from 'react-native-fast-image';

type Props = {
  data: any;
  styleContainer?: any,
  styleImage?: any,
};

const CarouselSlider: React.FC<Props> = ({
  data = [],
  styleContainer,
  styleImage,
}) => {
  const width = useWindowDimensions().width;
  const [index, setIndex] = useState(0)

  const carouselRef: any = useRef(null)

  const defaultImage: string = 'https://alpha-pro-storage.s3.amazonaws.com/public/client-subprofile-photos/143/olp.jpg';

  return (
    <View style={[S.container, styleContainer]}>
      <Carousel
        layout={"default"}
        ref={carouselRef}
        layoutCardOffset={0}
        data={data}
        renderItem={({ item, index }: any) => {
          let dealPrice = item?.salePrice;
          let actualPrice = item?.actualPrice;
          let difference = Number(actualPrice) - Number(dealPrice);
          let percentOff = (difference / Number(actualPrice)) * 100;
          const isQuickPromotion = item?.isQuickPromotion;
          const isAllService = item?.isAllService;

          return (
            <TouchableOpacity onPress={() => Navigator.navigate('SalesSpecialDetails', { id: item.id })}>
              <View style={S.itemContainer}>
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
            </TouchableOpacity>
          )
        }}
        onSnapToItem={(index) => setIndex(index)}
        sliderWidth={400}
        itemWidth={320}
        autoplay={true}
        loop={true}
        autoplayInterval={4000}
        lockScrollWhileSnapping={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        enableMomentum={false}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        carouselRef={carouselRef}
        dotStyle={{
          width: 8,
          height: 8,
          marginHorizontal: 10,
          borderRadius: 8,
          backgroundColor: COLORS.warmGrey,
        }}
        inactiveDotStyle={{
          width: 8,
          marginHorizontal: 10,
          height: 8,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: COLORS.warmGrey,
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        dotColor={COLORS.warmGrey}
        inactiveDotColor={COLORS.white}
        containerStyle={S.paginationContainer}
      />
    </View>
  );
}

export { CarouselSlider };