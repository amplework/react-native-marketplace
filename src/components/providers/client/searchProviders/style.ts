import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

export const styles = StyleSheet.create({
  safe: {
    backgroundColor: COLORS.whiteFour,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteFour,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    backgroundColor: COLORS.white,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.white,
  },
  activeTab: {
    borderBottomColor: COLORS.orange,
  },
  searchResultsContainer: {
    flex: 1,
  },
  searchResultsList: {
    paddingHorizontal: 24,
  },
  loader: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  filtersScrollView: {
    flex: 1,
    marginBottom: 90,
  },
  filtersContent: {
    padding: 32,
  },
  serviceButton: {
    marginRight: 12,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 20,
  },
  serviceButtonActive: {
    borderColor: COLORS.clearBlue,
  },
  submitButton: {
    position: 'absolute',
    right: 32,
    bottom: 40,
    width: 130,
  },
  imageContainer: {
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 12,
  },
  bannerImage: {
    width: "100%",
    height: "auto",
    aspectRatio: 4 / 3,
    borderRadius: 7,
  },
  infoContainer: {
    position: 'absolute',
  },
});
