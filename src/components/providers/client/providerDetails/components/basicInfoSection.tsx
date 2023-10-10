import I18n from 'locales';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { LinkingHelper } from 'service/linkingHelper';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Separator } from 'shared/separator';
import { providersSelectors } from 'store/entities/providers';

import { styles } from '../style';

const BasicInfoSection: React.FC = () => {
  const provider: any = useSelector(providersSelectors.provider);
  // const { email, alternatePhoneNumber, address } = useSelector(
  //   providersSelectors.provider,
  // )!;

  const handleEmailPress = () => LinkingHelper.mailto(provider?.email);

  return (
    <>
      <Paragraph size="s" type="book" mb={12}>
        {I18n.t('providers.basicInfo')}
      </Paragraph>
      <View style={styles.card}>
        <Box mb={16} pr={24}>
          <Paragraph size="s" type="book" mb={4}>
            {I18n.t('common.email')}
          </Paragraph>
          <Box row jc="space-between" ai="center">
            <Paragraph flex lines={1} mr={12}>
              {provider?.email || ''}
            </Paragraph>
            <Icon
              src={require('assets/global/mail.png')}
              onPress={handleEmailPress}
              size={20}
            />
          </Box>
        </Box>
        <Separator mb={16} />
        <Box mb={16} pr={24}>
          <Paragraph size="s" type="book" mb={4}>
            {I18n.t('common.whatsApp')}
          </Paragraph>
          <Box row jc="space-between" ai="center">
            <Paragraph>{provider?.alternatePhoneNumber || ' '}</Paragraph>
            <Icon src={require('assets/global/whatsApp.png')} size={20} />
          </Box>
        </Box>
        <Separator mb={16} />
        <Box pr={24}>
          <Paragraph size="s" type="book" mb={4}>
            {I18n.t('common.address')}
          </Paragraph>
          <Paragraph>{provider?.address?.formattedAddress || ' '}</Paragraph>
        </Box>
      </View>
    </>
  );
};

export { BasicInfoSection };
