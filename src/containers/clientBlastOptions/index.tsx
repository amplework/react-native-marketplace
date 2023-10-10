import I18n, { t, translations } from 'locales';
import React, { useEffect, useLayoutEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList, ImageSourcePropType } from 'react-native';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Card, CardBody, CardSubTitle, CardTitle } from 'shared/card';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { useSelector, useDispatch } from 'react-redux';
import CompleteBlastDetails from 'containers/completeBlastDetails';
import { getClientConnect } from 'store/entities/clientConnect';
import { styles } from './style';

interface ListType {
  id: number;
  title: string;
  description: string;
  messages: string;
  icon?: ImageSourcePropType;
  route: any;
}

const ClientBlastOptions: React.FC<any> = ({ navigation }) => {

  const provider = useSelector((state: any) => state.provider.provider);
  const dispatch = useDispatch();

  const List: ListType[] = [
    {
      id: 1,
      title: I18n.t('clientBlast.options.social.title'),
      description: I18n.t('clientBlast.options.social.description'),
      messages: t(translations.CompleteBlastDetails.description.postYourService, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/postYourService.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 2,
      title: I18n.t('clientBlast.options.specials.title'),
      description: I18n.t('clientBlast.options.specials.description'),
      messages: t(translations.CompleteBlastDetails.description.salesSpecials, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/introduce.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 3,
      title: I18n.t('clientBlast.options.missing.title'),
      description: I18n.t('clientBlast.options.missing.description'),
      messages: t(translations.CompleteBlastDetails.description.missYou, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/missYou.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 4,
      title: I18n.t('clientBlast.options.loyalty.title'),
      description: I18n.t('clientBlast.options.loyalty.description'),
      messages: t(translations.CompleteBlastDetails.description.loyaltyDetails, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/loyalty.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 5,
      title: I18n.t('clientBlast.options.closed.title'),
      description: I18n.t('clientBlast.options.closed.description'),
      messages: t(translations.CompleteBlastDetails.description.closeDays, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/closeDays.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 6,
      title: I18n.t('clientBlast.options.general.title'),
      description: I18n.t('clientBlast.options.general.description'),
      messages: t(translations.CompleteBlastDetails.description.generalMesage, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/generalMessage.png'),
      route: 'completeBlastDetails',
    },
    {
      id: 7,
      title: I18n.t('clientBlast.options.invite.title'),
      description: I18n.t('clientBlast.options.invite.description'),
      messages: t(translations.CompleteBlastDetails.description.inviteClients, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/loyalty.png'),
      route: 'completeBlastDetails',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('clientBlast.title')} />,
    });
  }, [navigation]);

  const renderItem = ({ item }: any) => {
    return (
      <Card
        bg={COLORS.white}
        isClickable={true}
        onPress={() =>
          navigation.navigate('CompleteBlastDetails', {
            messages: item?.messages,
            id: item?.id,
          })
        }
      >
        <CardBody size="l">
          <Box row jc="space-between">
            <Box row>
              <Icon src={item.icon} />
              <Paragraph size="s" type="medium" ml={5}>
                {' '}
                {item.title}
              </Paragraph>
            </Box>
            <Box>
              <Icon ml={-20} src={require('assets/global/arrowRight.png')} />
            </Box>
          </Box>

          <Paragraph mr={40} size="xs" type="medium" color={COLORS.warmGrey}>
            {item.description}
          </Paragraph>
        </CardBody>
      </Card>
    );
  };

  return (
    <SafeContainer
      safeStyle={styles.safeArea}
      containerStyle={styles.container}
    >
      <FlatList
        data={List}
        renderItem={renderItem}
        keyExtractor={(key) => key.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </SafeContainer>
  );
};

export default ClientBlastOptions;
