import React, { useState, useEffect } from 'react';
import { Platform, UIManager, LayoutAnimation, TouchableOpacity } from 'react-native';
import { Question } from './question';
import { Answer } from './answers';

interface Props {
  data: any;
  title: string
}

const Accordian: React.FC<Props> = ({ data, title }) => {
  const [state, setState] = useState({
    data: data,
    expanded: false,
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setState((prev) => ({ ...prev, expanded: !state.expanded }))
  }

  return (
    <>
      <TouchableOpacity onPress={() => toggleExpand()}>
        <Question data={title} isActive={state.expanded} />
      </TouchableOpacity>
      {state.expanded && <Answer data={data} />}
    </>
  )
}

export { Accordian }