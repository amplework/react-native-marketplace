import COLORS from './colors';

export const padding = (top = 0, right = 0, bottom = top, left = right) => ({
  paddingTop: top,
  paddingRight: right,
  paddingBottom: bottom,
  paddingLeft: left,
});

export const margin = (top = 0, right = 0, bottom = top, left = right) => ({
  marginTop: top,
  marginRight: right,
  marginBottom: bottom,
  marginLeft: left,
});

export const shadow = () => ({
  shadowColor: COLORS.black,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 5,
});

export interface IMargin {
  mh?: number;
  mv?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  bg?: any;
  color?: any;
}

export interface IPadding {
  ph?: number;
  pv?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
}

type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';

type AlignSelf = 'auto' | 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'stretch';

export interface IFlexible {
  flex?: boolean;
  row?: boolean;
  wrap?: boolean;
  jc?: JustifyContent;
  ai?: AlignItems;
  as?: AlignSelf;
}
