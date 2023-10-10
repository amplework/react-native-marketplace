import React from 'react';
import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  StatusBar,
} from 'react-native';


const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;

const SCROLL_EVENT_THROTTLE = 16;
const DEFAULT_HEADER_MAX_HEIGHT = 170;
const DEFAULT_HEADER_MIN_HEIGHT = NAV_BAR_HEIGHT;
const DEFAULT_EXTRA_SCROLL_HEIGHT = 30;
const DEFAULT_BACKGROUND_IMAGE_SCALE = 1.5;

const DEFAULT_NAVBAR_COLOR = '#3498db';
const DEFAULT_BACKGROUND_COLOR = '#303F9F';
const DEFAULT_TITLE_COLOR = 'white';

export type Props = {
  renderNavBar?: any;
  renderContent?: any;
  backgroundColor?: string;
  backgroundImage?: any;
  navbarColor?: string;
  title?: any;
  titleStyle?: any;
  headerTitleStyle?: any;
  headerMaxHeight?: number;
  headerMinHeight?: number;
  scrollEventThrottle?: number;
  extraScrollHeight?: number;
  backgroundImageScale?: number;
  contentContainerStyle?: any;
  innerContainerStyle?: any;
  scrollViewStyle?: any;
  containerStyle?: any;
  alwaysShowTitle?: boolean;
  alwaysShowNavBar?: boolean;
  statusBarColor?: string;
  scrollViewProps?: object;
  scrollY?: any;
};

