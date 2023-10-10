export { sociaIntegrationSaga } from './sagas';
export { socialSelectors } from './selectors';
export {
  socialReducer,
  socialToggle,
  isModalOpened,
  isFbModalOpened,
  getTwitterAuth,
  requestTwitterAuth,
  shareToTwitter,
  shareToFbPage,
  shareToFbPageSuccess,
  shareToFbPageFailure,
  getPageDetails,
  shareToInstagram,
  removePageDetails,
  shareToAllPlatforms,
  isFacebookIntegrated,
  isTwitterIntegrated,
  isInstagramIntegrated
} from './slice';