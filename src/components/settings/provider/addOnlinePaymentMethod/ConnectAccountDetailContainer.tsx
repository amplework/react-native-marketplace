import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'shared/avatar';
import { Box } from 'shared/box';
import Button from 'shared/button';
import SafeContainer from 'shared/container';
import { Details, DetailsRow } from 'shared/details';
import { Paragraph } from 'shared/paragraph';
import { theme } from 'theme';
import { getConnectAccountStatus } from 'utils/onlinePaymentOptions';
import { getFullName } from 'utils/strings';
import styles from './style';

const ConnectAccountDetailContainer: React.FC<any> = ({ connectAccountDetails, provider, onPressDelete }) => {
  return (
    <SafeContainer containerStyle={theme.styles.flex}>
      <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
        <Box ai='center' mb={12}>
          <Avatar src={provider?.photo} size={70} mb={15} />
          {provider && <Paragraph type="bold">{getFullName(provider)}</Paragraph>}
        </Box>
        <Paragraph size="s" type="book" mt={20}>{'Account information'}</Paragraph>
        <Details mt={4}>
          <DetailsRow
            label={'Status'}
            value={getConnectAccountStatus(connectAccountDetails) ? 'Active' : 'Restricted'} />
          <DetailsRow
            label={'ID'}
            value={connectAccountDetails?.id} />
          <DetailsRow
            label={'Type'}
            value={connectAccountDetails?.type}
            isLast />
        </Details>
        <Paragraph size="s" type="book" mt={20}>{'Business details'}</Paragraph>
        <Details mt={4}>
          <DetailsRow
            label={'Business'}
            value={connectAccountDetails?.business_profile?.url} />
          <DetailsRow
            label={'Email'}
            value={connectAccountDetails?.email} />
          <DetailsRow
            label={'Country'}
            value={connectAccountDetails?.country}
            isLast />
        </Details>
        <Paragraph size="s" type="book" mt={20}>{'Payout information'}</Paragraph>
        <Details mt={4}>
          <DetailsRow
            label={'Default currency'}
            value={connectAccountDetails?.default_currency?.toUpperCase()} />
          {(connectAccountDetails?.external_accounts?.data?.[0]?.object == 'card') ? (
            <DetailsRow
              label={'Card brand'}
              value={connectAccountDetails?.external_accounts?.data?.[0]?.brand} />
          ) : (
            <DetailsRow
              label={'Bank name'}
              value={connectAccountDetails?.external_accounts?.data?.[0]?.bank_name} />
          )}
          {(connectAccountDetails?.external_accounts?.data?.[0]?.object == 'bank_account') && (
            <DetailsRow
              label={'Routing number'}
              value={connectAccountDetails?.external_accounts?.data?.[0]?.routing_number} />
          )}
          {(connectAccountDetails?.external_accounts?.data?.[0]?.object == 'card') && (
            <DetailsRow
              label={'Card expiration'}
              value={`${connectAccountDetails?.external_accounts?.data?.[0]?.exp_month}/${connectAccountDetails?.external_accounts?.data?.[0]?.exp_year}`} />
          )}
          <DetailsRow
            label={(connectAccountDetails?.external_accounts?.data?.[0]?.object == 'bank_account') ? 'Account number' : 'Card number'}
            value={`**** ${connectAccountDetails?.external_accounts?.data?.[0]?.last4}`}
            isLast />
        </Details>
      </ScrollView>
      <View style={styles.bottomBlock}>
        <Button
          onPress={onPressDelete}
          text={'Delete Connect Account'}
          buttonStyle={styles.btnDelete}
          textStyle={styles.textDelete}
        />
      </View>
    </SafeContainer>
  )
};

export { ConnectAccountDetailContainer };