import { SVGComponent } from 'shared/icon/icons';

export type NavigationLink = {
  Icon?: SVGComponent;
  title: string;
  route: string;
  params?: any;
};
