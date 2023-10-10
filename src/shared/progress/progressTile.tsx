import React, { ReactChild } from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { IMargin, padding, shadow } from 'utils/styles';

import { CircularProgress } from './circularProgress';
import { progressStyles as S } from './style';

type TileProps = IMargin & {
  progress: number;
  onPress?: () => void;
  loading?: boolean;
  elevation?: boolean;
};

const ProgressTile: React.FC<TileProps> = ({
  progress,
  onPress,
  loading = false,
  children,
  elevation = false,
  mh = 0,
  mv = 0,
  mt = 0,
  mr = 0,
  mb = 0,
  ml = 0,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={!onPress}
    style={[
      S.progressTile,
      {
        marginTop: mv || mt,
        marginRight: mh || mr,
        marginBottom: mv || mb,
        marginLeft: mh || ml,
      },
      onPress ? padding(16, 8, 16, 16) : padding(16, 16),
      elevation ? shadow() : S.border,
    ]}
  >
    {loading ? (
      <Box flex mv={13}>
        <Spin size="l" />
      </Box>
    ) : (
      <>
        <Box flex jc="center" mr={12}>
          {children}
        </Box>
        <Box row jc="center" ai="center">
          <CircularProgress progress={progress} round size={62} />
          {!!onPress && (
            <Icon src={require('assets/global/arrowRight.png')} ml={8} />
          )}
        </Box>
      </>
    )}
  </TouchableOpacity>
);

export { ProgressTile };

type TitleProps = {
  label: string;
  value?: ReactChild;
  mb?: number;
};

const ProgressTileTitle: React.FC<TitleProps> = ({ label, value, mb = 6 }) => (
  <Box row ai="baseline" mb={mb}>
    <Paragraph size="l" type="bold">
      {value}
    </Paragraph>
    <Paragraph flex size="s" type="book" lines={1}>
      {label}
    </Paragraph>
  </Box>
);

export { ProgressTileTitle };

const ProgressTileSubtitle: React.FC<TitleProps> = ({ label, value, mb }) => (
  <Box row ai="baseline" mb={mb}>
    <Paragraph size="s" type="book">
      {label}
    </Paragraph>
    <Paragraph flex size="s" type="book" lines={1}>
      {value}
    </Paragraph>
  </Box>
);

export { ProgressTileSubtitle };
