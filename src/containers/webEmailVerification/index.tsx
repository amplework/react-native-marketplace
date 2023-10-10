import SafeContainer from 'shared/container';
import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'index';
import CheckEmail from 'components/forgotFlow/checkEmail';
import { useDispatch } from 'react-redux';
import { verifyWebUser, resendCodeWebUser } from 'store/entities/user/slice';

import styles from './style';

type Props = StackScreenProps<RootStackParamList>;

const WebEmailVerification: React.FC<Props> = ({ route, navigation }) => {

  const dispatch = useDispatch();
  const { email }: any = route?.params;

  let password = 'Ample@123';

  const resendCode = () => {
    dispatch(resendCodeWebUser({ email, password }));
  }

  return (
    <SafeContainer containerStyle={styles.container}>
      <CheckEmail
        onContinue={(secureCode: string) => {
          dispatch(verifyWebUser({email, secureCode}));
        }}
        onResend={resendCode}
        isWebUser={true}
        backToLogin={() => navigation.goBack()}
      />
    </SafeContainer>
  );
}

export default WebEmailVerification;