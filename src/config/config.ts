import Config from 'react-native-config';

// Keep in sync with .env
type Environment = {
  IS_PRODUCTION: string;
  API_HOST: string;
  CHAT_API_HOST: string;
  TWITTER_API_HOST: string;
  TWITTER_CONSUMER_KEY: string;
  TWITTER_CONSUMER_SECRET: string;
  FB_CLIENT_ID: string;
  FB_CLIENT_SECRET: string;
  SENTRY_DSN: string;
  SENTRY_AUTH_TOKEN: string;
  SENTRY_ORG: string;
  SENTRY_PROJECT: string;
  STRIPE_PUBLISHABLE_KEY: string;
  STRIPE_CLIENT_ID: string;
};

export const env = Config as Environment;
