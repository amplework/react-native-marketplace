import React from 'react';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';

interface Props {
  totalSum: number;
  count: number;
}

const ReviewBlock: React.FC<Props> = (props) => {
  const { totalSum, count } = props;

  return (
    <TwinCounter mv={24}>
      <TwinCounterBar label="Total sales value" adornment={<Sign>$</Sign>}>
        {totalSum || 0}
      </TwinCounterBar>
      <TwinCounterBar label="Number of sales">{count || 0}</TwinCounterBar>
    </TwinCounter>
  );
};

export { ReviewBlock };
