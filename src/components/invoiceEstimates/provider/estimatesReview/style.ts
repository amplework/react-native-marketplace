import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { padding } from 'utils/styles';

export const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: COLORS.twilightBlueTwo,
    shadowOpacity: 0,
  },
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
  },
  header: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  counterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -32,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  sign: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  section: {
    ...padding(4, 0, 4, 16),
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.whiteGray,
    borderRadius: 7,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
