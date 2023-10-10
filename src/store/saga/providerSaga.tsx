import { ProfileApi, ProfileProviderApi } from 'api/profile';
import { UserApi } from 'api/user';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Navigator } from 'service/navigator';
import { toast } from 'shared/toast';
import { setBottomMenuSettings } from 'store/entities/bottomMenu';
import { isFacebookIntegrated, isInstagramIntegrated, isTwitterIntegrated } from 'store/entities/social';
import { updateTimezone, updateUserDetails } from 'store/entities/user';

function* providerProfile() {
  try {
    const { data } = yield call(ProfileProviderApi.getProfile);
    if (data?.twiOauthToken) {
      yield put(isTwitterIntegrated(true));
    } else {
      yield put(isTwitterIntegrated(false));
    }

    if (data?.instagramBusinessId) {
      yield put(isInstagramIntegrated(true));
    } else {
      yield put(isInstagramIntegrated(false));
    }

    if (data?.fbSocialToken) {
      yield put(isFacebookIntegrated(true));
    } else {
      yield put(isFacebookIntegrated(false));
    }

    if (data?.settings) {
      yield put(setBottomMenuSettings(data.settings));
    }

    yield put({ type: 'GET_PROVIDER_SUCCESS', provider: data });
  } catch (error: any) {
    yield put({ type: 'GET_PROVIDER_FAILED' });
    // toast.info(error.message);
  }
}

function* updateProviderProfile(action: any) {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateProfile,
      action.action,
    );

    yield put(updateTimezone(data.utcOffset));
    yield put({ type: 'UPDATE_PROVIDER_SUCCESS', provider: data });
    if(action?.goBack) {
      Navigator.goBack();
    }
    toast.info('Profile updated successfully');
  } catch (error: any) {

    yield put({ type: 'UPDATE_PROVIDER_FAILED' });
    toast.info(error.message);
  }
}

function* updateProviderProfileStatus(action: any) {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateTwitterDetails,
      action.action,
    );    
    yield put({ type: 'UPDATE_PROVIDER_PROFILE_STATUS_SUCCESS', provider: data });

  } catch (error: any) {
    console.log("error respomse  == == = == =>> ", error);
    yield put({ type: 'UPDATE_PROVIDER_PROFILE_STATUS_FAILED' });
    toast.info(error.message);
  }
}

function* updateProviderDetails(action: any) {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateTwitterDetails,
      action.action,
    );

    yield put(updateTimezone(data.utcOffset));
    yield put({ type: 'UPDATE_PROVIDER_DETAILS_SUCCESS', provider: data });
    if(action?.goBack) {
      Navigator.goBack();
    }
    toast.info('Profile updated successfully');
  } catch (error: any) {

    yield put({ type: 'UPDATE_PROVIDER_DETAILS_FAILED' });
    toast.info(error.message);
  }
}

function* updateProviderTwitter(action: any): any {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateTwitterDetails,
      action.action,
    );

    yield put({ type: 'UPDATE_PROVIDER_TWITTER_SUCCESS', provider: data });

    if (action.action.disable) {
      const { data } = yield call(UserApi.getUser);
      yield put(updateUserDetails(data));
      toast.info('Your twitter account is disabled.');
    } else {
      const { data } = yield call(UserApi.getUser);
      yield put(updateUserDetails(data));
      toast.info('Your twitter account is integrated successfully.');
    }

  } catch (error: any) {

    yield put({ type: 'UPDATE_PROVIDER_TWITTER_FAILURE' });
    toast.info(error.message);
  }
}

function* updateProviderFacebook(action: any): any {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateTwitterDetails,
      action.action,
    );

    yield put({ type: 'UPDATE_PROVIDER_FACEBOOK_SUCCESS', provider: data });

    if (action.action.disable) {
      const { data } = yield call(UserApi.getUser);
      yield put(updateUserDetails(data));
      toast.info('Your facebook page account is disabled.');
    } else {
      const { data } = yield call(UserApi.getUser);
      yield put(updateUserDetails(data));
      toast.info('Your facebook page is integrated successfully.');
    }

  } catch (error: any) {

    yield put({ type: 'UPDATE_PROVIDER_FACEBOOK_FAILURE' });
    toast.info(error.message);
  }
}

function* updateProviderInstagram(action: any): any {
  try {
    const { data } = yield call(
      ProfileProviderApi.updateTwitterDetails,
      action.action,
    );

    yield put({ type: 'UPDATE_PROVIDER_INSTAGRAM_SUCCESS', provider: data });

    if (action.action.disable) {
      const { data } = yield call(UserApi.getUser);
      yield put(updateUserDetails(data));
      toast.info('Your instagram business account is disabled.');
    } else {
      const { data } = yield call(UserApi.getUser);
      yield put(isInstagramIntegrated(true));
      yield put(updateUserDetails(data));
      toast.info('Your instagram business page is integrated successfully.');
    }

  } catch (error: any) {

    yield put({ type: 'UPDATE_PROVIDER_INSTAGRAM_FAILURE' });
    toast.info(error.message);
  }
}

function* isMoreDetails(action: any) {
  try {
    const { data } = action.action;
    yield put({ type: 'UPDATE_MORE_DETAILS', data: data });
  } catch (error) {
    console.log(error);
  }
}

function* updateProviderPassword(action: any) {
  try {
    const { navigation, data } = action.action;

    const { status } = yield call(ProfileApi.updatePassword, data);

    if (status === 204) {
      toast.info('Password updated successfully');
      navigation.goBack();
    }
    yield put({ type: 'UPDATE_PROVIDER_PASSWORD_SUCCESS' });
  } catch (error: any) {
    yield put({ type: 'UPDATE_PROVIDER_PASSWORD_FAILED' });
    toast.info(error.message);
  }
}

function* providerSaga() {
  // @ts-ignore
  yield takeEvery('MORE_DETAILS', isMoreDetails);
  yield takeEvery('GET_PROVIDER', providerProfile);
  yield takeEvery('UPDATE_PROVIDER', updateProviderProfile);
  yield takeEvery('UPDATE_PROVIDER_PROFILE_STATUS', updateProviderProfileStatus);
  yield takeEvery('UPDATE_PROVIDER_DETAILS', updateProviderDetails);
  yield takeEvery('UPDATE_PROVIDER_PASSWORD', updateProviderPassword);
  yield takeEvery('UPDATE_PROVIDER_TWITTER', updateProviderTwitter);
  yield takeEvery('UPDATE_PROVIDER_FACEBOOK', updateProviderFacebook);
  yield takeEvery('UPDATE_PROVIDER_INSTAGRAM', updateProviderInstagram);
}

export default providerSaga;
