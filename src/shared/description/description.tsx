import React from 'react';
import { Box } from 'shared/box';
import { Paragraph, ParagraphSize } from 'shared/paragraph';
import { IMargin, IPadding } from 'utils/styles';

const SPACE = 4;

type Props = IMargin &
  IPadding & {
    label: string;
    column?: boolean;
    split?: boolean;
    size?: ParagraphSize;
    flex?: boolean;
    lines?: number;
  };

const Description: React.FC<Props> = ({
  label,
  children,
  column = false,
  split = false,
  size,
  flex = false,
  lines,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  ph,
  pv,
  pt,
  pr,
  pb,
  pl,
}) => {
  const margin = { mh, mv, mt, mr, mb, ml };
  const padding = { ph, pv, pt, pr, pb, pl };

  return (
    <Box
      row={!column}
      jc={split ? 'space-between' : 'flex-start'}
      {...margin}
      {...padding}
    >
      <Paragraph
        size={size}
        type="book"
        mr={column ? 0 : SPACE}
        mb={column ? SPACE : 0}
      >
        {label}
      </Paragraph>
      <Paragraph flex={flex} size={size} lines={lines}>
        {children}
      </Paragraph>
    </Box>
  );
};

export { Description };
