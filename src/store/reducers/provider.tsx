import * as type from 'store/types';

const initialState = {
  provider: undefined,
  loading: false,
  profileCompleted: 100,
  isMoreDetails: false,
  error: '',
  profileInstructionsCount: 0,
};

const provider = (state = initialState, action: any) => {
  switch (action.type) {
    case type.GET_PROVIDER:
      return {
        ...state,
        loading: true,
      };
    case type.MORE_DETAILS:
      return {
        ...state,
        isMoreDetails: true,
      };
    case type.UPDATE_MORE_DETAILS:
      return {
        ...state,
        isMoreDetails: action.data
      };
    case type.GET_PROVIDER_SUCCESS:
      const isProfileDone = action.provider?.isProfileCompleted
      return {
        ...state,
        loading: false,
        provider: action.provider,
        profileInstructionsCount: isProfileDone ? 0 : state.profileInstructionsCount + 1
      };
    case type.CLOSE_PROFILE_COMPLETE_MODAL:
      return {
        ...state,
        profileInstructionsCount: 3,
      };
    case type.GET_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_DETAILS:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROFILE_COMPLETE_STATUS:
      return {
        ...state,
        profileCompleted: action.action,
      };
    case type.UPDATE_PROVIDER_DETAILS_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_TWITTER:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_TWITTER_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_TWITTER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_FACEBOOK:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_FACEBOOK_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_FACEBOOK_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_INSTAGRAM:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_INSTAGRAM_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_INSTAGRAM_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_PROVIDER_PROFILE_STATUS:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_PROVIDER_PROFILE_STATUS_SUCCESS:
      return {
        ...state,
        provider: action.provider,
        loading: false,
      };
    case type.UPDATE_PROVIDER_PROFILE_STATUS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.LOG_OUT:
      return {
        ...state,
        provider: undefined,
      };
    default:
      return state;
  }
};

export default provider;
