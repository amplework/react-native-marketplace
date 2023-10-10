import { IProduct } from 'types/products';
import { ITax } from 'types/taxes';

type Product = IProduct & {
  quantity: number;
  isSelected?: boolean;
};

const getSelectedQuickItems = (quickItems: Product[]) =>
  quickItems.filter((quickItem) => quickItem.isSelected);

export const hasProduct = (services: Product[], quickItems: Product[] = []) =>
  !!services.length || !!getSelectedQuickItems(quickItems).length;

export const getSaleTotal = (
  taxes: ITax[],
  services: Product[],
  quickItems: Product[] = [],
) => {
  if (!hasProduct(services, quickItems)) {
    return 0;
  }

  const products = [...services, ...getSelectedQuickItems(quickItems)];
  const subTotal = Number(
    products
      .reduce((pV, val) => (pV += val.price * val.quantity), 0)
      .toFixed(2),
  );
  const percent = Number(
    taxes.reduce((pV, val) => (pV += val.rate), 0).toFixed(2),
  );

  const total = (subTotal + (percent / 100) * subTotal).toFixed(2);

  return Number(total);
};

export const getSaleTotalWithReward = (
  taxes: ITax[],
  services: Product[],
  quickItems: Product[] = [],
  rewardsId: number[],
  rewardDetails: any,
) => {
  if (!hasProduct(services, quickItems)) {
    return 0;
  }

  const products = [...services, ...getSelectedQuickItems(quickItems)];

  const subTotal = Number(
    products
      .reduce((pV, val: any) => {
        const priceAfterDiscount = rewardDetails?.rewardType == 'discount amount'
          ? val?.price - rewardDetails?.discount
          : val?.price - (val?.price * rewardDetails?.discountRate / 100);
        return (pV += (rewardsId?.includes(val?.productId || val?.id) ? priceAfterDiscount : val.price) * val.quantity)
      }, 0)
      .toFixed(2),
  );
  const percent = Number(
    taxes.reduce((pV, val) => (pV += val.rate), 0).toFixed(2),
  );

  const total = (subTotal + (percent / 100) * subTotal).toFixed(2);

  return Number(total);
};
