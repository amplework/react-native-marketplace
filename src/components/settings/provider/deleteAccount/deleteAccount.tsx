import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import I18n from 'locales';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { BackButton } from 'shared/backButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SafeContainer from 'shared/container';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import { LinkingHelper } from 'service/linkingHelper';
import COLORS from 'utils/colors';

import { deleteAccountStyles } from './style';
import { Box } from 'shared/box';
import { isIOS } from 'utils/device';
import { Separator } from 'shared/separator';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, userSelectors } from 'store/entities/user';
import { alert } from 'shared/alert';

interface Props extends StackScreenProps<RootStackParamList> { }

const DeleteAccount: React.FC<Props> = ({ navigation }) => {

  const user = useSelector(userSelectors.user);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => (
        <BackButton title={I18n.t('settings.deleteAccount.title')} />
      ),
    });
  }, [navigation]);

  const goBack = () => navigation.goBack();

  const handleDeleteAccount = () => {
    const confirmDelete = () => dispatch(deleteAccount());
    alert.confirmation({
      message: 'Are you sure you want to delete your account?',
      onConfirm: confirmDelete
    })
  };

  return (
    <>
      <SafeContainer
        safeStyle={deleteAccountStyles.safeArea}
        containerStyle={deleteAccountStyles.container}
      >
        <Box flex ph={15} >
          <Paragraph mt={20} color={COLORS.black70} size='xl' >{'Delete your account'}</Paragraph>
          <View style={deleteAccountStyles.warningContainer}>
            <Box row mt={10} ai={'center'}>
              <MaterialIcons
                size={35}
                style={{ color: COLORS.orangeRed }}
                name={'error'}
              />
              <Paragraph ml={5} type='medium' size='m'>{'This will delete all data, including:'}</Paragraph>
            </Box>
            <Box ai='center' mt={10} row>
              <Paragraph mt={10} color={COLORS.warmGrey} size='xxs' >{'\u2022  '}</Paragraph>
              <Paragraph color={COLORS.warmGrey} type='medium' size='m'>{'All  '}</Paragraph>
              <Paragraph type='medium' size='xs'>{'transactions and related details will be deleted'}</Paragraph>
            </Box>
            <Box ai='center' mt={20} row>
              <Paragraph mt={10} color={COLORS.warmGrey} size='xxs' >{'\u2022  '}</Paragraph>
              <Paragraph color={COLORS.warmGrey} type='medium' size='m'>{'All '}</Paragraph>
              <Paragraph color={COLORS.warmGrey} type='medium' size='m'>{'personal information in your account.'}</Paragraph>
            </Box>
            <Box ai='center' mt={10} row>
              <Paragraph mt={10} color={COLORS.warmGrey} size='xxs' >{'\u2022  '}</Paragraph>
              <Paragraph color={COLORS.warmGrey} type='medium' size='m'>{'All '}</Paragraph>
              <Paragraph color={COLORS.warmGrey} type='medium' size='m'>{'login details for your account.'}</Paragraph>
            </Box>
            <Paragraph mt={30} ml={10} type='bold' size='xxs'>{'Please note this is not reversible and all data will be lost.'}</Paragraph>
          </View>
          {user?.role == "provider" ? (
            <>
              <Paragraph mt={20} color={COLORS.black} size='m' >If you are subscribed through {isIOS ? 'apple' : 'google'}:</Paragraph>
              <Paragraph mt={20} type='medium' color={COLORS.warmGrey} size='m' >
                {`To stop being billed by ${isIOS ? 'apple' : 'google'}, cancel your\n`}
                <Paragraph mt={20} type='medium' color={COLORS.clearBlue50} size='m'>{'Alpha Pro '}</Paragraph>
                <Paragraph mt={20} type='medium' color={COLORS.warmGrey} size='m'>
                  {`subscription from ${isIOS ? 'apple' : 'google'} before\ndeleting your account.`}
                </Paragraph>
              </Paragraph>
              <Pressable onPress={LinkingHelper.subscriptionSettings}>
                <Paragraph mt={20} type='medium' color={COLORS.clearBlue} size='m' >{`Cancel subscription from ${isIOS ? 'apple' : 'google'}`}</Paragraph>
              </Pressable>
            </>
          ) : null}
        </Box>
      </SafeContainer>
      <Separator />
      <View style={deleteAccountStyles.bottomContainer}>
        <Pressable onPress={handleDeleteAccount}>
          <Paragraph type='bold' color={COLORS.orangeRed} size='l' >{'Delete account'}</Paragraph>
        </Pressable>
        <Pressable onPress={goBack}>
          <Paragraph type='bold' color={COLORS.clearBlue} size='l' >{'Cancel'}</Paragraph>
        </Pressable>
      </View>
    </>
  );
};

export { DeleteAccount };