import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface Props {
  onChange?: (status: AppStateStatus) => void;
  onForeground?: () => void;
  onBackground?: () => void;
}

export const useAppStateEvent = ({
  onChange,
  onForeground,
  onBackground,
}: Props = {}) => {
  const appState = useRef(AppState.currentState);

  const savedOnChange = useRef(onChange);
  const savedOnForeground = useRef(onForeground);
  const savedOnBackground = useRef(onBackground);

  useEffect(() => {
    savedOnChange.current = onChange;
  }, [onChange]);

  useEffect(() => {
    savedOnForeground.current = onForeground;
  }, [onForeground]);

  useEffect(() => {
    savedOnBackground.current = onBackground;
  }, [onBackground]);

  useEffect(() => {
    const listener = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && savedOnForeground.current) {
        savedOnForeground.current();
      }

      if (
        appState.current === 'active' &&
        savedOnBackground.current &&
        nextAppState.match(/inactive|background/)
      ) {
        savedOnBackground.current();
      }

      if (savedOnChange.current) {
        savedOnChange.current(nextAppState);
      }

      appState.current = nextAppState;
    };

    AppState.addEventListener('change', listener);

    return () => {
      AppState.removeEventListener('change', listener);
    };
  }, []);
};
