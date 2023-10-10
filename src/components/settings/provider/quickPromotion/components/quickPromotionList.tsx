import I18n from 'locales';
import React, { useEffect, useState } from 'react';
import { FlatList, Modal, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';

import { EmptyState } from 'shared/emptyState';
import { Loader } from 'shared/loader';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../style';
import Button from 'shared/button';
import { Field } from 'shared/field';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { shareToAllPlatforms, shareToFbPage, shareToInstagram, shareToTwitter } from 'store/entities/social';
import FONTS from 'utils/fonts';
import { SocialIntegrationApi } from 'api/social';
import { alert } from 'shared/alert';
import { toast } from 'shared/toast';
import { QuickPromotionItem } from './quickPromotionItem';
import { getQuickPromotions, openQuickPromoModal, quickPromotionSelectors } from 'store/entities/quickPromotion';

const QuickPromotionList: React.FC = () => {
  const dispatch = useDispatch();

  const quickPromotions = useSelector(quickPromotionSelectors.quickPromotions);
  const provider = useSelector((state: any) => state.provider.provider);
  const socialLoading = useSelector((state: any) => state.social.loading);
  const loading = useSelector(quickPromotionSelectors.loading);
  const defaultImageForSocialMedia = "https://pbs.twimg.com/profile_images/1440110218852065286/MnWcJKB3_400x400.jpg"

  const [state, setState] = useState<any>({
    imgUrl: '',
    showModal: false,
    offerText: '',
  });

  const { imgUrl, showModal, offerText } = state;

  useEffect(() => {
    dispatch(getQuickPromotions());
  }, [dispatch]);

  function onChangeText(text: string) {
    setState((prev: any) => ({ ...prev, offerText: text }));
  }

  function hideModal() {
    setState((prev: any) => ({ ...prev, showModal: false }));
  }

  function handlePress(salesSpecial: any) {
    dispatch(openQuickPromoModal(salesSpecial));
  }

  function handleShareToFb() {
    dispatch(shareToFbPage({
      pageId: provider?.fbSocialId,
      pageAccessToken: provider?.fbSocialToken,
      message: offerText,
      url: imgUrl || defaultImageForSocialMedia
    }));
  }

  function handlePressShare(salesSpecial: any) {
    let dealPrice = salesSpecial?.salePrice;
    let actualPrice = salesSpecial?.service?.price;
    let difference = Number(actualPrice) - Number(dealPrice);
    let percentOff = (difference / Number(actualPrice)) * 100;
    const offerValue: string = `Sale Special Offer: ${salesSpecial?.isQuickPromotion ? salesSpecial?.discount : (Math.round(percentOff * 100) / 100).toFixed(0)}% off on ${salesSpecial?.isAllService ? 'All services' : salesSpecial?.service?.name}.\nTo access this offer book your appointments with\nus on the Alpha Pro app.\n\nApp Download Link:\nhttps://play.google.com/store/apps/details?id=com.alphaPro`
    if (salesSpecial?.isSocial) {
      alert.confirmation({
        message: 'Are you sure you want to repost this sale special ?',
        onConfirm: () => {
          setState((prev: any) => ({
            ...prev,
            showModal: true,
            offerText: offerValue,
            imgUrl: salesSpecial?.presetBanner?.url
          }));
        }
      })
    } else {
      setState((prev: any) => ({
        ...prev,
        showModal: true,
        offerText: offerValue,
        imgUrl: salesSpecial?.presetBanner?.url
      }));
    }
  }

  function handleShareToAllPlatforms() {
    dispatch(shareToAllPlatforms({
      fbDetails: {
        pageId: provider?.fbSocialId,
        pageAccessToken: provider?.fbSocialToken,
        message: offerText,
        url: imgUrl || defaultImageForSocialMedia
      },
      instaDetails: {
        pageId: provider?.instagramBusinessId,
        pageAccessToken: provider?.instagramAccessToken,
        caption: offerText,
        url: imgUrl || defaultImageForSocialMedia
      }
    }));
  }

  async function handleShareToInstagram() {
    try {
      await SocialIntegrationApi.createInstagramContainer({
        pageId: provider?.instagramBusinessId,
        pageAccessToken: provider?.instagramAccessToken,
        caption: offerText,
        url: imgUrl || defaultImageForSocialMedia
      }).then((res: any) => {
        if (res?.status == 200) {
          dispatch(shareToInstagram({
            pageId: provider?.instagramBusinessId,
            pageAccessToken: provider?.instagramAccessToken,
            creationId: res?.data?.id
          }));
        }
      }).catch((err: any) => {
        console.log("create container err ==== >>> ", err);
      });
    } catch (error: any) {
      console.log("error==>> ", error);
    }
  }

  function renderModal(show: boolean, content: any) {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => { }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardStyle}
        >
          <View style={styles.chooseModalView}>
            <View style={[styles.chooseView, styles.shadow]}>{content}</View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  return (
    <>
      <Loader loading={loading} />
      <FlatList
        data={quickPromotions}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <QuickPromotionItem
            onPress={() => handlePress(item)}
            onPressShare={() => handlePressShare(item)}
            salesSpecial={item}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.content}
        ListEmptyComponent={() =>
          loading ? null : (
            <EmptyState entities={I18n.t('common.entities.quickPromotion')} />
          )
        }
      />
      {renderModal(
        showModal,
        <>
          <View style={styles.upperContainer}>
            <Paragraph type='bold' size='l' >{'Create Post'}</Paragraph>
            <TouchableOpacity onPress={hideModal}>
              <Image
                source={require('assets/global/close.png')}
                style={styles.closeImage}
              />
            </TouchableOpacity>
          </View>
          <Separator />
          <View style={{ width: '100%', paddingHorizontal: 20 }}>
            <Field
              value={offerText}
              label={'Feed'}
              onChange={onChangeText}
              // maxLength={255}
              size='xl'
              multiline
              mv={20}
            />
            {socialLoading ? (
              <Loader loading={socialLoading} />
            ) : (
              <View style={styles.socialView}>
                <Button
                  image={require('assets/global/fblogo.jpg')}
                  imageStyle={{ mr: 0 }}
                  size={80}
                  onPress={handleShareToFb}
                  buttonStyle={styles.fbButton}
                />
                <Button
                  image={require('assets/global/instalogo.png')}
                  onPress={handleShareToInstagram}
                  imageStyle={{ mr: 0 }}
                  size={55}
                  buttonStyle={styles.instaButton}
                />
                <Button
                  onPress={handleShareToAllPlatforms}
                  text={'All'}
                  textStyle={{ color: 'white', textAlign: 'center', fontSize: 11, fontFamily: FONTS.bold }}
                  buttonStyle={styles.allButton}
                />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
};

export { QuickPromotionList };