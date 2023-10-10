import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SubClientsProviderApi } from 'api/subClients';
import ClientAppointment from 'components/provider/subClients/clientAppointment';
import ClientDetail from 'components/provider/subClients/clientDetail';
import ClientInvoices from 'components/provider/subClients/clientInvoices';
import { ClientSales } from 'components/provider/subClients/clientSales';
import { translations } from 'locales';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Alert,
  FlatList,
  Image,
  Text,
  View,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { Navigator } from 'service/navigator';
import { alert } from 'shared/alert';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Icon } from 'shared/icon';
import { MainPageTemplate } from 'shared/templates';
import { toast } from 'shared/toast';
import { createChat } from 'store/entities/chats';
import {
  blockUser,
  getSubClient,
  getSubClientAppointments,
  subClientsSelectors,
  getSyncClient
} from 'store/entities/subClients';
import {
  deleteSubClient,
  disconnectSubClient,
  editSubClient,
  getBlockedSubClients,
  inviteClient
} from 'store/entities/subClients/slice';
import { theme } from 'theme';
import COLORS from 'utils/colors';
import { getFullName } from 'utils/strings';
import { subscriptionSelectors } from 'store/entities/subscription';
import styles from './style';
import { isProvider } from 'types/users';
import { userSelectors } from 'store/entities/user';
import moment from 'moment';
import {
  IconComponent,
  ClientRewardIcon,
  ArrowRight,
} from 'shared/icon/icons';
import RNParallaxHeader from 'shared/parallexHeader';
import ClientEstimates from 'components/provider/subClients/clientEstimates';

export interface Props {
  navigation: StackNavigationProp<any, any>;
  route: any;
}

const DEFAULT_HEADER_MAX_HEIGHT = 250;
const DEFAULT_HEADER_MIN_HEIGHT = 150;

