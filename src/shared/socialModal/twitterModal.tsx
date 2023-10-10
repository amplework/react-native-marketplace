import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { WebView } from 'react-native-webview'
import { BottomSheet } from 'shared/bottomSheet';
import { Icon } from 'shared/icon';


import { styles } from './style';
import { getTwitterAuth, isModalOpened } from 'store/entities/social';
import { Loader } from 'shared/loader';
import { toast } from 'shared/toast';

const TwitterModal: React.FC<any> = () => {
  const twitterToken = useSelector((state: any) => state.social.oOathToken);
  const loading = useSelector((state: any) => state.social.loading);
  const dispatch = useDispatch();  

  const closeModal = () => dispatch(isModalOpened({ isVisible: false }));

  const onNavigationStateChange = (navState: any, oathVerifier: string, oathToken: any) => {
    const isTokenFound = (oathToken == twitterToken);
    
    if (isTokenFound && navState?.url?.includes(oathVerifier)) {
      const splittedUrl = navState?.url?.split('&');
      const verifier = splittedUrl[1].substring(splittedUrl[1].indexOf('=') + 1);
      
      if (verifier) {
        dispatch(getTwitterAuth({
          oauthToken: twitterToken,
          oauthVerifier: verifier,
        }));
        setTimeout(function () {
          closeModal();
        }, 1000);
      } else {
        toast.info('twitter authorization failed.')
      }
    }
  }

  return (
    <BottomSheet size='m'>
      <Loader loading={loading} />
      <View style={styles.header}>
        <Text style={styles.headerText}>
          <Ionicons
            size={16}
            name={'logo-twitter'}
          /> {'Twitter Integration Setup'}
        </Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon src={require('assets/global/close.png')} />
        </TouchableOpacity>
      </View>
      <WebView
        startInLoadingState
        renderLoading={() => <Loader loading />}
        onNavigationStateChange={(navState: any) => onNavigationStateChange(navState, 'oauth_verifier', twitterToken)}
        source={{ uri: `https://api.twitter.com/oauth/authorize?oauth_token=${twitterToken}` }}
      />
    </BottomSheet>
  );
};

export { TwitterModal };