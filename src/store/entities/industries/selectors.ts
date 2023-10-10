import { IndustriesState } from './type';

const all = (state: IndustriesState) => state.industries;

const industries = (state: IndustriesState) => all(state).industries;

const loading = (state: IndustriesState) => all(state).loading;

export const industriesSelectors = {
  industries,
  loading,
};
