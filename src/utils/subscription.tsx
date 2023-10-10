import { SubscriptionType } from "types/subscription";

export const getSubscriptionType = (subscription: SubscriptionType | any) => {    
  if(subscription?.subscriptionPlanId == 'free') {
    return {
      plan: 'Free Trial',
    }
  }
  if (subscription?.subscriptionPlanId?.includes('premium')) {
    return {
      plan: 'premium',
    };
  } else if (subscription?.subscriptionPlanId?.includes('lite')) {
    return {
      plan: 'lite',
    };
  } else {
    return {
      plan: 'standard',
    };
  }
};

export const getSubscriptionPlatform = (subscription: any) => {    
  if(subscription?.subscriptionPlanId == 'free') {
    return 'Free'
  }
  if(subscription?.subscriptionPlanId.includes('stripe') && (subscription?.platform == 'apple' || 'google')) {
    return 'Stripe'
  }
  if(!subscription?.subscriptionPlanId.includes('stripe') && (subscription?.platform == 'google')) {
    return 'Google'
  }
  if(!subscription?.subscriptionPlanId.includes('stripe') && (subscription?.platform == 'apple')) {
    return 'Apple'
  }
  if(subscription?.platform == 'web') {
    return 'Web'
  }
  if(subscription?.platform == 'admin-web') {
    return 'Admin-Web'
  }
};