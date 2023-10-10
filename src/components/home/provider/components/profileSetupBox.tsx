import { t, translations } from 'locales';
import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from 'shared/box';
import Button from 'shared/button';
import { Paragraph } from 'shared/paragraph';
import COLORS from 'utils/colors';
import FONTS from 'utils/fonts';

type Props = {
  onContinue: () => void;
};

const ProfileSetupBox: React.FC<Props> = ({ onContinue }) => {
  const providerProfileStatus: any = useSelector(
    (state: any) => state.provider.profileCompleted,
  );
  const getProfilePercent = () => {
    if (providerProfileStatus == 0) {
      return 10;
    }
    if (providerProfileStatus >= 100) {
      return 100;
    }
    return providerProfileStatus;
  };

  return (
    <Box elevation bc={COLORS.white} mt={20} mh={10} pv={20} r={10}>
      <Box row ph={20} mb={15} ai="center" jc="space-between">
        <Box>
          <Paragraph size="l" color={COLORS.black} type="medium">
            {t(translations.profileSetup.title)}
          </Paragraph>
          <Paragraph size="xs" type="book">
            {t(translations.profileSetup.explore)}
          </Paragraph>
        </Box>
        <Button
          text="Continue"
          onPress={onContinue}
          textStyle={{ fontSize: 12, fontFamily: FONTS.medium }}
          buttonStyle={{ height: 30, width: '25%', padding: 0 }}
        />
      </Box>
      <Box h={7} w={'90%'} r={5} bc={COLORS.clearBlue20} as="center">
        <Box h={7} w={`${getProfilePercent()}%`} r={5} bc={COLORS.clearBlue} />
      </Box>
    </Box>
  );
};

export { ProfileSetupBox };
