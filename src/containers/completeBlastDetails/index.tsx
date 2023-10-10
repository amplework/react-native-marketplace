import I18n, { t, translations } from 'locales';
import { useLayoutEffect, useState, useEffect } from 'react';
import Share from 'react-native-share';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clientConnectSelectors } from 'store/entities/clientConnect';
import SafeContainer from 'shared/container';
import ImagePicker from 'react-native-image-crop-picker';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Paragraph } from 'shared/paragraph';
import { ImageSourcePropType, Text } from 'react-native';
import { styles } from './style';
import FastImage from 'react-native-fast-image';
import {
  createBlast,
  deleteClientChecked,
  openClientModal,
  resetClientBlastList,
  toggleFbShare,
  toggleInstaShare,
  toggleShareOnApp,
  toggleShareWithOthers,
} from 'store/entities/clientConnect/slice';
import { getSubClients, subClientsSelectors } from 'store/entities/subClients';
import { useFormik } from 'formik';
import COLORS from 'utils/colors';
import { TextInput, Alert, View, ScrollView } from 'react-native';
import { Icon } from 'shared/icon';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Button from 'shared/button';
import { Separator } from 'shared/separator';
import { Toggle } from 'shared/toggle';
import ClientBottomSheet from './ClientBottomSheet';
import CheckBox from 'shared/checkbox';
import FONTS from 'utils/fonts';
import { alert } from 'shared/alert';
import { shareToFbPage, shareToInstagram } from 'store/entities/social';
import { SocialIntegrationApi } from 'api/social';
import { ClientBlastRequest } from 'types/clientBlast';
import { Loader } from 'shared/loader';
import { ClientBlastApi } from 'api/clientBlast';
import { toast } from 'shared/toast';

