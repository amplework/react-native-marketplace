import { PERIODS } from 'components/home/helpers/constants';
import { translations } from 'locales';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, BottomSheetHeader } from 'shared/bottomSheet';
import { Box } from 'shared/box';
import { Icon } from 'shared/icon';
import { Paragraph } from 'shared/paragraph';
import { Pressable } from 'shared/pressable';
import {
  closePeriodModal,
  homeSelectors,
  selectHomePeriod,
} from 'store/entities/home';
import COLORS from 'utils/colors';
import { LargeDateRange } from 'utils/dates';

const PeriodSheet: React.FC = () => {
  const selectedPeriod = useSelector(homeSelectors.period);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const closeModal = () => dispatch(closePeriodModal());

  const handlePress = (period: LargeDateRange) => () => {
    dispatch(selectHomePeriod(period));
    closeModal();
  };

  return (
    <BottomSheet size="xs">
      <BottomSheetHeader onClose={closeModal} />
      <Box ph={32} pv={32}>
        {PERIODS.map((period, index) => {
          const active = selectedPeriod === period;
          const last = index === PERIODS.length - 1;

          return (
            <Pressable
              key={period}
              onPress={handlePress(period)}
              row
              ai="center"
              mb={last ? 0 : 14}
            >
              {active && (
                <Icon src={require('assets/global/oval.png')} size={8} mr={8} />
              )}
              <Paragraph color={active ? COLORS.orange : COLORS.black}>
                {t(translations.home.review.periods[period])}
              </Paragraph>
            </Pressable>
          );
        })}
      </Box>
    </BottomSheet>
  );
};

export { PeriodSheet };
