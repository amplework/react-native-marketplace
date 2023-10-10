import React from 'react';
import { Box } from 'shared/box';
import { IMargin } from 'utils/styles';

type Props = IMargin & {
  size: number;
};

const AvatarGroup: React.FC<Props> = ({
  size,
  mh,
  mv,
  mt,
  mr,
  mb,
  ml,
  children,
}) => {
  return (
    <Box row mh={mh} mv={mv} mt={mt} mr={mr} mb={mb} ml={ml}>
      {React.Children.map(children, (child, index) => (
        <Box ml={index ? -size / 2 : 0}>{child}</Box>
      ))}
    </Box>
  );
};

export { AvatarGroup };
