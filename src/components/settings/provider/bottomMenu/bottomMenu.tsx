import { useFocusEffect } from '@react-navigation/core';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import { translations } from 'locales';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';
import DropMenu from 'shared/dropMenu';
import { Paragraph } from 'shared/paragraph';
import { MainPageTemplate } from 'shared/templates';
import {
  bottomMenuSelectors,
  editBottomMenuSettings,
} from 'store/entities/bottomMenu';
import { subscriptionSelectors } from 'store/entities/subscription';
import { LITE } from 'types/subscription';
import COLORS from 'utils/colors';

import { BottomMenuStrip } from './components/bottomMenuStrip';
import { MENU_ITEMS, MENU_ITEMS_LITE } from './helpers/utils';
import { bottomMenuStyles as S } from './style';

type Props = StackScreenProps<RootStackParamList>;

const BottomMenu: React.FC<Props> = ({ navigation }) => {
  const [bottomMenuSettings, setBottomMenuSettings] = useState('sales');

  const settings = useSelector(bottomMenuSelectors.settings);
  const subscription = useSelector(subscriptionSelectors.subscription);
  const loading = useSelector(bottomMenuSelectors.loading);
  const menuItems = subscription?.subscriptionPlan?.includes('lite') ?
    MENU_ITEMS_LITE : MENU_ITEMS;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={t(translations.settings.links.bottomMenu)} />
      ),
    });
  }, [navigation, t]);

  useFocusEffect(
    useCallback(
      () => setBottomMenuSettings(settings?.bottomMenuSettings || 'clients'),
      [settings],
    ),
  );

  const onChange = (value: string) => {
    setBottomMenuSettings(value);
  };

  const onSavePress = () => {
    dispatch(editBottomMenuSettings({ bottomMenuSettings }));
  };

  return (
    <MainPageTemplate safeStyle={S.safeArea}>
      <ScrollView style={S.content}>
        <Paragraph type="book" size="s">
          {t(translations.settings.bottomMenu.description)}
        </Paragraph>
        <BottomMenuStrip configuredMenuItem={bottomMenuSettings} />
        <Paragraph size="s" type="book" color={COLORS.black} mt={40}>
          {t(translations.settings.bottomMenu.label)}
        </Paragraph>
        <DropMenu
          value={bottomMenuSettings}
          items={menuItems}
          style={S.dropDown}
          mt={-10}
          onChange={onChange}
        />
      </ScrollView>
      <View style={S.saveButtonContainer}>
        <Button
          text={t(translations.common.save)}
          loading={loading}
          onPress={onSavePress}
        />
      </View>
    </MainPageTemplate>
  );
};

export { BottomMenu };
