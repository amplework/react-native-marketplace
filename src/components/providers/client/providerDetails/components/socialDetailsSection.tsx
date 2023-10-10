import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { t, translations } from 'locales';
import { Linking, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';

import { styles } from '../style';
import { Pressable } from 'shared/pressable';
import { useSelector } from 'react-redux';
import { providersSelectors } from 'store/entities/providers';
import { toast } from 'shared/toast';
import COLORS from 'utils/colors';

const SocialDetailsSection: React.FC<any> = () => {
  const provider: any = useSelector(providersSelectors.provider);

  const onPressFb = () => {
    if (provider?.fbLink) {
      Linking.openURL(provider?.fbLink);
    } else {
      toast.info('This Provider have not setup his facebook account with Alpha Pro.')
    }
  }

  const onPressTwitter = () => {
    if (provider?.twitterLink) {
      Linking.openURL(provider?.twitterLink);
    } else {
      toast.info('This Provider have not setup his twitter account with Alpha Pro.')
    }
  }

  const onPressInsta = () => {
    if (provider?.instaLink) {
      Linking.openURL(provider?.instaLink);
    } else {
      toast.info('This Provider have not setup his instagram account with Alpha Pro.')
    }
  }

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {t(translations.providers.followUs)}
      </Paragraph>
      <View style={styles.card}>
        <Pressable onPress={onPressFb} row jc="space-between" ai="center" pr={24} mb={16}>
          <Paragraph color={provider?.fbLink ? COLORS.clearBlue : COLORS.black} mb={4}>{'Facebook'}</Paragraph>
          <Ionicons
            size={22}
            name={'logo-facebook'}
            color={provider?.fbLink ? COLORS.clearBlue : COLORS.black}
          />
        </Pressable>
        <Separator mb={16} />
        {/* <Pressable onPress={onPressTwitter} row jc="space-between" ai="center" pr={24} mb={16}>
          <Paragraph color={provider?.twitterLink ? COLORS.clearBlue : COLORS.black} mb={4}>{'Twitter'}</Paragraph>
          <Ionicons
            size={22}
            name={'logo-twitter'}
            color={provider?.twitterLink ? COLORS.twitterBlue : COLORS.black}
          />
        </Pressable>
        <Separator mb={16} /> */}
        <Pressable onPress={onPressInsta} row jc="space-between" ai="center" pr={24}>
          <Paragraph color={provider?.instaLink ? COLORS.clearBlue : COLORS.black} mb={4}>{'Instagram'}</Paragraph>
          <Ionicons
            size={22}
            name={'logo-instagram'}
            color={provider?.instaLink ? COLORS.red : COLORS.black}
          />
        </Pressable>
      </View>
    </>
  )
};

export { SocialDetailsSection };