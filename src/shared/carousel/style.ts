import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const carouselSliderStyles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  imageContainer: {
    paddingHorizontal: 32,
  },
  cardImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 4 / 3,
    borderRadius: 7,
    // resizeMode: 'contain',
    // height: 130,
    // borderRadius: 7,
    overflow: 'hidden',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 10,
  },
  paginationContainer: {
    width: 32,
    alignSelf: 'center',
    paddingBottom: 0,
    paddingTop: 0,
  },
  itemContainer: {
    height: 250,
    width: '100%', 
    marginVertical: 20, 
    backgroundColor: COLORS.white, 
    shadowColor: COLORS.warmGrey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 10
  },
  bannerContainer: {
    // borderRadius: 15, 
    overflow: 'hidden',
    alignItems: 'center', 
    flexDirection: 'row', 
    height: "65%", width: "100%", 
    backgroundColor: COLORS.black80, 
  },
  upperOfferContainer: {
    width: "50%", 
    height: '100%', 
    paddingLeft: 20,
    justifyContent: 'center', 
  },
  offerHeadingText: { 
    color: COLORS.white, 
    fontFamily: FONTS.book, 
    fontSize: 20 
  },
  offerSubHeadingText: { 
    color: COLORS.white, 
    fontFamily: FONTS.book, 
    fontSize: 14
  },
  bannerImageConainer: { 
    width: "50%", 
    height: '80%', 
    overflow: 'hidden',  
    justifyContent: 'center', 
    borderTopLeftRadius: 100, 
    borderBottomLeftRadius: 100, 
    backgroundColor: COLORS.orange, 
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    // aspectRatio: 4 / 3,
    // borderRadius: 7,
  },
  bottomOfferDetailContainer: { 
    height: "35%", 
    width: "100%", 
    alignItems: 'center', 
    flexDirection: 'row',
    paddingHorizontal: 10 
  },
  bottomOfferDetailBox: { 
    height: '100%', width: "100%", 
    justifyContent: 'space-between', 
    paddingVertical: 15 
  },
  saleSpecialText: { 
    fontSize: 20, 
    color: COLORS.black, 
    fontFamily: FONTS.bold, 
  },
  saleSpecialServiceName: { 
    fontSize: 16, 
    fontFamily: FONTS.medium, 
    color: COLORS.brownishGrey, 
  },
  priceContainer: { 
    width: "45%", 
    height: '100%', 
    paddingLeft: 15, 
    alignItems: 'center', 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
  },
  actualPriceText: {
    fontSize: 15, 
    fontFamily: FONTS.bold, 
    color: COLORS.brownishGrey, 
    textDecorationLine: 'line-through',
  },
  salePriceText: { 
    fontSize: 20, 
    marginLeft: 5, 
    color: COLORS.orange, 
    fontFamily: FONTS.bold, 
  },
});