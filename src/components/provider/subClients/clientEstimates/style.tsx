import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.whiteFour,
    paddingTop: 32,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  invoiceContainer: {
    borderRadius: 7,
    marginTop: 24,
    backgroundColor: COLORS.white,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invoiceName: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.medium,
  },
  invoiceTitle: {
    paddingTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.brownishGrey,
    fontFamily: FONTS.book,
  },
  invoiceValue: {
    textAlign: 'right',
    paddingTop: 8,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.medium,
  },
  imageInvoice: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
  },
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  separator: {
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.whiteGray,
  },
});

export default styles;
