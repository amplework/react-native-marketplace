import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import I18n from 'locales';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MainPageTemplate } from 'shared/templates';
import { BackButton } from 'shared/backButton';
import { Loader } from 'shared/loader';
import COLORS from 'utils/colors';
import { WebView } from 'react-native-webview'
import { Navigator } from 'service/navigator';
import { BottomSheet } from 'shared/bottomSheet';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';

const Help: React.FC<any> = ({ navigation }) => {

  const webViewRef: any = useRef(null);
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton
          title={I18n.t('Help')}
          onPress={Navigator.drawer.open}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    setShow(true);
  }, [])

  const onCloseModal = () => {
    setShow(false);
    navigation.goBack();
    Navigator.drawer.open();
  }

  return (
    <MainPageTemplate bc={COLORS.white}>
      {show ? (
        <BottomSheet size='l' >
          <View style={styles.header}>
            <Pressable onPress={onCloseModal}>
              <Paragraph color={COLORS.clearBlue} size="m" type="bold">
                {'Done'}
              </Paragraph>
            </Pressable>
            <Paragraph size="m" type="bold">
              {'goalphapro.com'}
            </Paragraph>
            <MaterialIcons
              size={24}
              onPress={() => {
                webViewRef && webViewRef.current.reload();
              }}
              style={{ color: COLORS.clearBlue }}
              name={'refresh'}
            />
          </View>
          <WebView
            ref={webViewRef}
            startInLoadingState
            onNavigationStateChange={(navState: any) => {}}
            source={{ uri: 'https://goalphapro.com/support' }} />
        </BottomSheet>
      ) : null}
    </MainPageTemplate>
  )
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.whiteGray,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

export default Help;