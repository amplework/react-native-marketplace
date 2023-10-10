import React from 'react';
import { Text } from 'react-native';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';
import { IMargin } from 'utils/styles';

export type ParagraphSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

type Type = 'book' | 'medium' | 'bold';

interface Props extends IMargin {
  flex?: boolean;
  flexWrap?: string;
  flexShrink?: number;
  size?: ParagraphSize;
  type?: Type;
  color?: string;
  lines?: number;
  centered?: boolean;
  italic?: boolean;
  capitalize?: boolean;
  lt?: boolean;
  extraStyle?: any;
}

const Paragraph: React.FC<Props> = ({
  flex = false,
  size = 'm',
  type = 'medium',
  color,
  lines,
  flexShrink,
  flexWrap,
  centered = false,
  italic = false,
  capitalize = false,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
  lt,
  children,
  extraStyle
}) => (
  <Text
    numberOfLines={lines}
    ellipsizeMode="tail"
    allowFontScaling={false}
    //@ts-ignore
    style={{
      flex: flex ? 1 : undefined,
      flexShrink: flexShrink,
      flexWrap: flexWrap,
      fontSize: getFontSize(size),
      lineHeight: getLineHeight(size),
      fontFamily: italic ? getItalicFont(type) : getFont(type),
      color: color || getColor(type),
      textAlign: centered ? 'center' : 'justify',
      textTransform: capitalize ? 'capitalize' : 'none',
      marginTop: mv || mt,
      marginRight: mh || mr,
      marginBottom: mv || mb,
      marginLeft: mh || ml,
      textDecorationLine: lt ? 'line-through' : 'none',
      extraStyle: { extraStyle }
    }}

  >
    {children}
  </Text>
);

export { Paragraph };

const getFontSize = (size: ParagraphSize) => {
  switch (size) {
    case 'xxs':
      return 10;
    case 'xs':
      return 12;
    case 's':
      return 14;
    case 'm':
      return 16;
    case 'l':
      return 18;
    case 'xl':
      return 24;
    case 'xxl':
      return 32;
  }
};

const getLineHeight = (size: ParagraphSize) => {
  switch (size) {
    case 'xs':
      return 18;
    case 's':
      return 20;
    case 'm':
      return 24;
    case 'l':
      return 26;
    case 'xl':
      return 32;
    case 'xxl':
      return 32;
  }
};

const getColor = (type: Type) => {
  switch (type) {
    case 'book':
      return COLORS.brownishGrey;
    case 'medium':
      return COLORS.black;
    case 'bold':
      return COLORS.black;
  }
};

const getFont = (type: Type) => {
  switch (type) {
    case 'book':
      return FONTS.book;
    case 'medium':
      return FONTS.medium;
    case 'bold':
      return FONTS.bold;
  }
};

const getItalicFont = (type: Type) => {
  switch (type) {
    case 'book':
      return FONTS.bookItalic;
    case 'medium':
      return FONTS.mediumItalic;
    case 'bold':
      return FONTS.boldItalic;
  }
};
