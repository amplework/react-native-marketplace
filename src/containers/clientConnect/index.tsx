import I18n from 'locales';
import React, { useLayoutEffect, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dimensions, FlatList } from 'react-native';
import { BackButton } from 'shared/backButton';
import { Card, CardBody, CardTitle } from 'shared/card';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';
import { Box } from 'shared/box';
import { styles } from './style';
import { Paragraph } from 'shared/paragraph';
import { SVGComponent } from 'shared/icon/icons';
import { ImageSourcePropType } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getClientConnect } from 'store/entities/clientConnect';

interface ListType {
  id: number;
  title: string;
  route: string;
  params?: any;
  Icon?: SVGComponent;
  icon?: ImageSourcePropType;
}

export const List: ListType[] = [
  {
    id: 3,
    title: I18n.t('clientConnect.options.special'),
    route: 'SalesSpecial',
    icon: require('assets/clientConnect/saleSpecial.png'),
  },
  {
    id: 4,
    title: I18n.t('clientConnect.options.promotion'),
    route: 'QuickPromotion',
    icon: require('assets/clientConnect/quickPromotion.png'),
  },
  {
    id: 5,
    title: I18n.t('clientConnect.options.rewards'),
    route: 'LoyaltyOptions',
    icon: require('assets/clientConnect/clientRewards.png'),
  },
  {
    id: 6,
    title: I18n.t('clientConnect.options.blast'),
    route: 'ClientBlastOptions',
    icon: require('assets/clientConnect/clientBlast.png'),
  },
  {
    id: 7,
    title: I18n.t('clientConnect.options.mediaPost'),
    route: 'SocialMediaPost',
    icon: require('assets/clientConnect/socialMediaPost.png'),
  },
];

const ClientConnect: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const screenWidth = Dimensions.get('window').width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('clientConnect.title')} />,
    });
  }, [navigation]);

  useEffect(() => {
    dispatch(getClientConnect({ type: 'client blast' }));
  });

  const renderItem = ({ item }: any) => {
    return (
      <Card
        bg={COLORS.white}
        isClickable={true}
        onPress={
          item.route
            ? () => navigation.navigate(item.route, item.params)
            : () => { }
        }
      >
        <CardBody row jc="space-between" ai="center">
          <Box row>
            <Icon src={item.icon} />
            <Paragraph ml={15}>{item.title}</Paragraph>
          </Box>
          <Box>
            <Icon src={require('assets/global/arrowRight.png')} />
          </Box>
        </CardBody>
      </Card>
    );
  };

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <Box row ai="center" jc="space-between" mb={15}>
        <TouchableOpacity style={styles.twinContainer} onPress={() => navigation.navigate('SocialMedia')}>
          <Icon
            src={require('assets/bottomBar/connect.png')}
            size={50}
          />
          <Paragraph centered size='s'>{'Connect your social\n Media'}</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.twinContainer} onPress={() => navigation.navigate('InviteToAlpha', {
          routeName: 'providerInviteClients'
        })}>
          <Icon
            src={require('assets/bottomBar/share_icon.png')}
            size={50}
          />
          <Paragraph centered size='s'>{'Share app with your\n clients'}</Paragraph>
        </TouchableOpacity>
      </Box>

      <FlatList
        data={List}
        renderItem={renderItem}
        keyExtractor={(key) => key.id.toString()}
      />
    </SafeContainer>
  );
};

export default ClientConnect;
