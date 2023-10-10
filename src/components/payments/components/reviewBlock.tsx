import React from 'react';
import { Sign, TwinCounter, TwinCounterBar } from 'shared/counter';

interface Props {
  totalSum: number;
  count: number;
}

const ReviewBlock: React.FC<Props> = ({ totalSum, count }) => (
  <TwinCounter mv={24}>
    <TwinCounterBar label="Total payments value" adornment={<Sign>$</Sign>}>
      {totalSum || 0}
    </TwinCounterBar>
    <TwinCounterBar label="Number of payments">{count || 0}</TwinCounterBar>
  </TwinCounter>
);

export { ReviewBlock };
