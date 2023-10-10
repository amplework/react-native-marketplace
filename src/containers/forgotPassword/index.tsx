import { StackNavigationProp } from '@react-navigation/stack';
import CheckEmail from 'components/forgotFlow/checkEmail';
import CreatePassword from 'components/forgotFlow/createPassword';
import EnterEmail from 'components/forgotFlow/enterEmail';
import SuccessReset from 'components/forgotFlow/successReset';
import ProgressBar from 'components/signupFlow/provider/progressBar';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SafeContainer from 'shared/container';
import {
  changeStep,
  forgotPasswordEmail,
  forgotVerifySecureCode,
  resetPassword,
} from 'store/actions/forgotPassword';

import styles from './style';

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

const ForgotPassword: React.FC<Props> = ({ navigation }) => {
  const { step } = useSelector((state: any) => state.forgotPassword);
  const [email, setEmail] = useState('');
  const [secureCode, setSecureCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const dispatch = useDispatch();
  const getCurrentStep = () => {
    switch (step) {
      case 0:
        return (
          <EnterEmail
            email={email}
            onChangeEmail={(text: string) => setEmail(text)}
            onContinue={() => dispatch(forgotPasswordEmail(email))}
            onBack={() => navigation.goBack()}
          />
        );
      case 1:
        return (
          <CheckEmail
            isWebUser={false}
            onContinue={(code: string) => {
              setSecureCode(code);
              dispatch(forgotVerifySecureCode(email, code));
            }}
            onResend={() => dispatch(forgotPasswordEmail(email))}
          />
        );
      case 2:
        return (
          <CreatePassword
            password={password}
            confirmPassword={confirm}
            onChangePassword={(text: string) => setPassword(text)}
            onChangeConfirmPassword={(text: string) => setConfirm(text)}
            onContinue={() =>
              dispatch(resetPassword({ email, secureCode, password }))
            }
          />
        );
      case 3:
        return (
          <SuccessReset
            onContinue={() => {
              dispatch(changeStep(0));
              navigation.push('Login');
            }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <SafeContainer containerStyle={styles.container}>
      {step > 0 && (
        <ProgressBar
          hideProgress
          step={step - 1}
          onBack={() => dispatch(changeStep(step - 1))}
        />
      )}
      {getCurrentStep()}
    </SafeContainer>
  );
};

export default ForgotPassword;
