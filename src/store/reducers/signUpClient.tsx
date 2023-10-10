import * as type from 'store/types';

const initialState = {
  step: 0,
  loading: false,
  social: false,
  accessTokenFacebook: false,
  accessTokenGoogle: false,
  appleId: false,
  emailUser: '',
  firstNameUser: '',
  lastNameUser: '',
  avatarUser: '',
};

const signUpClient = (state = initialState, action: any) => {

  switch (action.type) {
    case type.CHANGE_STEP_CLIENT:
      return {
        ...state,
        step: action.action,
        social: action.action === 0 ? false : state.social,
        accessTokenFacebook:
          action.action === 0 ? false : state.accessTokenFacebook,
        accessTokenGoogle:
          action.action === 0 ? false : state.accessTokenGoogle,
        emailUser: '',
        firstNameUser: '',
        lastNameUser: '',
        avatarUser: '',
      };
    case type.SIGN_UP_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case type.SIGN_UP_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.SIGN_UP_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.SIGN_UP_CLIENT_FACEBOOK_SUCCESS:
      return {
        ...state,
        step: 2,
        social: true,
        accessTokenFacebook: action.accessToken,
        accessTokenGoogle: '',
        emailUser: action.email,
        firstNameUser: action.firstName,
        lastNameUser: action.lastName,
        avatarUser: action.avatar,
      };
    case type.SIGN_UP_CLIENT_GOOGLE_SUCCESS:
      return {
        ...state,
        step: 2,
        social: true,
        accessTokenGoogle: action.accessToken,
        accessTokenFacebook: '',
        emailUser: action.email,
        firstNameUser: action.firstName,
        lastNameUser: action.lastName,
        avatarUser: action.avatar,
      };
    case type.SIGN_UP_CLIENT_APPLE_SUCCESS:
      return {
        ...state,
        step: 2,
        social: true,
        appleId: action.accessToken,
        accessTokenFacebook: '',
        accessTokenGoogle: '',
        emailUser: action.email,
        firstNameUser: action.firstName,
        lastNameUser: action.lastName,
        avatarUser: action.avatar,
      };
    default:
      return state;
  }
};

export default signUpClient;
