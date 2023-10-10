import { margin, padding } from 'utils/styles';

export const spacing = {
  m: (value: number) => margin(value, value),
  mv: (marginVertical: number) => ({ marginVertical }),
  mh: (marginHorizontal: number) => ({ marginHorizontal }),
  mt: (marginTop: number) => ({ marginTop }),
  mr: (marginRight: number) => ({ marginRight }),
  mb: (marginBottom: number) => ({ marginBottom }),
  ml: (marginLeft: number) => ({ marginLeft }),

  p: (value: number) => padding(value, value),
  pv: (paddingVertical: number) => ({ paddingVertical }),
  ph: (paddingHorizontal: number) => ({ paddingHorizontal }),
  pt: (paddingTop: number) => ({ paddingTop }),
  pr: (paddingRight: number) => ({ paddingRight }),
  pb: (paddingBottom: number) => ({ paddingBottom }),
  pl: (paddingLeft: number) => ({ paddingLeft }),
};
