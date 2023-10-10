import I18n from 'locales';
import React from 'react';
import moment from 'moment-timezone';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { dateFormatWithoutTz, dateWithoutTz } from 'utils/dates';

import { styles } from '../style';
import { userSelectors } from 'store/entities/user';

interface Props {
  onPress: () => void;
  item: any;
}

const PaymentsItem: React.FC<Props> = (props) => {
  const { onPress, item } = props;
  const { total = 0, date, number } = item;
  const { clientSubprofile } = item;
  const {
    firstName = 'Unknown Client',
    lastName = '',
    photo,
    isConnected,
  } = clientSubprofile || {};
  const user = useSelector(userSelectors.user);
  const providerOffset = user?.utcOffset;

  let paymentDate = dateWithoutTz(date, providerOffset ? providerOffset : 0);

  const renderParagraf = (title: string, type?: any) => (
    <Paragraph size="s" type={type || 'book'}>
      {title}
    </Paragraph>
  );
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.saleCardTouchable, styles.shadow]}
    >
      <Box row ai="center">
        <Box flex ml={4}>
          <Box row ai="center">
            <Image
              source={
                photo
                  ? {
                      uri: photo,
                    }
                  : require('assets/global/defaultAvatar.jpg')
              }
              style={styles.avatar}
            />
            <Box>
              <Box row ai="center">
                <Paragraph>{firstName + ' ' + (lastName || '')}</Paragraph>
                {isConnected && (
                  <Image
                    source={require('assets/onBoarding/alpha.png')}
                    style={styles.imageConnected}
                  />
                )}
              </Box>
              <Box row>
                {renderParagraf(I18n.t('payments.totalTitle'))}
                {renderParagraf(
                  I18n.t('payments.totalValue', { total }),
                  'bold',
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Icon src={require('assets/global/arrowRight.png')} />
      </Box>
      <View style={styles.separator} />
      <Box row ai="center">
        {renderParagraf(I18n.t('payments.paymentNo'))}
        {renderParagraf(I18n.t('payments.noValue', { value: number }), 'bold')}
      </Box>
      <Box row ai="center">
        {renderParagraf(I18n.t('payments.paymentDate'))}
        {renderParagraf(dateFormatWithoutTz(paymentDate), 'bold')} 
      </Box>
    </TouchableOpacity>
  );
};

export { PaymentsItem };
