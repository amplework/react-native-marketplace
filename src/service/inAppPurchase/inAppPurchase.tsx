import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EmitterSubscription } from 'react-native';
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  Subscription,
} from 'react-native-iap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigator } from 'service/navigator';
import {
  subscriptionSelectors,
  verifySubscription,
  verifySubscriptionFailure,
} from 'store/entities/subscription';
import { isIOS } from 'utils/device';

import { getPurchases } from './purchaseServices';

type InAppPurchases = {
  purchases?: Subscription[];
};

export const InAppPurchaseContext = React.createContext<InAppPurchases>({
  purchases: [],
});

const itemSkus = isIOS
  ? ['alpha.lite.sub', 'alpha.standard.subscription', 'alpha.premium.sub']
  : ['alpha.lite.android', 'alpha.standard.android', 'alpha.premium.android'];

const InAppPurchaseProvider: React.FC = ({ children }) => {
  const subscription: any = useSelector(subscriptionSelectors.subscription)
  const [purchases, setPurchases] = useState<Subscription[]>([]);
  const purchaseUpdateSubscription = useRef<EmitterSubscription>();
  const purchaseErrorSubscription = useRef<EmitterSubscription>();
  const isFreeSubscription = subscription?.subscriptionPlanId?.includes('free');

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initPurchase = useCallback(async () => {
    try {
      await RNIap.initConnection();
    } catch (error) {
      setTimeout(initPurchase, 3000);
    }

    const availablePurchases = await getPurchases(itemSkus);

    if (availablePurchases) {
      setPurchases(availablePurchases);
    }
  }, []);

  useEffect(() => {
    initPurchase();
  }, [initPurchase]);

  useEffect(() => {
    purchaseUpdateSubscription.current = purchaseUpdatedListener(
      async (purchase) => {
        if (purchase.transactionReceipt) {
          dispatch(
            verifySubscription(
              isIOS
                ? {
                  transactionReceipt: purchase.transactionReceipt,
                  productId: purchase.productId,
                }
                : {
                  packageName: purchase?.packageNameAndroid || '',
                  productId: purchase.productId,
                  purchaseToken: purchase?.purchaseToken || '',
                  subscription: true,
                },
            ),
          );

          await RNIap.finishTransaction(purchase, false);
        }
      },
    );

    purchaseErrorSubscription.current = purchaseErrorListener((error) => {
      console.warn('purchaseErrorListener', error);

      if (isIOS) {
        RNIap.clearTransactionIOS();
      }

      if (error.responseCode !== 2) {
        dispatch(verifySubscriptionFailure())
        if (isFreeSubscription || isFreeSubscription == undefined) {
          Navigator.navigate('PickSubscription');
        } else {
          Navigator.navigate('RenewSubscription');
        }
      }
    });

    return () => {
      purchaseUpdateSubscription?.current?.remove();
      purchaseErrorSubscription?.current?.remove();
    };
  }, []);

  return (
    <InAppPurchaseContext.Provider value={{ purchases }}>
      {children}
    </InAppPurchaseContext.Provider>
  );
};

export { InAppPurchaseProvider };
