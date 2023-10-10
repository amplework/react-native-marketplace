import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Icon } from 'shared/icon';
import COLORS from 'utils/colors';

import { getConfiguredIcon } from '../../helpers/utils';
import { bottomMenuStyles as S } from '../../style';
import { LabeledIcon } from '../labeledIcon';

type Props = {
  configuredMenuItem?: string;
};

const BottomMenuStrip: React.FC<Props> = ({ configuredMenuItem = 'sales' }) => {
  const { t } = useTranslation();

  const ConfiguredIcon = getConfiguredIcon(configuredMenuItem);

  return (
    <View style={S.menuStrip}>
      <LabeledIcon
        src={require('assets/bottomBar/home.png')}
        label={t(translations.common.home)}
      />
      <LabeledIcon
        src={require('assets/bottomBar/calendar.png')}
        label={t(translations.common.calendar)}
      />
      <View style={S.containerBlue}>
        <View style={S.buttonBlue}>
          <Icon src={require('assets/global/plusPlus.png')} />
        </View>
      </View>
      <LabeledIcon
        label={
          configuredMenuItem === 'cashJournals'
            ? t(translations.common.labels.cash)
            //@ts-ignore
            : t(translations.common.entities[configuredMenuItem])
        }
        color={COLORS.clearBlue}
      >
        <ConfiguredIcon width={20} height={20} color={COLORS.clearBlue} />
      </LabeledIcon>
      <LabeledIcon
        src={require('assets/bottomBar/more.png')}
        label={t(translations.common.more)}
      />
    </View>
  );
};

export { BottomMenuStrip };
