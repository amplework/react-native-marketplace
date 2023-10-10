import { isIOS } from "utils/device";

type VerifyAppleSubscriptionPayload = {
  productId: string;
  transactionReceipt: string;
};

type VerifyAndroidSubscriptionPayload = {
  packageName: string;
  productId: string;
  purchaseToken: string;
  subscription: boolean;
};

export type VerifySubscriptionPayload =
  | VerifyAppleSubscriptionPayload
  | VerifyAndroidSubscriptionPayload;

type SubscriptionPlan = {
  id: string;
  type: string;
};

export type SubscriptionDetails = {
  transactionId: string;
  subscriptionPlan: string;
  purchaseDateMs: string;
  cancellationDateMs: string | null;
  expirationDateMs: string;
  platform: string;
  price: number;
  currency: string;
  receipt: any
};

export type SubscriptionType = {
  cancellationDateMs: string | null | undefined,
  expirationDateMs: string | null | undefined,
  platform: string | null | undefined,
  purchaseDateMs: string | null | undefined,
  subscriptionPlan: string | null | undefined,
  transactionId: string | null | undefined
} | null | undefined;

export type Plan = {
  plan: string | null;
} | null | undefined

export type SubscriptionPlatform = "Free" | "Stripe" | "Google" | "Apple" | "Web" | "Admin-Web" | undefined

export const STANDARD = isIOS ? 'alpha.standard.subscription' : 'alpha.standard.android';

export const LITE = isIOS ? 'alpha.lite.sub' : 'alpha.lite.android';

export const PREMIUM = isIOS ? 'alpha.premium.sub' : 'alpha.premium.android';
