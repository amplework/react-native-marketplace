import React, { useCallback, useEffect, useState } from 'react';
import { Box } from 'shared/box';

import { SalesSpecialSection } from './salesSpecialSection';
import { ChatStatusSection } from './chatStatus';
import { BasicInfoSection } from './basicInfoSection';
import { BusinessDetailsSection } from './businessDetailsSection';
import { ServicesOfferedSection } from './servicesOfferedSection';
import { salesSpecialSelectors } from 'store/entities/salesSpecial';
import { useDispatch, useSelector } from 'react-redux';
import { blockUser } from 'store/entities/subClients';
import { userSelectors } from 'store/entities/user';
import { alert } from 'shared/alert';
import { providersSelectors } from 'store/entities/providers';
import { SocialDetailsSection } from './socialDetailsSection';
import { WebLinkSection } from './webLinkSection';

type Props = {
  providerDetails: any;
};

const ProviderDetailsTab: React.FC<Props> = ({ providerDetails }) => {
  const user = useSelector(userSelectors.user);
  const salesSpecialsByProvider = useSelector(salesSpecialSelectors.salesSpecialsByProvider);
  const blockedProviders = useSelector(providersSelectors.blockedProviders);
  const isBlocked = blockedProviders?.filter((e: any) => e?.providerId == providerDetails?.id);

  const [salesSpecial, setSalesSpecial] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (salesSpecialsByProvider) {
      let salesSpecial = salesSpecialsByProvider
        ?.filter((e: any) => e?.active && !e?.isQuickPromotion)
        ?.map((val: any) => {
          return {
            name: val.service?.name,
            actualPrice: val.actualPrice,
            salePrice: val.salePrice,
            discount: (100 - (val.salePrice / val.actualPrice * 100)).toFixed(2),
          }
        })
        ?.sort((a: any, b: any) => b?.['discount'] - a?.['discount'])
        ?.[0]
      setSalesSpecial(salesSpecial);
    }
    return () => {
      setSalesSpecial(null);
    }
  }, [salesSpecialsByProvider]);

  const handleBlockUser = useCallback(() => {
    const handler = () => {
      dispatch(blockUser({
        providerId: providerDetails?.id,
        clientId: user?.id,
        isProvider: false,
        isFromClientProfile: false,
        isFromProviderProfile: true,
      }));
    };
    alert.blockProvider({
      entity: providerDetails?.firstName,
      onBlock: handler
    });
  }, [providerDetails]);

  const links: any = providerDetails?.links !== null && providerDetails?.links.filter((e: any) => e !== null && e !== "null");

  return (
    <Box pt={25} pb={115} ph={24}>
      {salesSpecial && (
        <SalesSpecialSection salesSpecial={salesSpecial} />
      )}
      <BasicInfoSection />
      <BusinessDetailsSection />
      <ServicesOfferedSection />
      <SocialDetailsSection />
      <ChatStatusSection pressBlock={handleBlockUser} isBlocked={isBlocked?.length ? true : false} />
      {(links && links?.length !== 0)
        && (
          <WebLinkSection />
        )}
    </Box>
  );
}

export { ProviderDetailsTab };
