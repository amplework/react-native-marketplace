import { Dimensions, Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
const { width } = Dimensions.get('window');
export const isSmallDevice = width < 375;
