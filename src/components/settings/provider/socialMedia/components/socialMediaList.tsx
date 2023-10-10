import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SafeContainer from 'shared/container';
import { styles } from '../style';
import { SocialMediaItem } from './socialMediaItem';
import {
  isFacebookIntegrated,
  isInstagramIntegrated,
  isTwitterIntegrated,
  requestTwitterAuth,
} from 'store/entities/social';
import { SocialAccountList, TwitterModal } from 'shared/socialModal';
import {
  updateProviderFacebookDetails,
  updateProviderInstagramDetails,
  updateProviderTwitterDetails,
} from 'store/actions/provider';
import { t, translations } from 'locales';
import { alert } from 'shared/alert';
import { Loader } from 'shared/loader';
import {
  handleFacebookLogout,
  onFacebookIntegration,
  onInstagramBusinessIntegration,
} from 'utils/socialBlades';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import ScrollContainer from 'shared/scrollContainer';

const SocialMediaList: React.FC<any> = () => {
  const socialLoading = useSelector((state: any) => state.social.loading);
  const provider = useSelector((state: any) => state.provider.provider);
  const isModalVisible = useSelector((state: any) => state.social.isVisible);
  const isFbEnabled = useSelector(
    (state: any) => state.social.isFacebookEnabled,
  );
  const isTwitterEnabled = useSelector(
    (state: any) => state.social.isTwitterEnabled,
  );
  const isInstaEnabled = useSelector(
    (state: any) => state.social.isInstagramEnabled,
  );

  const [socialList, setSocialList] = useState<any>(null);

  const dispatch = useDispatch();

  const onPressItem = () => {
    if (provider?.twiOauthToken) {
      return;
    } else {
      dispatch(requestTwitterAuth());
    }
  };

  // const onPressToggle = () => {
  //   if (isTwitterEnabled) {
  //     dispatch(isTwitterIntegrated(false));
  //     dispatch(updateProviderTwitterDetails({
  //       twiOauthToken: '',
  //       twiOauthTokenSecret: '',
  //       twiUsername: '',
  //       disable: true
  //     }))
  //   } else {
  //     dispatch(requestTwitterAuth());
  //   }
  // };

  const initiateFacebookIntegration = () => {
    onFacebookIntegration()
      .then((result: any) => {
        setSocialList(result);
      })
      .catch((error: any) => {
        console.log('error - ', error);
      });
  };

  const handleFacebookPress = () =>
    alert.confirmation({
      message: t(translations.settings.socialDescription.facebook),
      onConfirm: initiateFacebookIntegration,
    });

  const onFbToggle = () => {
    if (isFbEnabled) {
      handleFacebookLogout();
      dispatch(
        updateProviderFacebookDetails({
          fbSocialToken: '',
          fbSocialId: '',
          disable: true,
        }),
      );
      dispatch(isFacebookIntegrated(false));
    } else {
      handleFacebookPress();
    }
  };

  const initiateInstagramIntegration = () => {
    onInstagramBusinessIntegration()
      .then((result: any) => {
        setSocialList(result);
      })
      .catch((error: any) => {
        console.log('error - ', error);
      });
  };

  const handleInstagramPress = () =>
    alert.confirmation({
      message: t(translations.settings.socialDescription.instagram),
      onConfirm: initiateInstagramIntegration,
    });

  const onInstagramToggle = () => {
    if (isInstaEnabled) {
      handleFacebookLogout();
      dispatch(
        updateProviderInstagramDetails({
          instagramAccessToken: '',
          instagramBusinessId: '',
          disable: true,
        }),
      );
      dispatch(isInstagramIntegrated(false));
    } else {
      handleInstagramPress();
    }
  };

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      {socialLoading ? (
        <Loader loading={socialLoading} />
      ) : (
        <ScrollContainer>
          <View style={styles.list}>
            <Paragraph mb={20} size="m" type="book">
              {
                'Connect Alpha to your social media and post specials / discounts to your pages'
              }
            </Paragraph>
            {/* </Box> */}
            <SocialMediaItem
              iconName={'logo-facebook'}
              onPress={handleFacebookPress}
              onPressToggle={onFbToggle}
              toggleState={isFbEnabled}
              title={t(translations.settings.socialMediaTitle.facebook)}
            />
            {/* <SocialMediaItem
              iconName={'logo-twitter'}
              onPress={onPressItem}
              onPressToggle={onPressToggle}
              toggleState={isTwitterEnabled}
              title={t(translations.settings.socialMediaTitle.twitter)}
            /> */}
            <SocialMediaItem
              iconName={'logo-instagram'}
              onPress={handleInstagramPress}
              toggleState={isInstaEnabled}
              onPressToggle={onInstagramToggle}
              title={t(translations.settings.socialMediaTitle.instagram)}
            />
            <View style={styles.notice}>
              {!isFbEnabled && (
                <Paragraph mb={10} color={COLORS.brownishGrey} size="xs">
                  {t(translations.settings.socialNotice.facebook)}
                </Paragraph>
              )}
              {!isInstaEnabled && (
                <Paragraph color={COLORS.brownishGrey} size="xs">
                  {t(translations.settings.socialNotice.instagram)}
                </Paragraph>
              )}
            </View>
          </View>
        </ScrollContainer>
      )}
      {isModalVisible && <TwitterModal />}
      {socialList?.data?.length > 0 && (
        <SocialAccountList
          setState={setSocialList}
          list={socialList}
          closeModal={() => {
            setSocialList(null);
          }}
        />
      )}
    </SafeContainer>
  );
};

export { SocialMediaList };
