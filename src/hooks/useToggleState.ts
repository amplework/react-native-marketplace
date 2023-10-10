import { useCallback, useState } from 'react';

export const useToggleState = (initialState: boolean | (() => boolean)) => {
  const [state, setState] = useState(initialState);

  const toggleState = useCallback(
    () => setState((prevState) => !prevState),
    [],
  );

  return [state, toggleState] as const;
};