const CompleteBlastDetails: React.FC<any> = ({ navigation, route }) => {
  const messages = route.params?.messages;
  // const id = route.params?.id;
  const isFromSocialMedia = route.params?.isFromSocialMediaPost;
  const selectedClients = useSelector(clientConnectSelectors.clientChecked);
  const blastLoading = useSelector(clientConnectSelectors.blastLoading);
  const subclientsLoading = useSelector(subClientsSelectors.loading);
  const instaShare = useSelector(clientConnectSelectors.instaShare);
  const fbShare = useSelector(clientConnectSelectors.fbShare);
  const shareWithOther = useSelector(clientConnectSelectors.shareWithOther);
  const shareWithClients = useSelector(clientConnectSelectors.shareWithClients);
  const socialLoading = useSelector((state: any) => state.social.loading);
  const provider = useSelector((state: any) => state.provider.provider);
  const defaultImageForSocialMedia = "https://pbs.twimg.com/profile_images/1440110218852065286/MnWcJKB3_400x400.jpg";

  const isLogoAvailable = provider?.providerImage !== null

  const [state, setState] = useState<any>({
    message: messages || '',
    socialList: null,
    // socialData: List,
    useLogo: false,
    bannerImage: null,
    imageUploadLoading: false,
  });

  const modal = useSelector(clientConnectSelectors.isModalOpened);

  const dispatch = useDispatch();

  const { message, socialList, socialData, useLogo, bannerImage } = state;

  const handlePickBanner = () => {
    Alert.alert(
      'Choose method',
      'Please choose a method',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const image = await ImagePicker.openCamera({
              cropping: true,
              width: 400,
              height: 300,
              compressImageQuality: 0.3,
            });
            setState((prev: any) => ({ ...prev, bannerImage: image }))
          },
        },
        {
          text: 'Library',
          onPress: async () => {
            const image = await ImagePicker.openPicker({
              cropping: true,
              width: 400,
              height: 300,
              compressImageQuality: 0.3,
            });
            setState((prev: any) => ({ ...prev, bannerImage: image }))
          },
        },
        {
          text: 'Delete',
          onPress: () => {
            setState((prev: any) => ({ ...prev, bannerImage: null }))

          },
          style: 'destructive',
        },
      ],
      { cancelable: true },
    );
  };

  const openModal = () => {
    dispatch(openClientModal());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () =>
        isFromSocialMedia == true ? (
          <BackButton onPress={handlePressBack} title={I18n.t('Social Media Post Only')} />
        ) : (
          <BackButton onPress={handlePressBack} title={I18n.t('CompleteBlastDetails.title')} />
        ),
    });
  }, [navigation]);

  useEffect(() => {
    if (!isFromSocialMedia) {
      //@ts-ignore
      dispatch(getSubClients({ query: '' }));
    }
  }, []);

  const handlePressBack = () => {
    dispatch(resetClientBlastList());
    navigation.goBack();
  }

  const handleShareToSocialMedia = async (imageUrl: string) => {
    if (fbShare) {
      console.log("fbShare uploading");

      dispatch(shareToFbPage({
        pageId: provider?.fbSocialId,
        pageAccessToken: provider?.fbSocialToken,
        message: message,
        url: imageUrl || defaultImageForSocialMedia,
        // isSocial: isSocialShared,
        // id: id,
      }));
    }

    if (instaShare) {
      console.log("instaShare uploading");
      await SocialIntegrationApi.createInstagramContainer({
        pageId: provider?.instagramBusinessId,
        pageAccessToken: provider?.instagramAccessToken,
        caption: message,
        url: imageUrl || defaultImageForSocialMedia
      }).then((res: any) => {
        if (res?.status == 200) {
          dispatch(shareToInstagram({
            pageId: provider?.instagramBusinessId,
            pageAccessToken: provider?.instagramAccessToken,
            creationId: res?.data?.id,
            // isSocial: isSocialShared,
            // id: id,
          }));
        }
      }).catch((err: any) => {
        console.log("create container err ==== >>> ", err);
      });
    }

    toast.info('Post has been shared successfully');

    dispatch(resetClientBlastList());
    navigation.goBack();
  }

  const startImageLoading = () => setState((prev: any) => ({
    ...prev,
    imageUploadLoading: true
  }));

  const stopImageLoading = () => setState((prev: any) => ({
    ...prev,
    imageUploadLoading: false
  }))

  async function handleUploadImage(image: any) {
    startImageLoading();
    await ClientBlastApi.uploadImage({
      photo: image
    }).then((res: any) => {
      const imageUrl = res?.data?.url;
      stopImageLoading();
      handleShareToSocialMedia(imageUrl);
    }).catch((err: any) => {
      console.log("err file upload === >> ", err);
      stopImageLoading();
      return err;
    })
  }

  async function handleSubmitSocialMedia() {

    const imageTobeShared = bannerImage || defaultImageForSocialMedia;

    if (!fbShare && !instaShare) {
      alert.info('Please select atleast one platform to share the post.');
      return;
    }

    if (typeof imageTobeShared == 'string') {
      handleShareToSocialMedia(bannerImage);
    } else {
      handleUploadImage(bannerImage);
    }
  }

  async function handleSubmit() {
    const clientIds = selectedClients?.map((client: any) => String(client?.id));
    const blastData: ClientBlastRequest = {
      clientSubprofileIds: clientIds,
      shareOneApp: shareWithClients,
      message: message,
      photo: useLogo ? provider?.providerImage : bannerImage?.['path'] ? {
        uri: bannerImage?.['path'],
        name: bannerImage?.['filename'] || 'socialMedia.jpg',
        type: bannerImage?.['mime'] || 'image/jpeg',
      } : defaultImageForSocialMedia
    }

    if (!selectedClients?.length) {
      handleSubmitSocialMedia();
    } else {
      dispatch(createBlast({
        clientBlastPayload: blastData,
        onSuccess: handleShareToSocialMedia
      }));
    }
  }

  function handleShareFacebook(value: boolean) {
    if (!provider?.fbSocialId && value == true) {
      alert.info('To use this feature you need to enable facebook integration from social media setting.');
      return;
    }

    dispatch(toggleFbShare(value));
  }

  function handleShareInstagram(value: boolean) {
    if (!provider?.instagramBusinessId && value == true) {
      alert.info('To use this feature you need to enable instagram integration from social media setting.')
      return;
    }

    dispatch(toggleInstaShare(value))
  }

  function handleShareWithOtherApps(value: boolean) {
    if (value == true) {
      try {
        Share.open({
          message: message + '\n\n' + 'https://6atzr.app.link/e/goalphapro'
        })
          .then(res => {
            dispatch(toggleShareWithOthers(value));
          })
          .catch(err => {
            dispatch(toggleShareWithOthers(false));
          });
      } catch (error: any) {
        alert.info(error.message);
      }
    } else {
      dispatch(toggleShareWithOthers(false));
    }
  }

  function handleShareWithClients(value: boolean) {
    if (value == true && !selectedClients?.length) {
      alert.info('To use this feature please select atleast one connected client.');
      return;
    }

    dispatch(toggleShareOnApp(value));
  }

  const renderToggle = (
    icon: ImageSourcePropType,
    label: string,
    active: boolean,
    seperator: boolean,
    onPress: (checked: boolean) => void,
  ) => {
    return (
      <>
        <Box row jc="space-between" ai="center" mv={5}>
          <Box row ai="center" ml={15}>
            <Icon src={icon} />
            <Paragraph size="s" ml={10}>
              {label}
            </Paragraph>
          </Box>
          <Box mr={15}>
            <Toggle onChange={onPress} checked={active} />
          </Box>
        </Box>
        {seperator && <Separator mv={8} />}
      </>
    );
  };

  const RenderClients = ({ item }: any) => {
    return (
      <View style={styles.nameBox} key={item.id}>
        <Text style={styles.text}>
          {item.firstName} {item.lastName}
        </Text>

        <TouchableOpacity
          onPress={() => dispatch(deleteClientChecked(item.id))}
        >
          <Icon src={require('assets/global/close.png')} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <Loader loading={blastLoading || socialLoading || subclientsLoading || state.imageUploadLoading} />
      <ScrollView>
        {isFromSocialMedia == true ? null : (
          <Box elevation row ai="center" jc="space-between" bc={COLORS.white}>
            <Paragraph mv={15} ml={20} mr={5}>
              {'To:'}
            </Paragraph>

            <FlatList
              data={selectedClients}
              renderItem={RenderClients}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />

            <Box ph={5}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={openModal}>
                <Icon src={require('assets/global/add.png')} size={20} />
              </TouchableOpacity>
            </Box>
          </Box>
        )}

        <Box elevation bc={COLORS.white} pb={5} mt={5}>
          <Paragraph ml={15} mt={10}>
            {'Message:'}
          </Paragraph>
          <TextInput
            style={styles.messageInput}
            placeholderTextColor={'black'}
            onChangeText={(text) => {
              setState((prev: any) => ({ ...prev, message: text }));
            }}
            value={message}
            multiline={true}
            textAlignVertical={'top'}
          />
        </Box>

        <Box elevation jc="space-between" ai="center" bc={COLORS.white} pt={20} ph={15} mt={1}>
          {(useLogo || bannerImage) ? (
            <>
              <View style={styles.bannerImageConainer} >
                <FastImage
                  source={{
                    uri: typeof bannerImage == 'string' ? bannerImage : bannerImage['path']
                  }}
                  resizeMode="contain"
                  style={styles.bannerImage}
                />
              </View>
            </>
          ) : (
            <TouchableOpacity onPress={handlePickBanner} style={styles.filepicker}>
              <Icon
                src={require('assets/global/uploadFile.png')}
                size={20}
                mb={8}
              />
              <Paragraph color={COLORS.clearBlue} size="s" mv={2} ml={10}>
                {'Upload files'}
              </Paragraph>
            </TouchableOpacity>
          )}
          {(!useLogo && bannerImage) && (
            <View style={styles.editIcon}>
              <Icon onPress={handlePickBanner} src={require('assets/global/pencil.png')} size={10} />
            </View>
          )}
          <CheckBox
            styleContainer={styles.checkBox}
            label='Use logo for Banner'
            checked={useLogo}
            disabled={!isLogoAvailable}
            onChange={(value: boolean) => {
              setState((prev: any) => ({
                ...prev,
                useLogo: value,
                bannerImage: value ? provider?.providerImage : null
              }));
            }}
            styleLabel={styles.checkBoxLabel}
          />
        </Box>
        <Box elevation bc={COLORS.white} pt={10} mt={10}>
          {renderToggle(
            require('assets/global/FacebookLogo.png'),
            'Share on Facebook',
            fbShare,
            true,
            (checked: boolean) => handleShareFacebook(checked),
          )}
          {renderToggle(
            require('assets/global/instalogo.png'),
            'Share on Instagram',
            instaShare,
            true,
            (checked: boolean) => handleShareInstagram(checked),
          )}
          {renderToggle(
            require('assets/clientConnect/shareApp.png'),
            'Share with other apps',
            shareWithOther,
            true,
            (checked: boolean) => handleShareWithOtherApps(checked),
          )}
          {!isFromSocialMedia && renderToggle(
            require('assets/global/alpha.png'),
            'Share with clients on app',
            shareWithClients,
            true,
            (checked: boolean) => handleShareWithClients(checked),
          )}
        </Box>
      </ScrollView>

      <Box elevation row bc={COLORS.white} ph={30} pv={15}>
        <Button onPress={isFromSocialMedia ? handleSubmitSocialMedia : handleSubmit} text={I18n.t('sharePost.sharePost')} />
      </Box>

      {modal == true ? <ClientBottomSheet /> : null}
    </SafeContainer>
  );
};

export default CompleteBlastDetails;
