import moment from 'moment';
import React, { ReactText } from 'react';
import {
  Alert,
  Image,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinkingHelper } from 'service/linkingHelper';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Separator } from 'shared/separator';
import COLORS from 'utils/colors';
import { currency } from 'utils/currency';
import { getValueOrNA } from 'utils/fields';
import { subscriptionSelectors } from 'store/entities/subscription';

import styles from './style';
import { useSelector } from 'react-redux';

export interface Props {
  details: any;
  pressEdit: () => void;
  pressInvite: () => void;
  pressConnect: () => void;
  pressDuplicate: () => void;
  pressBlock: () => void;
  pressDisconnect: () => void;
  isBlocked: boolean | any;
}

const ClientDetail: React.FC<Props> = ({
  details,
  pressEdit,
  pressInvite,
  pressConnect,
  pressDuplicate,
  pressDisconnect,
  pressBlock,
  isBlocked,
}) => {
  const handleEmailPress = () =>
    details?.email
      ? LinkingHelper.mailto(details.email)
      : Alert.alert('Add email and try again');

  const subscription = useSelector(subscriptionSelectors.subscription);
  const liteSubcription = subscription?.subscriptionPlan?.includes('lite');

  const renderItem = (text: string, value: ReactText) => {
    return (
      <>
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>{text}</Text>
          <Text style={styles.value}>{getValueOrNA(value)}</Text>
        </View>
        <Separator mv={16} />
      </>
    );
  };
  const { isConnected, canConnectToClient, isDuplicatedProfile, isDisconnect } =
    details || {};
  const {
    lastAppointmentDate,
    lastSaleDate,
    nextAppointmentDate,
    balance,
    totalSpend,
  } = details || {};
  const statusLabel = isDisconnect ? 'Connect' : isConnected
    ? 'Connected'
    : canConnectToClient
      ? 'Connect'
      : isDuplicatedProfile
        ? 'Duplicated profile'
        : 'Invite to the App';
  const blockStatusLabel = isBlocked == true
    ? 'Blocked' : 'Block';
  const formatDate = (date: string | null) =>
    date ? ' ' + moment(date).format('LL') : '';

  return (
    <View style={styles.content}>
      <Text style={styles.titleContainer}>Client App Status</Text>
      <View style={styles.infoContainer}>
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>Status in App</Text>
          <Button
            buttonStyle={[
              styles.buttonInvite,
              (!isDisconnect && isConnected) && styles.buttonConnected,
            ]}
            textStyle={styles.textStatus}
            text={statusLabel}
            disabled={!isDisconnect && isConnected}
            onPress={() =>
              isDisconnect
                ? pressConnect()
                : isConnected
                  ? {}
                  : canConnectToClient
                    ? pressConnect()
                    : isDuplicatedProfile
                      ? pressDuplicate()
                      : pressInvite()
            }
          />
        </View>
      </View>
      <Text style={styles.titleContainer}>Basic Info</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.titleValue}>Email</Text>
        <View style={[styles.rowSpace, { marginTop: 4 }]}>
          <Text style={styles.titleInfo}>{getValueOrNA(details?.email)}</Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Image
              source={require('assets/global/mail.png')}
              style={styles.imageContainer}
            />
          </TouchableOpacity>
        </View>
        <Separator mv={16} />
        <View style={[styles.rowSpace, { marginTop: 4 }]}>
          <Box flex>
            <Text style={styles.titleValue}>Birthday</Text>
            <Text style={styles.titleInfo}>
              {details?.birthday
                ? moment(details?.birthday, 'YYYY-MM-DD').format('ll')
                : ''}
            </Text>
          </Box>
          <Box flex ml={60}>
            <Text style={styles.titleValue}>Age</Text>
            <Text style={styles.titleInfo}>
              {details?.birthday
                ? moment().diff(details?.birthday, 'years', false) + ' yr old'
                : ''}
            </Text>
          </Box>
        </View>
        <Separator mv={16} />
        <Text style={styles.titleValue}>Address</Text>
        <Text style={styles.titleInfo}>
          {getValueOrNA(details?.address?.formattedAddress)}
        </Text>
        {details?.address?.addressLine2 ? (
          <>
            <Separator mv={16} />
            <Text style={styles.titleValue}>Additional Address</Text>
            <Text style={styles.titleInfo}>{details.address.addressLine2}</Text>
          </>
        ) : null}
      </View>
      <Text style={styles.titleContainer}>More Details</Text>
      <View style={styles.infoContainer}>
        {!liteSubcription && renderItem('Total spend', currency.format(totalSpend))}
        {!liteSubcription && renderItem('Balance', currency.format(balance))}
        {!liteSubcription && renderItem('Last sale date', formatDate(lastSaleDate))}
        {renderItem('Last appointment date', formatDate(lastAppointmentDate))}
        {renderItem('Next Appointment date', formatDate(nextAppointmentDate))}
        {!liteSubcription && <View>
          <Text style={styles.titleValue}>Notes</Text>
          <Text style={styles.value}>{getValueOrNA(details?.notes)}</Text>
        </View>}
      </View>
      <Text style={styles.titleContainer}>Preferences</Text>
      <View style={styles.infoContainer}>
        {!isConnected ? (
          <>
            {renderItem(
              'Preference for notifications',
              getValueOrNA(details?.notificationChannel),
            )}
            <View style={[styles.rowSpace, { marginTop: 0 }]}>
              <Text style={styles.titleValue}>Notifications</Text>
              <Switch
                trackColor={{
                  false: COLORS.battleshipGrey32,
                  true: COLORS.coolGreen,
                }}
                disabled
                thumbColor={COLORS.white}
                ios_backgroundColor={COLORS.blackLacquer}
                value={details?.isNotificationsAllowed}
              />
            </View>
            <Separator mv={16} />
          </>
        ) : null}
        <View style={[styles.rowSpace, { marginTop: 0 }]}>
          <Text style={styles.titleValue}>Active client</Text>
          <Switch
            value={details?.isActive}
            trackColor={{
              false: COLORS.battleshipGrey32,
              true: COLORS.coolGreen,
            }}
            disabled
            thumbColor={COLORS.white}
            ios_backgroundColor={COLORS.blackLacquer}
          />
        </View>
      </View>
      {(!isDisconnect && isConnected) && (
        <>
          <Text style={styles.titleContainer}>Disconnect</Text>
          <View style={styles.infoContainer}>
            <View style={[styles.rowSpace, { marginTop: 0 }]}>
              <Text style={styles.titleValue}>Disconnect client</Text>
              <Button
                buttonStyle={styles.buttonBlock}
                textStyle={styles.textStatus}
                text={'Disconnect'}
                // disabled={isBlocked}
                onPress={pressDisconnect}
              />
            </View>
          </View>
        </>
      )}
      {details?.isConnected && (
        <>
          <Text style={styles.titleContainer}>Client Chat Status</Text>
          <View style={styles.infoContainer}>
            <View style={[styles.rowSpace, { marginTop: 0 }]}>
              <Text style={styles.titleValue}>Status in Chat</Text>
              <Button
                buttonStyle={[
                  styles.buttonBlock,
                  isBlocked && styles.buttonBlocked
                ]}
                textStyle={styles.textStatus}
                text={blockStatusLabel}
                disabled={isBlocked}
                onPress={pressBlock}
              />
            </View>
          </View>
        </>
      )}
      <Button
        buttonStyle={styles.buttonSpace}
        text={'Edit Client Details'}
        onPress={pressEdit}
      />
    </View>
  );
};

export default ClientDetail;