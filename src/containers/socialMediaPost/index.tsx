import I18n, { t, translations } from 'locales';
import React, { useLayoutEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { FlatList, ImageSourcePropType } from 'react-native';
import { BackButton } from 'shared/backButton';
import { Box } from 'shared/box';
import { Card, CardBody, CardTitle } from 'shared/card';
import SafeContainer from 'shared/container';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import { styles } from './style';
import { useSelector } from 'react-redux';

interface ListType {
  id: number;
  title: string;
  description: string;
  messages: string;
  icon?: ImageSourcePropType;
  route: any;
}

const SocialMediaPost: React.FC<any> = ({ navigation }) => {
  const provider = useSelector((state: any) => state.provider.provider);

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
      title: I18n.t('clientBlast.options.introduce.title'),
      description: I18n.t('clientBlast.options.introduce.description'),
      messages: t(translations.CompleteBlastDetails.description.salesSpecials, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/introduce.png'),
      route: 'completeBlastDetails',
    },

    {
      id: 3,
      title: I18n.t('clientBlast.options.closed.title'),
      description: I18n.t('clientBlast.options.closed.description'),
      messages: t(translations.CompleteBlastDetails.description.closeDays, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/closeDays.png'),
      route: 'completeBlastDetails',
    },

    {
      id: 4,
      title: I18n.t('clientBlast.options.alpha.title'),
      description: I18n.t('clientBlast.options.alpha.description'),
      messages: t(translations.CompleteBlastDetails.description.inviteClients, { provider: provider?.firstName + ' ' + provider?.lastName }),
      icon: require('assets/clientConnect/loyalty.png'),
      route: 'completeBlastDetails',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton title={I18n.t('socialMediaPost.title')} />,
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
            isFromSocialMediaPost: true,
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

export default SocialMediaPost;
