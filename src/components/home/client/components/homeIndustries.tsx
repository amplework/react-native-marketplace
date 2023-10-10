import { useFocusEffect } from '@react-navigation/core';
import { HOME_ICONS } from 'components/home/helpers/constants';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import { Box } from 'shared/box';
import { Spin } from 'shared/loader';
import { Paragraph } from 'shared/paragraph';
import { getClientProfile } from 'store/actions/client';
import { getIndustries, industriesSelectors } from 'store/entities/industries';
import { IIndustry } from 'types/industries';
import _ from 'lodash';

import { homeStyles as S } from '../style';

const HomeIndustries: React.FC = () => {
  const industries = useSelector(industriesSelectors.industries);
  const industriesLoading = useSelector(industriesSelectors.loading);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // useFocusEffect(
  //   useCallback(() => {
  //     // dispatch(getClientProfile());
  //     dispatch(getIndustries());
  //   }, [dispatch]),
  // );

  useEffect(() => {
    dispatch(getIndustries());
  }, [dispatch]);

  const navigateToSearch = (industry?: IIndustry) => () =>
    Navigator.navigate('SearchProviders', {
      servicesIds: industry?.services.map((service) => service.id) || [],
    });
  
  let filteredIndustries = industries.filter((industry) => industry.position);
  
    const sortedIndustries = [...filteredIndustries].sort(
    (a, b) => Number(a.position) - Number(b.position),
  );

  return industriesLoading ? (
    <Box pv={20} ph={20}>
      <Spin size="l" />
    </Box>
  ) : (
    <Box row wrap pv={20} ph={20}>
      {sortedIndustries.map((industry) => (
        <TouchableOpacity
          key={industry.id}
          onPress={navigateToSearch(industry)}
          style={S.industryItem}
        >
          {HOME_ICONS[industry.name]}
          <Paragraph size="xs" mt={12}>
            {industry?.name === 'Other' ? 'Other services' : industry.name}
          </Paragraph>
        </TouchableOpacity>
      ))}
      {/* <TouchableOpacity onPress={navigateToSearch()} style={S.industryItem}>
        {HOME_ICONS.Other}
        <Paragraph size="xs" mt={12}>
          {t(translations.home.otherServices)}
        </Paragraph>
      </TouchableOpacity>  */}
    </Box>
  );
};

export { HomeIndustries };
