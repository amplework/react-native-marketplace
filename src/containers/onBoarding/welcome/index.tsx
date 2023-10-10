import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useState } from 'react';
import {
  Image,
  LogBox,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from 'shared/button';

import styles from './style';

const slides = [
  {
    key: 0,
    title: 'One app for both service providers and clients',
    text: 'Connect and grow',
    image: require('assets/onBoarding/alpha.png'),
  },
  {
    key: 1,
    title: 'Turn your skill into a business',
    text: 'Manage your clients, your time and your money',
    image: require('assets/onBoarding/alpha.png'),
  },
  {
    key: 2,
    title: 'Connect to your service provider',
    text: 'Schedule your own appointments and more',
    image: require('assets/onBoarding/alpha.png'),
  },
];

export interface Props {
  navigation: StackNavigationProp<any, any>;
}

type slider = {
  key: number;
  title: string;
  text: string;
  image: any;
};

const WelcomeOnBoarding: React.FC<Props> = ({ navigation }) => {
  LogBox.ignoreAllLogs();
  const width = useWindowDimensions().width;
  const [slide, setSlide] = useState(0);
  const renderItem = ({ item }: { item: slider }) => {
    return (
      <View key={item.key} style={styles.slide}>
        <Image
          style={[styles.image, { width: width * 0.5, height: width * 0.5 }]}
          source={item.image}
        />
        <View style={styles.positionIndicators}>
          {slides.map((i: slider) => (
            <View
              key={i.key}
              style={[styles.circle, slide === i.key && styles.circleLong]}
            />
          ))}
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.text}</Text>
      </View>
    );
  };
  const renderPagination = (activeIndex: number) => {
    setSlide(activeIndex);
    return null;
  };
  return (
    <>
      <AppIntroSlider
        keyExtractor={(item, index: number) => index.toString()}
        renderItem={renderItem}
        data={slides}
        renderPagination={renderPagination}
      />
      <View style={styles.positionGetStarted}>
        <Button
          buttonStyle={styles.styleButton}
          onPress={() => navigation.push('ChooseRole')}
          text={'Sign Up'}
        />
        <View style={styles.rowNewUser}>
          <Text style={styles.getStartTitle}>
            {I18n.t('onBoardingClient.alreadyUser')}
          </Text>
          <TouchableOpacity onPress={() => navigation.push('Login')}>
            <Text style={[styles.getStartTitle, styles.getStartActive]}>
              {I18n.t('onBoardingClient.signIn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default WelcomeOnBoarding;
