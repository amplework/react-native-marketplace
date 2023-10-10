import { ClientRewardState } from './types';

const all = (state: ClientRewardState) => state.clientReward;

const clientReward = (state: ClientRewardState) => all(state).clientReward;

const clientBirthdayReward = (state: ClientRewardState) => all(state).clientBirthdayReward;

const clientLoyaltyReward = (state: ClientRewardState) => all(state).clientLoyaltyReward;

const loading = (state: ClientRewardState) => all(state).loading;

export const clientRewardSelectors = {
  clientReward,
  clientBirthdayReward,
  clientLoyaltyReward,
  loading,
};
