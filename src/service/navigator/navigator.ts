import {
  DrawerActions,
  NavigationContainerRef,
} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { createRef } from 'react';

export type Params = Record<string, any>;

const navigationRef = createRef<NavigationContainerRef>();

const open = () => navigationRef.current?.dispatch(DrawerActions.openDrawer());

const close = () =>
  navigationRef.current?.dispatch(DrawerActions.closeDrawer());

const navigate = (name: string, params?: Params) =>
  navigationRef.current?.navigate(name, params);

const goBack = () => navigationRef.current?.goBack();

const reset = (name: string) =>
  navigationRef.current?.reset({
    routes: [{ name }],
  });

const replace = (name: string, params?: Params) =>
  navigationRef.current?.dispatch(StackActions.replace(name, params));

const push = (name: string, params?: Params) =>
  navigationRef.current?.dispatch(StackActions.push(name, params));

export const Navigator = {
  navigate,
  goBack,
  reset,
  navigationRef,
  drawer: {
    open,
    close,
  },
  stack: {
    replace,
    push,
  },
};