const RNParallaxHeader: React.FC<Props> = ({
  renderContent,
  renderNavBar = () => <View />,
  navbarColor = DEFAULT_NAVBAR_COLOR,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
  backgroundImage = null,
  title = null,
  titleStyle = styles.headerText,
  headerTitleStyle = null,
  headerMaxHeight = DEFAULT_HEADER_MAX_HEIGHT,
  headerMinHeight = DEFAULT_HEADER_MIN_HEIGHT,
  scrollEventThrottle = SCROLL_EVENT_THROTTLE,
  extraScrollHeight = DEFAULT_EXTRA_SCROLL_HEIGHT,
  backgroundImageScale = DEFAULT_BACKGROUND_IMAGE_SCALE,
  contentContainerStyle = null,
  innerContainerStyle = null,
  scrollViewStyle = null,
  containerStyle = null,
  alwaysShowTitle = true,
  alwaysShowNavBar = true,
  statusBarColor = null,
  scrollViewProps = {},
  scrollY
}) => {
  // const scrollY = useRef(new Animated.Value(0));

  function getHeaderMaxHeight() {
    return headerMaxHeight;
  }

  function getHeaderMinHeight() {
    return headerMinHeight;
  }

  function getHeaderScrollDistance() {
    return getHeaderMaxHeight() - getHeaderMinHeight();
  }

  function getExtraScrollHeight() {
    return extraScrollHeight;
  }

  function getBackgroundImageScale() {
    return backgroundImageScale;
  }

  function getInputRange() {
    return [-(getExtraScrollHeight()), 0, getHeaderScrollDistance()];
  }

  function getHeaderHeight() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [
        getHeaderMaxHeight() + getExtraScrollHeight(),
        getHeaderMaxHeight(),
        getHeaderMinHeight(),
      ],
      extrapolate: 'clamp',
    });
  }

  function getNavBarOpacity() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [0, 1, 1],
      extrapolate: 'clamp',
    });
  }

  function getNavBarHeight() {
    return scrollY.current.interpolate({
      inputRange: [0, 10, 20, 30, 40, 50],
      outputRange: [0, 20, 50, 75, 100, headerMinHeight],
      // extrapolateLeft: 'identity',s
      extrapolate: 'clamp',
    });
  }

  function getNavBarForegroundOpacity() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [alwaysShowNavBar ? 1 : 0, alwaysShowNavBar ? 1 : 0, 1],
      extrapolate: 'clamp',
    });
  }

  function getImageOpacity() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  function getImageTranslate() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [0, 0, -50],
      extrapolate: 'clamp',
    });
  }

  function getImageScale() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [getBackgroundImageScale(), 1, 1],
      extrapolate: 'clamp',
    });
  }

  function getTitleTranslateY() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [5, 0, 0],
      extrapolate: 'clamp',
    });
  }

  function getTitleOpacity() {
    return scrollY.current.interpolate({
      inputRange: getInputRange(),
      outputRange: [1, 1, alwaysShowTitle ? 1 : 0],
      extrapolate: 'clamp',
    });
  }

  function renderBackgroundImage() {
    const imageOpacity = getImageOpacity();
    const imageTranslate = getImageTranslate();
    const imageScale = getImageScale();

    return (
      <Animated.Image
        style={[
          styles.backgroundImage,
          {
            height: getHeaderMaxHeight(),
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }, { scale: imageScale }],
          },
        ]}
        source={backgroundImage}
      />
    );
  }

  function renderPlainBackground() {
    const imageOpacity = getImageOpacity();
    const imageTranslate = getImageTranslate();
    const imageScale = getImageScale();

    return (
      <Animated.View
        style={{
          height: getHeaderMaxHeight(),
          backgroundColor,
          opacity: imageOpacity,
          transform: [{ translateY: imageTranslate }, { scale: imageScale }],
        }}
      />
    );
  }

  function renderNavbarBackground() {
    const navBarOpacity = getNavBarOpacity();
    const navBarHeight = getNavBarHeight()
    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: navBarHeight,
            backgroundColor: navbarColor,
            opacity: navBarOpacity,
          },
        ]}
      />
    );
  }

  function renderHeaderBackground() {
    const imageOpacity = getImageOpacity();
    return (
      <Animated.View
        style={[
          styles.header,
          {
            height: getHeaderHeight(),
            opacity: imageOpacity,
            backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
          },
        ]}>
        {backgroundImage && renderBackgroundImage()}
        {!backgroundImage && renderPlainBackground()}
      </Animated.View>
    );
  }

  function renderHeaderTitle() {
    const titleTranslateY = getTitleTranslateY();
    const titleOpacity = getTitleOpacity();

    return (
      <Animated.View
        style={[
          styles.headerTitle,
          {
            transform: [{ translateY: titleTranslateY }],
            height: getHeaderHeight(),
            opacity: titleOpacity,
          },
          headerTitleStyle,
        ]}>
        {typeof title === 'string' && (
          <Text style={[styles.headerText, titleStyle]}>{title}</Text>
        )}
        {typeof title !== 'string' && title}
      </Animated.View>
    );
  }

  function renderHeaderForeground() {
    const navBarOpacity = getNavBarForegroundOpacity();
    const navBarHeight = getNavBarHeight();
    return (
      <Animated.View
        style={[
          styles.bar,
          {
            height: navBarHeight,
            opacity: navBarOpacity,
          },
        ]}>
        {renderNavBar()}
      </Animated.View>
    );
  }

  function renderScrollView() {
    const { onScroll }: any = scrollViewProps;
    // remove scrollViewProps.onScroll in renderScrollViewProps so we can still get default scroll behavior
    // if a caller passes in `onScroll` prop
    const renderableScrollViewProps: any = Object.assign({}, scrollViewProps);
    delete renderableScrollViewProps.onScroll;

    return (
      <Animated.ScrollView
        style={[styles.scrollView, scrollViewStyle]}
        contentContainerStyle={contentContainerStyle}
        scrollEventThrottle={scrollEventThrottle}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
          {
            useNativeDriver: false,
            listener: onScroll,
          },
        )}
        {...renderableScrollViewProps}>
        <View
          style={[{ marginTop: getHeaderMaxHeight() }, innerContainerStyle]}>
          {renderContent()}
        </View>
      </Animated.ScrollView>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <StatusBar backgroundColor={statusBarColor || navbarColor} />
      {renderScrollView()}
      {renderNavbarBackground()}
      {renderHeaderBackground()}
      {renderHeaderTitle()}
      {renderHeaderForeground()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: DEFAULT_NAVBAR_COLOR,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: 0,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    height: DEFAULT_HEADER_MIN_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: STATUS_BAR_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: DEFAULT_TITLE_COLOR,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RNParallaxHeader;