const SubClientDetails: React.FC<Props> = ({ navigation, route }) => {
  const scrollRef = useRef<FlatList<any>>();
  const scrollYRef = useRef(new Animated.Value(0));
  const [tab, setTab] = useState(0);
  const [onEnd, setOnEnd] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [availableLoyaltyRewards, setAvailableLoyaltyRewards] = useState(false);

  const user = useSelector(userSelectors.user);
  const blockedClients = useSelector(subClientsSelectors.blockedSubClients);
  const unblockLoading = useSelector(subClientsSelectors.blockLoading);
  const subClient: any = useSelector(subClientsSelectors.subClient);
  const appointments = useSelector(subClientsSelectors.appointments);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const isPremiumProvider = subscription?.subscriptionPlan?.includes('premium');

  const findBlockedClient = blockedClients?.filter((client: any) => client?.clientId == subClient?.clientId);

  const isClientBlocked = findBlockedClient?.length ? true : false;

  const providerDetails = useSelector((state: any) => state.provider.provider);
  const providerTimezone = providerDetails?.address?.utctimezone;

  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');
  const loading = useSelector(subClientsSelectors.appointmentsLoading);
  const subClientsLoading = useSelector(subClientsSelectors.subClientLoading);

  const isClientConnected = subClient?.isConnected && !subClient?.isDisconnect;

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isFocused = useIsFocused();

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

  function getAnimatedTabHeight() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 13, 26, 39, 55],
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

  function getAnimatedBorderTopWidth() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 0, 0, 0, 1],
      extrapolate: 'clamp',
    });
  }

  function getAnimatedBorderBottomWidth() {
    return scrollYRef.current.interpolate({
      inputRange: [0, 10, 20, 30, 50],
      outputRange: [0, 0, 0, 0, 3],
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

  const formData = new FormData();
  let clientInfo: any = {
    firstName: subClient?.firstName,
    lastName: subClient?.lastName,
    isActive: subClient?.isActive,
    countryCode: subClient?.countryCode,
    phoneNumber: subClient?.phoneNumber,
    email: subClient?.email ? subClient?.email : '',
    gender: subClient?.gender ? subClient?.gender : '',
    notes: subClient?.notes ? subClient?.notes : '',
    alternatePhoneNumber: subClient?.alternatePhoneNumber ? subClient?.alternatePhoneNumber : '',
    isConnected: subClient?.isConnected,
    isDisconnect: subClient?.isDisconnect ? false : true,
    notificationChannel: subClient?.notificationChannel ? subClient?.notificationChannel : '',
    birthday: subClient?.birthday ? subClient?.birthday : '',
    photo: subClient?.photo ? subClient?.photo : '',
  };
  if (subClient?.address) {
    clientInfo = {
      ...clientInfo,
      address: JSON.stringify({
        ...subClient?.address,
        addressLine2: subClient?.address?.addressLine2,
      }),
    };
  }
  for (const name in clientInfo) {
    // @ts-ignore
    formData.append(name, clientInfo[name]);
  }

  const handleBlockUser = useCallback(() => {
    const handler = () => {
      dispatch(blockUser({
        providerId: user?.id,
        clientId: subClient?.clientId,
        isProvider: isProvider(user),
        isFromClientProfile: true,
        clientProfileId: subClient?.id,
        isFromProviderProfile: false,
      }));
    };
    alert.blockClient({
      entity: subClient?.firstName,
      onBlock: handler
    });
  }, [subClient]);

  const handleDisconnectUser = useCallback(() => {
    const handler = () => {
      dispatch(disconnectSubClient(formData))
    };
    alert.editing({
      entity: undefined,
      message: t(translations.common.alerts.disconnectClient, {
        clientName: subClient?.firstName,
      }),
      onEdit: handler,
    })
  }, [subClient]);

  useFocusEffect(
    useCallback(() => {
      if (isFocused) {
        dispatch(getSubClient(route?.params?.clientId));
        dispatch(getBlockedSubClients({ query: '' }))
        dispatch(
          getSubClientAppointments({
            id: route?.params?.clientId,
            limit: 100,
            offset: 0,
          }),
        );
      }
    }, [isFocused, dispatch])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerRight: () => (
        <Box row ai="center">
          {route?.params?.isClientConnected == true && subClient?.isDisconnect == false ?
            <Icon
              src={require('assets/global/sync.png')}
              size={20}
              mr={20}
              color={COLORS.black80}
              onPress={() => {
                Alert.alert(
                  "Sync",
                  "Do you want to sync client basic info?",
                  [
                    {
                      text: "Confirm",
                      onPress: () => {
                        dispatch(getSyncClient(route?.params?.clientId))
                      },
                    },
                    {
                      text: "Cancel"
                    }
                  ],
                  { cancelable: true }
                )
              }}
            /> : <View />}
          <Icon
            onPress={() =>
              navigation.push('AddClient', {
                clientId: route?.params?.clientId,
              })
            }
            src={require('assets/global/pencilGrey.png')}
            size={20}
            mr={20}
          />
          <Icon
            src={require('assets/global/deleteGray.png')}
            size={20}
            mr={20}
            onPress={() =>
              alert.deletion({
                entity: t(translations.common.entities.client),
                onDelete: () =>
                  dispatch(deleteSubClient({ id: route?.params?.clientId })),
              })
            }
          />
        </Box>
      ),
      headerLeft: () => <BackButton />,
    });
  }, [subClient]);

  useEffect(() => {
    if (subClient && providerTimezone) {
      setAvailableLoyaltyRewards(
        subClient?.rewards?.some((e: any) => { return isRewardApplicable(e) })
      )
    }
  }, [subClient])

  const isRewardApplicable = (e: any) => {
    if (e?.type == "birthday") {
      return true
    } else if (e?.type == "loyalty") {
      if (e?.isDayRestrication && e?.restricationDay?.length > 0) {
        return e?.restricationDay?.includes(moment.tz(providerTimezone).format('dddd')?.toLowerCase())
      } else {
        return true
      }
    }
    return false
  }

  const fetchMoreAppointments = () => {
    dispatch(
      getSubClientAppointments({
        id: route?.params?.clientId,
        limit: 100,
        offset: appointments?.meta?.offset || 0 + 100,
      }),
    );
  };

  const onCall = (phone?: string | null) => {
    if (phone) {
      return LinkingHelper.telprompt(phone);
    }

    Alert.alert('Add mobile number and try again');
  };

  const onMessages = (phone?: string | null) => {

    if (isClientBlocked) {
      toast.info('You cannot message a blocked client');
      return;
    }

    if (subClient?.isConnected) {
      return dispatch(
        createChat({
          participantId: subClient.clientId!,
          onSuccess: (chat) => Navigator.navigate('Chat', { id: chat.id }),
        }),
      );
    }

    if (phone) {
      return LinkingHelper.sms(phone);
    }

    Alert.alert('Add mobile number and try again');
  };

  const handleBadgePress = () =>
    Navigator.navigate('AddSale', { client: subClient });

  const renderTabs = () => (
    <ScrollView
      horizontal
      contentContainerStyle={theme.styles.grow}
      style={styles.header}
      showsHorizontalScrollIndicator={false}
    >
      <Pressable
        style={[
          styles.containerHeaderItem,
          tab === 0 && styles.activeIndicator,
          { paddingHorizontal: liteSubcription ? 60 : 20 }
        ]}
        hitSlop={styles.hitSlop}
        onPress={() => {
          setTab(0);
        }}
      >
        <Text style={styles.headerTitle}>Details</Text>
      </Pressable>
      <Pressable
        style={[
          styles.containerHeaderItem,
          tab === 1 && styles.activeIndicator,
          { paddingHorizontal: liteSubcription ? 60 : 20 }
        ]}
        hitSlop={styles.hitSlop}
        onPress={() => {
          setTab(1)
        }}
      >
        <Text style={styles.headerTitle}>Appointments</Text>
      </Pressable>
      {!liteSubcription && <Pressable
        style={[
          styles.containerHeaderItem,
          tab === 2 && styles.activeIndicator,
        ]}
        hitSlop={styles.hitSlop}
        onPress={() => {
          setTab(2);
        }}
      >
        <Text style={styles.headerTitle}>Invoices</Text>
      </Pressable>}
      {!liteSubcription && <Pressable
        style={[
          styles.containerHeaderItem,
          tab === 3 && styles.activeIndicator,
        ]}
        hitSlop={styles.hitSlop}
        onPress={() => {
          setTab(3);
        }}
      >
        <Text style={styles.headerTitle}>Sales</Text>
      </Pressable>}
      {!liteSubcription && <Pressable
        style={[
          styles.containerHeaderItem,
          tab === 4 && styles.activeIndicator,
        ]}
        hitSlop={styles.hitSlop}
        onPress={() => {
          setTab(4);
        }}
      >
        <Text style={styles.headerTitle}>Estimates</Text>
      </Pressable>}
    </ScrollView>
  );

  const renderBackgroundTabs = () => {
    const tabHeight = getAnimatedTabHeight();
    const titleTextSize = getAnimatedPhoneFontSize();
    const borderTopWidth = getAnimatedBorderTopWidth();
    const borderBottomWidth = getAnimatedBorderBottomWidth();
    const contentOpacity = getNavBarForegroundOpacity();
    return (
      (
        <Animated.ScrollView
          horizontal
          contentContainerStyle={theme.styles.grow}
          style={[styles.header, {
            minHeight: tabHeight,
            maxHeight: tabHeight,
            borderTopWidth: borderTopWidth,
            opacity: contentOpacity
          }]}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable
            hitSlop={styles.hitSlop}
            onPress={() => {
              setTab(0);
            }}
          >
            <Animated.View style={[
              styles.containerHeaderItem,
              tab === 0 && styles.activeIndicator,
              {
                borderBottomWidth: borderBottomWidth
              },
              { paddingHorizontal: liteSubcription ? 60 : 20 }
            ]}>
              <Animated.Text style={[styles.headerTitle, {
                fontSize: titleTextSize
              }]}>Details</Animated.Text>
            </Animated.View>
          </Pressable>
          <Pressable
            hitSlop={styles.hitSlop}
            onPress={() => {
              setTab(1)
            }}
          >
            <Animated.View style={[
              styles.containerHeaderItem,
              {
                borderBottomWidth: borderBottomWidth
              },
              tab === 1 && styles.activeIndicator,
              { paddingHorizontal: liteSubcription ? 60 : 20 }
            ]}>
              <Animated.Text style={[styles.headerTitle, {
                fontSize: titleTextSize
              }]}>Appointments</Animated.Text>
            </Animated.View>
          </Pressable>
          {!liteSubcription && <Pressable
            hitSlop={styles.hitSlop}
            onPress={() => {
              setTab(2);
            }}
          >
            <Animated.View style={[
              styles.containerHeaderItem,
              {
                borderBottomWidth: borderBottomWidth
              },
              tab === 2 && styles.activeIndicator,
              { paddingHorizontal: liteSubcription ? 60 : 20 }
            ]}>
              <Animated.Text style={[styles.headerTitle, {
                fontSize: titleTextSize
              }]}>Invoices</Animated.Text>
            </Animated.View>
          </Pressable>}
          {!liteSubcription && <Pressable
            hitSlop={styles.hitSlop}
            onPress={() => {
              setTab(3);
            }}
          >
            <Animated.View style={[
              styles.containerHeaderItem,
              {
                borderBottomWidth: borderBottomWidth
              },
              tab === 3 && styles.activeIndicator,
              { paddingHorizontal: liteSubcription ? 60 : 20 }
            ]}>
              <Animated.Text style={[styles.headerTitle, {
                fontSize: titleTextSize
              }]}>Sales</Animated.Text>
            </Animated.View>
          </Pressable>}
          {!liteSubcription && <Pressable
            hitSlop={styles.hitSlop}
            onPress={() => {
              setTab(4);
            }}
          >
            <Animated.View style={[
              styles.containerHeaderItem,
              {
                borderBottomWidth: borderBottomWidth
              },
              tab === 4 && styles.activeIndicator,
              { paddingHorizontal: liteSubcription ? 60 : 20 }
            ]}>
              <Animated.Text style={[styles.headerTitle, {
                fontSize: titleTextSize
              }]}>Estimates</Animated.Text>
            </Animated.View>
          </Pressable>}
        </Animated.ScrollView>
      )
    )
  };

  const renderNavBar = () => {
    const navContentAnimatePadding = getNavContentPadding();
    const navNameTextLineHeight = getAnimatedLineHeight();
    const navNameTextFontSize = getAnimatedFontSize();
    const navPhoneTextLineHeight = getAnimatedPhoneLineHeight();
    const navPhoneTextFontSize = getAnimatedPhoneFontSize();
    const animatedCallContainer = getAnimatedCallContainer();
    const animatedImageContainer = getAnimatedImageContainer();
    const contentOpacity = getNavBarForegroundOpacity();
    return (
      (
        <>
          <Animated.View style={[styles.navContent, {
            padding: navContentAnimatePadding,
            opacity: contentOpacity
          }]}>
            <View>
              <View style={styles.row}>
                <Animated.Text style={[styles.userName, {
                  lineHeight: navNameTextLineHeight,
                  fontSize: navNameTextFontSize
                }]}>
                  {getFullName({
                    firstName: subClient?.firstName || '',
                    lastName: subClient?.lastName || '',
                  })}
                </Animated.Text>
                {subClient?.isConnected ? subClient?.isDisconnect == false ? (
                  <Animated.Image
                    source={require('assets/onBoarding/alpha.png')}
                    style={[styles.imageConnected, {
                      height: navPhoneTextFontSize,
                      width: navPhoneTextFontSize
                    }]}
                  />
                ) : null : null}
              </View>
              <Animated.Text style={[styles.phone, {
                lineHeight: navPhoneTextLineHeight,
                fontSize: navPhoneTextFontSize
              }]}>{subClient?.phoneNumber || ''}</Animated.Text>
            </View>
            <View style={[styles.row]}>
              <TouchableOpacity
                onPress={() => onCall(subClient?.phoneNumber)}
              >
                <Animated.View style={[styles.callContainer, {
                  padding: animatedCallContainer
                }]}>
                  <Animated.Image
                    source={require('assets/global/call.png')}
                    style={[styles.imageContainer, {
                      height: animatedImageContainer,
                      width: animatedImageContainer
                    }]}
                  />
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onMessages(subClient?.phoneNumber)}
              >
                <Animated.View style={[styles.chatContainer, {
                  padding: animatedCallContainer
                }]}>
                  <Animated.Image
                    source={require('assets/global/chat.png')}
                    style={[styles.imageContainer, {
                      height: animatedImageContainer,
                      width: animatedImageContainer
                    }]}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {renderBackgroundTabs()}
        </>
      )
    )
  }


  const pressInvite = () => dispatch(inviteClient({ id: subClient?.id, date: moment().format('YYYY-MM-DD') }))

  const pressConnect = async () => {
    try {
      if (subClient?.isDisconnect && subClient?.isConnected) {
        dispatch(editSubClient(formData))
      } else {
        await SubClientsProviderApi.connectClient({
          id: subClient?.id,
          shouldCopyData: true,
        });
      }
      dispatch(getSubClient(route?.params?.clientId));
    } catch (error: any) {
      toast.info(error?.message);
    }
  };

  const updateClient = async () => {
    alert.editing({
      entity: undefined,
      message: t(translations.common.alerts.connectClient, {
        clientName: subClient?.firstName,
      }),
      onEdit: pressConnect,
    })
  }

  const doNotUpdateClient = async () => {
    if (subClient?.isDisconnect && subClient?.isConnected) {
      setShowModel(false);
      dispatch(editSubClient(formData));
      dispatch(getSubClient(route?.params?.clientId));
    } else {
      setShowModel(false);
      await SubClientsProviderApi.connectClient({
        id: subClient?.id,
        shouldCopyData: false,
      });
      dispatch(getSubClient(route?.params?.clientId));
    }
  }

  const renderModal = (show: boolean, content: any) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => { setShowModel(false) }}
      >
        <View style={styles.chooseModalView}>
          <View style={[styles.chooseView, styles.shadow]}>{content}</View>
        </View>
      </Modal>
    );
  };

  const renderContent = (): any => {
    switch (tab) {
      case 0:
        return (
          <ClientDetail
            details={subClient}
            isBlocked={isClientBlocked}
            pressBlock={handleBlockUser}
            pressDisconnect={handleDisconnectUser}
            pressInvite={() => {
              if (subClient?.email) {
                alert.editing({
                  entity: undefined,
                  message: `Are you sure you want to invite ${subClient?.firstName} to the app?`,
                  onEdit: pressInvite,
                });
              } else {
                toast.info('Please specify the client email');
              }
            }}
            pressConnect={() =>
              setShowModel(true)
            }
            pressDuplicate={() =>
              Alert.alert(
                'Warning',
                'You already have another Client profile with the same email that is connected to the existing client app account',
              )
            }
            pressEdit={() =>
              navigation.push('AddClient', { clientId: subClient?.id })
            }
          />
        );
      case 1:
        return (
          <ClientAppointment
            scrollRef={scrollRef}
            onEnd={onEnd}
            setEnd={(value: boolean) => setOnEnd(value)}
            onMore={fetchMoreAppointments}
            details={subClient}
            appointments={appointments}
          />
        );
      case 2:
        return <ClientInvoices details={subClient} />;
      case 3:
        return <ClientSales client={subClient} />;
      case 4:
        return <ClientEstimates details={subClient} />;
      case 5:
        null;
      default:
        return null;
    }
  };

  const title = (): any => {
    return (
      <>
        <View style={styles.body}>
          <View style={styles.headerContainer}>
            <Image
              source={
                subClient?.photo
                  ? { uri: subClient?.photo }
                  : require('assets/global/defaultAvatar.jpg')
              }
              style={styles.avatar}
            />
            <View style={styles.rewardBadgeContainer}>
              {(isPremiumProvider && isClientConnected && availableLoyaltyRewards) && (
                <TouchableOpacity style={styles.rewardBadge} onPress={handleBadgePress}>
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
          <View style={styles.row}>
            <Text style={styles.userName}>{`${subClient?.firstName} ${subClient?.lastName || ''
              }`}</Text>
            {subClient?.isConnected ? subClient?.isDisconnect == false ? (
              <Image
                source={require('assets/onBoarding/alpha.png')}
                style={styles.imageConnected}
              />
            ) : null : null}
          </View>
          <Text style={styles.phone}>{subClient?.phoneNumber || ''}</Text>
          <View style={styles.rowSpace}>
            <Button
              text={'Call Client'}
              onPress={() => onCall((subClient?.phoneNumber)?.replace('-', ''))}
              image={require('assets/global/call.png')}
              buttonStyle={styles.buttonCall}
            />
            <Button
              text={'Messages'}
              onPress={() => onMessages(subClient?.phoneNumber)}
              image={require('assets/global/chat.png')}
              buttonStyle={styles.buttonChat}
              textStyle={styles.textChat}
            />
          </View>
        </View>
        {renderTabs()}
      </>
    );
  };

  return (
    <MainPageTemplate loading={subClientsLoading || loading || unblockLoading} bc={COLORS.whiteFour}>
      <RNParallaxHeader
        title={title()}
        scrollY={scrollYRef}
        navbarColor="white"
        extraScrollHeight={20}
        backgroundColor="white"
        alwaysShowTitle={false}
        alwaysShowNavBar={false}
        backgroundImageScale={1.2}
        renderNavBar={renderNavBar}
        renderContent={renderContent}
        containerStyle={styles.container}
        innerContainerStyle={styles.container}
        headerMinHeight={DEFAULT_HEADER_MIN_HEIGHT}
        headerMaxHeight={DEFAULT_HEADER_MAX_HEIGHT}
      />
      {renderModal(
        showModel,
        <>
          <Text style={styles.titleChooseModal}>
            Do you want to update the client profile from the client app?
          </Text>
          <Button
            text={'Do not update'}
            onPress={doNotUpdateClient}
            buttonStyle={styles.createNew}
          />
          <Button
            text={'Update client'}
            onPress={() => {
              setShowModel(false);
              updateClient()
            }}
            buttonStyle={styles.connectClient}
          />
        </>,
      )}
    </MainPageTemplate>
  );
};

export default SubClientDetails;