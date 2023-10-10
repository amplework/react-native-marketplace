import React from 'react';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';

interface Props {
  active?: boolean;
  ml?: number
}

const DateLabel: React.FC<Props> = ({ active = false, children, ml }) => (
  <>
    <Paragraph ml={ml ? ml : 0} >{children}</Paragraph>
    <Icon
      src={
        active
          ? require('assets/global/arrowUp.png')
          : require('assets/global/arrowDown.png')
      }
      ml={4}
    />
  </>
);

export { DateLabel };
