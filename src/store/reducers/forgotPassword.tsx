import * as type from 'store/types';

const initialState = {
  step: 0,
};

const forgotPassword = (state = initialState, action: any) => {
  switch (action.type) {
    case type.CHANGE_STEP_FORGOT_PASSWORD:
      return {
        ...state,
        step: action.action,
      };
    default:
      return state;
  }
};

export default forgotPassword;
