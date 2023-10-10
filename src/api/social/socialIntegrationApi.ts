import oauthSignature from 'oauth-signature';
import { SocialApi, SocialFbApi } from 'api/socialApi';
import { ApiResponse } from 'types/api';
import { env } from 'config';
import { FacebookPostParams, InstagramContainerParams, InstagramPostParams, PostTweetParams, RequestPageTokenParams, TwitterAuthParams, TwitterUsernameParams } from 'types/social';
import { toast } from 'shared/toast';

function oauthSignatureGenerator(url: string, method = "POST") {
  let timeSt = Math.floor(Date.now() / 1000)
  let oauthNo = Math.floor(Date.now())
  let oauthCK = env.TWITTER_CONSUMER_KEY
  let oauthCS = env.TWITTER_CONSUMER_SECRET
  let oauthSM = 'HMAC-SHA1'
  let oauthV = '1.0'
  let parameters = {
    oauth_consumer_key: oauthCK,
    oauth_nonce: oauthNo,
    oauth_timestamp: timeSt,
    oauth_signature_method: oauthSM,
    oauth_version: oauthV,
  }
  let signature = oauthSignature.generate(method, url, parameters, oauthCS)
  let result = {
    ...parameters,
    oauth_signature: signature,
  }
  return result
}

function tweetSignatureGenerator(url: string, accessToken: string, accessTokenSecret: string, method = "POST") {
  let timeSt = Math.floor(Date.now() / 1000)
  let oauthNo = Math.floor(Date.now())
  let oauthCK = env.TWITTER_CONSUMER_KEY
  let oauthCS = env.TWITTER_CONSUMER_SECRET
  let userAT = accessToken
  let userATS = accessTokenSecret
  let oauthSM = 'HMAC-SHA1'
  let oauthV = '1.0'
  let parameters = {
    oauth_consumer_key: oauthCK,
    oauth_token: userAT,
    oauth_nonce: oauthNo,
    oauth_timestamp: timeSt,
    oauth_signature_method: oauthSM,
    oauth_version: oauthV,
  }
  let signature = oauthSignature.generate(method, url, parameters, oauthCS, userATS)
  let result = {
    ...parameters,
    oauth_signature: signature,
  }
  return result
}

let myHeaders = new Headers();
myHeaders.append("Cookie", "guest_id=v1%3A166183277850330762; guest_id_ads=v1%3A166183277850330762; guest_id_marketing=v1%3A166183277850330762; personalization_id=\"v1_MdUWPL5msPT5aOIyWvD07g==\"; lang=en");

const requestTokenUrl = 'https://api.twitter.com/oauth/request_token';
const accessTokenUrl = 'https://api.twitter.com/oauth/access_token'
const postTweetUrl = 'https://api.twitter.com/2/tweets';

const oOathVerifierRequestToken = oauthSignatureGenerator(requestTokenUrl);

const oOathVerifierAccessToken = oauthSignatureGenerator(accessTokenUrl);

const tweetSignature = oauthSignatureGenerator(postTweetUrl);

const requestTwitterAuthorization = async (): ApiResponse<any> =>
  SocialApi.post(`/oauth/request_token`, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `OAuth oauth_consumer_key=${oOathVerifierRequestToken.oauth_consumer_key},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${oOathVerifierRequestToken.oauth_timestamp},oauth_nonce=${oOathVerifierRequestToken.oauth_nonce},oauth_version="1.0",oauth_signature=${oOathVerifierRequestToken.oauth_signature}`,
    }
  });

const getTwitterAuthorization = async (params: TwitterAuthParams) =>
  SocialApi.post(`/oauth/access_token`, null, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `OAuth oauth_consumer_key=${oOathVerifierAccessToken.oauth_consumer_key},oauth_verifier=${params?.oauthVerifier},oauth_token=${params?.oauthToken},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${oOathVerifierAccessToken.oauth_timestamp},oauth_nonce=${oOathVerifierAccessToken.oauth_nonce},oauth_version="1.0",oauth_signature=${oOathVerifierAccessToken.oauth_signature}`,
    }
  })
    .then((response: any) => {
      return response;
    }).catch((error: any) => {
      return error;
    });

// }
const getTwitterUserName = async (params: TwitterUsernameParams): ApiResponse<any> =>
  SocialApi.get(`/2/users/${params?.userId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `OAuth oauth_consumer_key=${oOathVerifierRequestToken.oauth_consumer_key},oauth_token=${params?.accessToken},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${oOathVerifierRequestToken.oauth_timestamp},oauth_nonce=${oOathVerifierRequestToken.oauth_nonce},oauth_version="1.0",oauth_signature=${oOathVerifierRequestToken.oauth_signature}`,
    }
  });

const shareToTwitter = async (params: PostTweetParams): ApiResponse<any> => {
  let signature = tweetSignatureGenerator(postTweetUrl, params?.userToken, params?.userTokenSecret)
  
  return SocialApi.post(`/2/tweets`, JSON.stringify(params?.data), {
    headers: { 
      'Authorization': `OAuth oauth_consumer_key=${signature.oauth_consumer_key},oauth_token=${params?.userToken},oauth_signature_method="HMAC-SHA1",oauth_timestamp=${signature.oauth_timestamp},oauth_nonce=${signature.oauth_nonce},oauth_version="1.0",oauth_signature=${signature.oauth_signature}`, 
      'Content-Type': 'application/json', 
    }
  }).then((res: any) => {
    console.log("tweet response====>>>> ", {...res});
    return {...res};
  }).then((err : any) => {
    console.log("tweet err====>>>> ", {...err});
    toast.info({...err}?.response?.data?.detail)
    return {...err};
  })
}

const getFbPageDetails = async (pageDetail: RequestPageTokenParams): ApiResponse<any> => {
  return SocialFbApi.get(`/${pageDetail?.pageId}?fields=access_token&access_token=${pageDetail.pageAccessToken}`)
}

const shareToFbPage = async (payload: FacebookPostParams): ApiResponse<any> => { 
  return SocialFbApi.post(`/${payload?.pageId}/photos?url=${payload?.url}&caption=${payload?.message}&access_token=${payload?.pageAccessToken}`);
}

const createInstagramContainer = async (payload: InstagramContainerParams): ApiResponse<any> => {  
  return SocialFbApi.post(`/${payload?.pageId}/media?is_carousel_item=true&caption=${payload?.caption}&image_url=${payload?.url}&access_token=${payload?.pageAccessToken}`);
}

const shareToInstagram = async (payload: InstagramPostParams): ApiResponse<any> => {  
  return SocialFbApi.post(`/${payload?.pageId}/media_publish?creation_id=${payload?.creationId}&access_token=${payload?.pageAccessToken}`);
}

export const SocialIntegrationApi = {
  requestTwitterAuthorization,
  getTwitterAuthorization,
  getTwitterUserName,
  shareToTwitter,
  getFbPageDetails,
  shareToFbPage,
  createInstagramContainer,
  shareToInstagram
};