import { Linking } from 'react-native';
import { ILocation } from 'types/address';
import { isIOS } from 'utils/device';

interface IMapParams extends ILocation {
  place: string;
}

const maps = async ({ lat, lng, place }: IMapParams) => {
  const appleMapsUrl = `maps:0,0?q=${lat},${lng}@${place}`;
  const androidMapsUrl = `geo:0,0?q=${lat},${lng}(${place})`;
  const nativeMapsUrl = isIOS ? appleMapsUrl : androidMapsUrl;
  const googleMapsUrl = `https://www.google.com/maps/place/${place}/@${lat},${lng}z/`;

  const supported = await Linking.canOpenURL(nativeMapsUrl);

  await Linking.openURL(supported ? nativeMapsUrl : googleMapsUrl);
};

const telprompt = (phoneNumber: string) =>
  Linking.openURL(isIOS ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`);

const sms = (phoneNumber: string) => Linking.openURL(`sms:${phoneNumber}`);

const mailto = (email: string) => Linking.openURL(`mailto:${email}`);

const subscriptionSettings = () =>
  Linking.openURL(
    isIOS
      ? 'https://apps.apple.com/account/subscriptions'
      : 'https://play.google.com/store/account/subscriptions?package=com.alphaPro&sku=alpha.standard.android',
  );

export const LinkingHelper = {
  maps,
  telprompt,
  sms,
  mailto,
  subscriptionSettings,
};
