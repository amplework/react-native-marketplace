import { StackNavigationProp } from '@react-navigation/stack';
import I18n from 'locales';
import React, { useLayoutEffect, useState } from 'react';
import { Image, LogBox, Text, useWindowDimensions, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { BackButton } from 'shared/backButton';
import Button from 'shared/button';

import styles from './style';

const slides = [
  {
    key: 0,
    title: I18n.t('onBoarding.title1'),
    text: I18n.t('onBoarding.description1'),
    image: require('assets/onBoarding/alpha.png'),
  },
  {
    key: 1,
    title: I18n.t('onBoarding.title2'),
    text: I18n.t('onBoarding.description2'),
    image: require('assets/onBoarding/connection.png'),
  },
  {
    key: 2,
    title: I18n.t('onBoarding.title3'),
    text: I18n.t('onBoarding.description3'),
    image: require('assets/onBoarding/schedule.png'),
  },
  {
    key: 3,
    title: I18n.t('onBoarding.title4'),
    text: I18n.t('onBoarding.description4'),
    image: require('assets/onBoarding/manage.png'),
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

const OnBoarding: React.FC<Props> = ({ navigation }) => {
  LogBox.ignoreAllLogs();
  const [slide, setSlide] = useState(0);
  const width = useWindowDimensions().width;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerLeft: () => <BackButton />,
    });
  }, [navigation]);

  const renderItem = ({ item }: { item: slider }) => {
    return (
      <View key={item.key} style={styles.slide}>
        <Image
          style={[styles.image, { width: width * 0.60, height: width * 0.60 }]}
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
          onPress={() => navigation.push('SignUpProvider')}
          text={I18n.t('onBoarding.getStarted')}
        />
      </View>
    </>
  );
};

export default OnBoarding;
