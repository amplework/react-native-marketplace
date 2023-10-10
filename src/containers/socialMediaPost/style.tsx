import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  messageInput: {
    height: 100,
    fontWeight: '600',
    backgroundColor: COLORS.white,
    paddingHorizontal: '5%',
    paddingVertical: '10%',
  },
  filepicker: {
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.clearBlue50,
    borderStyle: 'dashed',
    paddingHorizontal: '32%',
    paddingVertical: '8%',
    flexDirection: 'row',
    marginBottom: '10%',
  },
  logoBanner: {
    position: 'absolute',
    bottom: 20,
    left: 28,
  },
  checkboxs: {
    width: 16,
    height: 16,
  },
  bannerContainer: {
    overflow: 'hidden',
    aspectRatio: 4 / 1.8,
    borderRadius: 7,
  },

  bannerImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 4 / 3,
    borderRadius: 7,
    marginHorizontal: '20%',
  },
  containerEdit: {
    position: 'absolute',
    right: 0,
    top: 1,
    width: 22,
    height: 22,
  },

  editIcon: {
    position: 'absolute',
    right: '18%',
    bottom: -5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: COLORS.clearBlue,
    borderRadius: 10,
  },
});
