import * as type from 'store/types';

const initialState = {
  client: undefined,
  loading: false,
  error: '',
};

const client = (state = initialState, action: any) => {
  switch (action.type) {
    case type.GET_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case type.GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.client,
      };
    case type.GET_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_CLIENT:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.client,
      };
    case type.UPDATE_CLIENT_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_CLIENT_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_CLIENT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_CLIENT_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_CLIENT_ADDRESS:
      return {
        ...state,
        loading: true,
      };
    case type.UPDATE_CLIENT_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case type.UPDATE_CLIENT_ADDRESS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case type.LOG_OUT:
      return {
        ...state,
        client: undefined,
      };
    default:
      return state;
  }
};

export default client;
