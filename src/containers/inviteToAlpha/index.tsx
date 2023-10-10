import React, { useLayoutEffect, useRef } from 'react';
import ViewShot, { ViewShotProperties } from "react-native-view-shot";
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import Share from 'react-native-share';
import styles from './style';
import { BackButton } from 'shared/backButton';
import { t, translations } from 'locales';
import { Box } from 'shared/box';
import COLORS from 'utils/colors';
import { Image, Linking, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import Button from 'shared/button';
import { SUPPORT_WEBSITE } from 'components/contactUs/helpers/constants';
import { alert } from 'shared/alert';
import { MainPageTemplate } from 'shared/templates';
import ScrollContainer from 'shared/scrollContainer';
import { Separator } from 'shared/separator';
import { isIOS } from 'utils/device';
import RNFetchBlob from 'rn-fetch-blob';

type Props = StackScreenProps<RootStackParamList>;

const InviteToAlpha: React.FC<Props> = ({ route, navigation }: any) => {

  const viewShot: any = useRef<ViewShotProperties>(null);

  const routeName: any = route?.params?.routeName;

  const getTitle = (routeName: string) => {
    switch (routeName) {
      case 'clientInviteProvider':
        return 'Invite Providers';
      case 'clientInviteFriends':
        return 'Invite Friends/Others';
      case 'providerInviteClients':
        return 'Invite Clients'
      case 'providerInviteProvider':
        return 'Recommend Alpha Pro'
    }
  };

  const getInviteText = (routeName: string) => {
    switch (routeName) {
      case 'clientInviteProvider':
        return t(translations.inviteToAlpha.inviteLink);
      case 'clientInviteFriends':
        return t(translations.inviteToAlpha.clientInviteToFriendsLink);
      case 'providerInviteClients':
        return t(translations.inviteToAlpha.providerInviteClientLink);
      case 'providerInviteProvider':
        return t(translations.inviteToAlpha.providerInviteProviderLink);
    }
  };

  const title = getTitle(routeName);
  const inviteText = getInviteText(routeName);

  const appDownloadHeading = isIOS ? 'Link to App store:' : 'Link to Play store:'

  const goBack = () => navigation.goBack();

  const handleOpenWebsite = () => Linking.openURL(`https://${SUPPORT_WEBSITE}`)

  const handleOpenStore = () => {
    if (isIOS) {
      Linking.openURL("https://apps.apple.com/sg/app/Alpha%20Pro%20%E2%80%93%20Booking%20Manager/id1551292500");
    } else {
      Linking.openURL("https://play.google.com/store/apps/details?id=com.alphaPro")
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton
          title={title}
          onPress={goBack}
        />
      ),
    });
  }, [navigation, t, title]);

  function onShare(banner: string) {
    try {
      Share.open({
        message: inviteText
      })
        .then(res => {
          console.log("response === >> ", res);

        })
        .catch(err => {
          console.log("response  err=== >> ", err);
        });
    } catch (error: any) {
      alert.info(error.message);
    }
  }

  const onCapture = () => {
    viewShot.current.capture().then((uri: string) => {
      onShare(uri);
    })
  }

  return (
    <MainPageTemplate bc={COLORS.white} >
      <ScrollContainer styleExtra={styles.container}>
        <View style={styles.mainBox} >
          <ViewShot ref={viewShot} options={{ format: "jpg", quality: 1 }} >
            <Box w={'100%'} row jc='center' ai='center' pt={50} pb={20} r={10} bc={COLORS.whiteGray} >
              <View style={styles.logoContainer} >
                <Image style={styles.logo} source={require('assets/global/alpha.png')} />
              </View>
              <View style={{ marginLeft: 5 }}>
                <Paragraph color={COLORS.black70} type='bold' size='xxl' >{'Alpha'}</Paragraph>
                <Paragraph color={COLORS.warmGrey} type='bold' size='m' >{t(translations.inviteToAlpha.caption)}</Paragraph>
              </View>
            </Box>
          </ViewShot>
          <Separator color={COLORS.white} />
          <Box w={'100%'} mt={10} ph={15} jc='center'>
            {routeName == 'clientInviteProvider' ? (
              <>
                <Paragraph size='l' type='bold' >{t(translations.inviteToAlpha.heading)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={15} >{t(translations.inviteToAlpha.paragraph1)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={20} >{t(translations.inviteToAlpha.paragraph2)}</Paragraph>
                {/* <Paragraph type='book' color={COLORS.black} mt={20} >{t(translations.inviteToAlpha.paragraph3)}</Paragraph> */}
                <Paragraph type='bold' color={COLORS.black} mt={20} >{'Website Link:'}</Paragraph>
                <Pressable onPress={handleOpenWebsite}>
                  <Paragraph color={COLORS.clearBlue}>{'https://goalphapro.com'}</Paragraph>
                </Pressable>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{appDownloadHeading}</Paragraph>
                <Pressable onPress={handleOpenStore}>
                  <Paragraph color={COLORS.clearBlue}>{`https://goalphapro.com/${isIOS ? 'appstore' : 'playstore'}`}</Paragraph>
                </Pressable>
              </>
            ) : null}
            {routeName == 'clientInviteFriends' ? (
              <>
                <Paragraph size='l' type='bold' >{t(translations.inviteToAlpha.inviteToProvidersHeading)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={15} >{t(translations.inviteToAlpha.inviteToProvidersPara1)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={20} >{t(translations.inviteToAlpha.inviteToProvidersPara2)}</Paragraph>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{'Website Link:'}</Paragraph>
                <Pressable onPress={handleOpenWebsite}>
                  <Paragraph color={COLORS.clearBlue}>{'https://goalphapro.com'}</Paragraph>
                </Pressable>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{appDownloadHeading}</Paragraph>
                <Pressable onPress={handleOpenStore}>
                  <Paragraph color={COLORS.clearBlue}>{`https://goalphapro.com/${isIOS ? 'appstore' : 'playstore'}`}</Paragraph>
                </Pressable>
              </>
            ) : null}
            {routeName == 'providerInviteClients' ? (
              <>
                <Paragraph size='l' type='bold' >{t(translations.inviteToAlpha.providerInviteToClientHeading)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={15} >{t(translations.inviteToAlpha.inviteToClientsPara1)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={20} >{t(translations.inviteToAlpha.inviteToClientsPara2)}</Paragraph>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{'Website Link:'}</Paragraph>
                <Pressable onPress={handleOpenWebsite}>
                  <Paragraph color={COLORS.clearBlue}>{'https://goalphapro.com'}</Paragraph>
                </Pressable>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{appDownloadHeading}</Paragraph>
                <Pressable onPress={handleOpenStore}>
                  <Paragraph color={COLORS.clearBlue}>{`https://goalphapro.com/${isIOS ? 'appstore' : 'playstore'}`}</Paragraph>
                </Pressable>
              </>
            ) : null}
            {routeName == 'providerInviteProvider' ? (
              <>
                <Paragraph size='l' type='bold' >{t(translations.inviteToAlpha.providerInviteToProviderHeading)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={15} >{t(translations.inviteToAlpha.providerInvitePara1)}</Paragraph>
                <Paragraph type='book' color={COLORS.black} mt={20} >{t(translations.inviteToAlpha.providerInvitePara2)}</Paragraph>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{'Website Link:'}</Paragraph>
                <Pressable onPress={handleOpenWebsite}>
                  <Paragraph color={COLORS.clearBlue}>{'https://goalphapro.com'}</Paragraph>
                </Pressable>
                <Paragraph type='bold' color={COLORS.black} mt={20} >{appDownloadHeading}</Paragraph>
                <Pressable onPress={handleOpenStore}>
                  <Paragraph color={COLORS.clearBlue}>{`https://goalphapro.com/${isIOS ? 'appstore' : 'playstore'}`}</Paragraph>
                </Pressable>
              </>
            ) : null}
          </Box>
        </View>
      </ScrollContainer>
      <View style={styles.paymentButton}>
        <Button
          text={t(translations.inviteToAlpha.title)}
          onPress={onCapture}
        />
      </View>
    </MainPageTemplate>
  );
}

export default InviteToAlpha;