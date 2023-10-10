import { GoogleSignin } from '@react-native-google-signin/google-signin';
// @ts-ignore
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { env } from 'config';

GoogleSignin.configure({
  webClientId:
    '907988915089-53bca8ck71jadqoe3imueul3r5pkti6c.apps.googleusercontent.com',
  offlineAccess: true,
  iosClientId:
    '907988915089-d50tuvvdg7fh01f9mle2ibfnjj54vlhd.apps.googleusercontent.com',
});

export const onGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const userInfo = await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    await GoogleSignin.revokeAccess();
    return { ...tokens, ...userInfo?.user };
  } catch (error) {
    return undefined;
  }
};
export const onFacebook = async () => {
  try {
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const token = await AccessToken.getCurrentAccessToken();

    const accountInfo = await fetch(
      'https://graph.facebook.com/v14.0/me?fields=email,name,picture&access_token=' +
      token?.accessToken,
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log('error++++++', error);
      });
    return { ...token, ...accountInfo };
  } catch (error: any) {
    console.log('error social blades ++++++', { ...error });
    return undefined;
  }
};
export const onPressApple = async () => {
  let responseData: any = {};
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  if (!appleAuthRequestResponse.identityToken) {
    throw 'Apple Sign-In failed - no identify token returned';
  }

  const appleData: any = await AsyncStorage.getItem('appleAuth');
  const parsedAppleData = JSON.parse(appleData);

  if (parsedAppleData == null) {
    await AsyncStorage.setItem('appleAuth', JSON.stringify(appleAuthRequestResponse));
    responseData = appleAuthRequestResponse;
  } else if (parsedAppleData?.user !== appleAuthRequestResponse?.user) {
    await AsyncStorage.removeItem('appleAuth');
    await AsyncStorage.setItem('appleAuth', JSON.stringify(appleAuthRequestResponse));
    responseData = appleAuthRequestResponse;
  } else {
    responseData = parsedAppleData;
  }

  const appleAuthResult: any = {
    email: responseData?.email,
    fullName: responseData?.fullName,
    identityToken: responseData?.identityToken,
    user: responseData?.user,
  }

  // console.log("appleAuthResult ======>>>>> ", appleAuthResult);

  return appleAuthResult
}
export const onFacebookIntegration = async () => {
  try {
    await LoginManager.logInWithPermissions(
      [
        'public_profile',
        'email',
        'pages_show_list',
        'pages_manage_posts',
        'pages_read_engagement'
      ]
    );
    const token = await AccessToken.getCurrentAccessToken();
    console.log("token ++++++>>> ", token);

    const pagesInfo = await fetch(
      `https://graph.facebook.com/${token?.userID}/accounts?fields=name,picture,access_token&access_token=${token?.accessToken}`
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        console.log('pagesInfo error++++++', error);
      });

    return pagesInfo;
  } catch (error: any) {
    console.log('error social blades ++++++', { ...error });
    return undefined;
  }
};
export const onInstagramBusinessIntegration = async () => {
  try {
    await LoginManager.logInWithPermissions(
      [
        'public_profile',
        'email',
        'pages_show_list',
        'instagram_basic',
        'pages_read_engagement',
        'instagram_content_publish'
      ]
    );
    const token = await AccessToken.getCurrentAccessToken();
    
    const user_access_token = await fetch(`https://graph.facebook.com/oauth/access_token?grant_type=fb_exchange_token&client_id=${env.FB_CLIENT_ID}&client_secret=${env.FB_CLIENT_SECRET}&fb_exchange_token=${token?.accessToken}`)
    .then((response) => response.json())
    .then((json) => {      
        return json;
      })
      .catch((error) => {
        console.log('pagesInfo error++++++', error);
      });      

    const pagesInfo = await fetch(
      `https://graph.facebook.com/${token?.userID}/accounts?fields=name,picture,access_token,instagram_business_account&access_token=${token?.accessToken}`
    )
    .then((response) => response.json())
    .then((json) => {      
        return json;
      })
      .catch((error) => {
        console.log('pagesInfo error++++++', error);
      });
    
    let details = {
      accessToken: user_access_token?.access_token,
      data: pagesInfo?.data
    }

    return details;
  } catch (error: any) {
    console.log('error social blades ++++++', { ...error });
    return undefined;
  }
};

export const handleFacebookLogout = () => LoginManager.logOut();