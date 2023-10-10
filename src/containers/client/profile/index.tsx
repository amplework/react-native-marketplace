import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MainPageTemplate } from 'shared/templates';
import UserAvatar from 'shared/userAvatar';
import { getClientProfile } from 'store/actions/client';
import { getIndustries } from 'store/entities/industries';
import { logout, userSelectors } from 'store/entities/user';
import COLORS from 'utils/colors';
import { FIRST_LOGIN, UTC_OFFSET_KEY, UTC_TIMEZONE } from 'utils/constants';
import { Storage } from 'service/localStorage/localStorage';
import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const MyProfile: React.FC<Props> = ({ navigation }) => {
  const client = useSelector((state: any) => state.client.client);
  const user = useSelector(userSelectors.user);
  const loading = useSelector((state: any) => state.client.loading);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const firstLogin = Storage.get(FIRST_LOGIN || '[]');
    firstLogin.then((res) => {
      if (res == null) {
        let userArray = [{ id: user?.id }];
        Storage.save(FIRST_LOGIN, JSON.stringify(userArray));
      } else {
        let parsedArray = JSON.parse(res)
        let newId = { id: user?.id }
        const found = parsedArray.some((el: any) => el.id === user?.id);
        if (found) {
          return;
        } else {
          parsedArray.push(newId)
          Storage.save(FIRST_LOGIN, JSON.stringify(parsedArray));
        }
      }
    });
    await Storage.deleteItem(UTC_OFFSET_KEY)
    await Storage.deleteItem(UTC_TIMEZONE);
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getClientProfile());
    dispatch(getIndustries());
  }, []);

  return (
    <MainPageTemplate
      loading={loading}
      safeStyle={styles.safe}
      bc={COLORS.whiteTwo}
    >
      <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('assets/global/back.png')}
              style={styles.back}
            />
          </TouchableOpacity>
          <View style={styles.userContainer}>
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1} style={styles.name}>{'Hi ' + client?.firstName}</Text>
              <Text numberOfLines={1} style={styles.email}>{client?.email}</Text>
            </View>
            <UserAvatar
              avatar={client?.photo}
              onPress={() => navigation.push('EditProfile')}
              styleAvatar={styles.profileContainer}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerWithButton}>
        <TouchableOpacity
          onPress={() => navigation.push('ClientSettings')}
          style={styles.containerFlex}
        >
          <Text style={styles.titleItemMenu}>Settings</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('HowDoI')}
        >
          <Text style={styles.titleItemMenu}>How do I ?</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('ContactUs')}
        >
          <Text style={styles.titleItemMenu}>Contact Us</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('InviteToAlpha', {
            routeName: 'clientInviteProvider'
          })}
        >
          <Text style={styles.titleItemMenu}>Invite Your Service Providers</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
        <TouchableOpacity
          style={styles.containerFlex}
          onPress={() => navigation.push('InviteToAlpha', {
            routeName: 'clientInviteFriends'
          })}
        >
          <Text style={styles.titleItemMenu}>Share Alpha with a Friend</Text>
          <Image
            source={require('assets/global/arrowRight.png')}
            style={styles.back}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerLogout}>
        <TouchableOpacity
          style={styles.containerPosition}
          onPress={handleLogout}
        >
          <Image
            source={require('assets/global/logout.png')}
            style={styles.logout}
          />
          <Text style={styles.titleItemMenu}>Logout from Alpha</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.logoPosition}>
        <Image
          source={require('assets/global/logoInactive.png')}
          style={styles.logo}
        />
        <Text style={styles.titleLogo}>Alpha Client</Text>
      </View>
    </MainPageTemplate>
  );
};

export default MyProfile;