import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const homeStyles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  upcomingAppointmentsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: COLORS.orange10,
  },
  arrowForward: {
    padding: 5,
    borderWidth: 1,
    borderColor: COLORS.black10,
    borderRadius: 20,
  },
  industryItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 130,
    margin: '1.6%',
    borderColor: COLORS.pinkishGrey,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  imageContainer: {},
  image: {
    width: "100%",
    // height: 300,
    aspectRatio: 4 / 3,
    borderRadius: 7,
    // backgroundColor: COLORS.whiteFour,
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
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 12,
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
    paddingHorizontal: 10,
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
    borderColor: COLORS.battleshipGrey32,
    borderWidth: 1, 
    borderTopWidth: 0
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
  defaultImage: {},
  list: {
    marginBottom: 10,
  },
  loadMoreLoader: {
    marginTop: 4,
    marginBottom: 40,
  },
});