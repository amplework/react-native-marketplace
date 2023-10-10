import I18n from 'locales';
import React, { useEffect } from 'react';
import { Alert, Animated, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { Navigator } from 'service/navigator';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Alpha, Icon } from 'shared/icon';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { chatsSelectors, createChat } from 'store/entities/chats';
import {
  getProviderPlanId,
  providersSelectors,
} from 'store/entities/providers';
import { Chat } from 'types/chats';
import COLORS from 'utils/colors';
import {
  IconComponent,
  ClientRewardIcon,
  ArrowRight,
} from 'shared/icon/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from '../style';
import { toast } from 'shared/toast';
import moment from 'moment';

interface Props {
  compact?: boolean;
  openRewardModal?: () => void;
  scrollYRef?: any;
}

const DEFAULT_HEADER_MAX_HEIGHT = 323;
const DEFAULT_HEADER_MIN_HEIGHT = 120;

const ProviderDetailsHeader: React.FC<Props> = ({ compact, openRewardModal, scrollYRef }) => {
  const provider: any = useSelector(providersSelectors.provider);
  const providerPlanId = useSelector(providersSelectors.providerPlanId);
  const isPremiumProvider = providerPlanId?.subscriptionPlanId?.includes('premium');
  const createChatLoading = useSelector(chatsSelectors.createLoading);
  const blockedProviders = useSelector(providersSelectors.blockedProviders);
  const isBlocked = blockedProviders?.some((e: any) => {
    if (e?.providerId == provider?.id) {
      return true;
    }
    return false;
  });  

  const dispatch = useDispatch();

  function getHeaderScrollDistance() {
    return DEFAULT_HEADER_MAX_HEIGHT - DEFAULT_HEADER_MIN_HEIGHT
  }

  function getInputRange() {
    return [-(20), 0, getHeaderScrollDistance()];
  }

  function getNavContentPadding() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 7, 14, 20, 24],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedFontSize() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 4, 8, 13, 18],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedLineHeight() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 6, 12, 19, 26],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedPhoneFontSize() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 4, 8, 12, 16],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedCallContainer() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 3, 6, 9, 12],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedImageContainer() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 5, 10, 15, 20],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedPhoneLineHeight() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 5, 10, 15, 20],
      // extrapolateLeft: 'identity',s
      extrapolate: 'clamp',
    });
  }

  function getNavBarForegroundOpacity() {
    return scrollYRef.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [0, 0, 1],
      extrapolate: 'clamp',
    });
  }

  useEffect(() => {
    if (provider?.id) {
      dispatch(getProviderPlanId({ id: provider?.id }))
    }
  }, [dispatch, provider?.id]);

  const isRewardApplicable = (e: any) => {
    if (e?.type == "birthday") {
      return true
    } else if (e?.type == "loyalty") {
      if (e?.isDayRestrication && e?.restricationDay?.length > 0) {
        return e?.restricationDay?.includes(moment.tz(provider?.address?.utctimezone).format('dddd')?.toLowerCase())
      } else {
        return true
      }
    }
    return false
  }

  const isAnyActiveReward = provider?.rewards?.some((e: any) => { return isRewardApplicable(e) });

  const handleOpenMaps = () => {
    if (provider?.address) {
      const location = provider?.address?.location;
      const formattedAddress = provider?.address?.formattedAddress

      return LinkingHelper.maps({ ...location, place: formattedAddress });
    }

    Alert.alert(I18n.t('providers.addressNotProvided'));
  };

  const handleCall = () => LinkingHelper.telprompt(provider?.phoneNumber);

  const navigateToChat = (chat: Chat) =>
    Navigator.navigate('Chat', { id: chat.id });

  const handleCreateChat = () => {
    if (isBlocked) {
      toast.info('You blocked this provider previously, In order to message this provider you need to unblock the provider from blacklist.');
      return;
    } else {
      dispatch(createChat({ participantId: provider?.id, onSuccess: navigateToChat }));
    }
  }

  if (compact) {
    const navContentAnimatePadding = getNavContentPadding();
    const navNameTextLineHeight = getAnimatedLineHeight();
    const navNameTextFontSize = getAnimatedFontSize();
    const navPhoneTextLineHeight = getAnimatedPhoneLineHeight();
    const navPhoneTextFontSize = getAnimatedPhoneFontSize();
    const animatedCallContainer = getAnimatedCallContainer();
    const animatedImageContainer = getAnimatedImageContainer();
    const contentOpacity = getNavBarForegroundOpacity();
    return (
      <Animated.View style={[styles.navContent, {
        padding: navContentAnimatePadding,
        opacity: contentOpacity
      }]}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Animated.Text style={[styles.userName, {
              lineHeight: navNameTextLineHeight,
              fontSize: navNameTextFontSize
            }]}>
              {provider?.firstName || ''} {provider?.lastName || ''}
            </Animated.Text>
            {provider?.isConnected ? (
              <Animated.Image
                source={require('assets/onBoarding/alpha.png')}
                style={[styles.imageConnected, {
                  height: navPhoneTextFontSize,
                  width: navPhoneTextFontSize
                }]}
              />
            ) : null}
          </View>
          <Animated.Text style={[styles.phone, {
            lineHeight: navPhoneTextLineHeight,
            fontSize: navPhoneTextFontSize
          }]}>{provider?.phoneNumber || ''}</Animated.Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleOpenMaps}
          >
            <Animated.View style={[styles.callContainer, {
              padding: animatedCallContainer
            }]}>
              <Animated.Image source={require('assets/global/direction.png')} style={[styles.imageIconContainer, {
                height: animatedImageContainer,
                width: animatedImageContainer
              }]} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCall}
          >
            <Animated.View style={[styles.chatContainer, {
              padding: animatedCallContainer
            }]}>
              <Animated.Image source={require('assets/global/callGrey.png')} style={[styles.imageIconContainer, {
                height: animatedImageContainer,
                width: animatedImageContainer
              }]} />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateChat}
          >
            <Animated.View style={[styles.chatContainer, {
              padding: animatedCallContainer
            }]}>
              {createChatLoading ? (
                <Spin />
              ) : (
                <Animated.Image source={require('assets/global/chat.png')} style={[styles.imageIconContainer, {
                  height: animatedImageContainer,
                  width: animatedImageContainer
                }]} />
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }  

  return (
    <Box flex jc="center" ai="center" w="100%" pb={20}>
      <View style={styles.headerContainer}>
        <Avatar src={provider?.photo || ''} size={70} mb={13} />
        <View style={styles.rewardBadgeContainer}>
          {((isPremiumProvider) && (provider?.address?.utctimezone) && (provider?.rewards?.some((e: any) => { return isRewardApplicable(e) }))) && (
            <TouchableOpacity style={styles.rewardBadge} onPress={openRewardModal}>
              <IconComponent
                Component={ClientRewardIcon}
                size={20}
                color={COLORS.black70}
              />
              <Text style={styles.listItemText}>
                {'Loyalty'}
              </Text>
              <IconComponent
                Component={ArrowRight}
                size={12}
                color={COLORS.brownishGrey}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Box row ai="center" mb={6}>
        <Paragraph size="l">
          {provider?.firstName || ''} {provider?.lastName || ''}
        </Paragraph>
        {provider?.isConnected && <Alpha />}
      </Box>
      <Paragraph type="book" mb={20}>
        {provider?.phoneNumber || ''}
      </Paragraph>
      <Box row ph={24}>
        <Button
          text={I18n.t('providers.getDirection')}
          image={require('assets/global/direction.png')}
          onPress={handleOpenMaps}
          buttonStyle={[styles.secondaryButton, styles.mr16]}
          textStyle={styles.defaultText}
        />
        <TouchableOpacity
          onPress={handleCall}
          style={[styles.defaultButton, styles.mr16]}
        >
          <Icon src={require('assets/global/callGrey.png')} size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateChat}
          disabled={createChatLoading}
          style={styles.defaultButton}
        >
          {createChatLoading ? (
            <Spin />
          ) : (
            <Icon src={require('assets/global/chat.png')} size={20} />
          )}
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export { ProviderDetailsHeader };
