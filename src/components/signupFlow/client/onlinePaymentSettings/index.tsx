import React, { useEffect, useState } from 'react';
import { Switch, Text, View } from 'react-native';
import styles from './style';
import I18n, { translations } from 'locales';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'shared/button';
import { alert } from 'shared/alert';
import { Loader } from 'shared/loader';
import COLORS from 'utils/colors';
import { changeStep } from 'store/actions/signUpClient';
import {
  deleteAllCards,
  cardSelectors
} from 'store/entities/card';
import { updateClientProfile } from 'store/actions/client';

const OnlinePaymentSetting: React.FC<any> = ({ onSignIn }) => {
  const dispatch = useDispatch();

  const client = useSelector((state: any) => state.client.client);
  const loadingClient = useSelector((state: any) => state.client.loading);
  const loading = useSelector(cardSelectors.loading);

  const { t } = useTranslation();

  const onPressContinue = () => {
    (client?.isPaymentEnabled == true) ? dispatch(changeStep(6)) : onSignIn()
  }

  const updateClientOnlinePaymentStatus = (shouldEnable: boolean) => {
    const formData = new FormData();
    let userInfo: any = {
      firstName: client?.firstName,
      lastName: client?.lastName,
      phoneNumber: client?.phoneNumber,
      serviceIds: JSON.stringify(client?.services.map((item: any) => item.id)),
      isPaymentEnabled: shouldEnable,
    };
    if (client?.address) {
      userInfo = {
        ...userInfo,
        address: JSON.stringify({
          ...client?.address,
          utcOffset: client.utcOffset,
          addressLine2: client?.address?.addressLine2,
        }),
      };
    }
    if (client?.birthday) {
      userInfo = { ...userInfo, birthday: client?.birthday };
    }
    for (const name in userInfo) {
      formData.append(name, userInfo[name]);
    }
    if (client?.photo) {
      formData.append('photo', client?.photo);
    }
    dispatch(updateClientProfile(formData));
  };

  const onChangePaymentOptionAvailability = (shouldEnable: boolean) => {
    alert.confirmation({
      message: (shouldEnable) ? t(translations.onlinePaymentMethods.enableOnlinePayment) : t(translations.onlinePaymentMethods.disableOnlinePayment),
      onConfirm: () => {
        updateClientOnlinePaymentStatus(shouldEnable)
        // if (!shouldEnable) {
        //   handleDeleteAll()
        // }
      }
    })
  }

  const handleDeleteAll = () => dispatch(deleteAllCards())

  return (
    <>
      <Loader loading={loadingClient || loading} />
      <Text style={styles.title}>{I18n.t<string>('onlinePaymentSettingsClient.title')}</Text>
      <Text style={styles.description}>{I18n.t<string>('onlinePaymentSettingsClient.description')}</Text>
      <View style={styles.paymentSwitchContainer}>
        <Text style={styles.titlePaymentMethod}>{I18n.t<string>('onlinePaymentSettingsClient.switchTitle')}</Text>
        <Switch
          trackColor={{
            false: COLORS.battleshipGrey32,
            true: COLORS.coolGreen,
          }}
          thumbColor={COLORS.white}
          ios_backgroundColor={COLORS.blackLacquer}
          onValueChange={onChangePaymentOptionAvailability}
          value={client?.isPaymentEnabled ?? false} />
      </View>

      <View style={styles.rowButtons}>
        <Button
          onPress={onPressContinue}
          text={I18n.t('onlinePaymentSettingsClient.continue')}
          buttonStyle={styles.btnContinue}
          textStyle={styles.textContinue}
        />
      </View>
    </>
  );
};

export default OnlinePaymentSetting;
