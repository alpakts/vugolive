// services/apiService.js
'use client';
import axios from 'axios';
import ApiName from './constants/api-names';
import ApiParams from './constants/api-params';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API'nin temel URL'sini buraya yazın
  headers: {
    "Content-Type": "application/json",
    apikey: process.env.NEXT_PUBLIC_API_KEY ?? "123",
  },
});
apiClient.interceptors.request.use(
  (config) => {
      config.headers[ApiParams.authtoken] =
        localStorage.getItem('token')??''; // Her istekte Authorization header'ına authtoken ekliyoruz
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401  || error.response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        signOut(auth);
        window.location.href = '/auth?callbackUrl=' + window.location.pathname + window.location.search;
      }
    }
    return Promise.reject(error);
  }
);

export const registerUser = async (data) => {
  return await apiClient.post(ApiName.register, data);
};

export const getAppSettings = async () => {
  return await apiClient.get(ApiName.all_setting);
};

export const getFakeMessages = async () => {
  return await apiClient.get(ApiName.fakeMessagesList);
};

export const getCountryList = async () => {
  return await apiClient.post(ApiName.country_list);
};

export const getPaymentGateWayList = async () => {
  return await apiClient.post(ApiName.PaymentGetWayList);
};

export const getReportReason = async () => {
  return await apiClient.post(ApiName.reportReson);
};

export const updateUserProfile = async (data, image) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(ApiParams[key], data[key]));
  formData.append('file', image);

  return await apiClient.post(ApiName.userProfileUpdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getExploreProfiles = async (cId, uId) => {
  return await apiClient.post(ApiName.fetchHostProfiles, {
    [ApiParams.country_id]: cId,
    [ApiParams.user_id]: uId,
  });
};

export const getExploreProfilesByGender = async ( uId, gender) => {
  return await apiClient.post(ApiName.fetchHostProfilesByGender, {
    [ApiParams.user_id]: uId,
    gender,
  });
};
export const getCupList = async ( uId, gender) => {
  return await apiClient.post(ApiName.fetchHostProfilesByGender, {
    [ApiParams.user_id]: uId,
    gender,
  });
};

export const getPurchaseTransactions = async (userID, user_type, operation_type, order_by_date_type) => {
  return await apiClient.post(ApiName.getPurchaseTransactions, {
    [ApiParams.user_id]: userID,
    user_type,
    operation_type,
    order_by_date_type,
  });
};

export const getAllUser = async (cId, uId) => {
  return await apiClient.post(ApiName.getAllUser, {
    [ApiParams.country_id]: cId,
    [ApiParams.user_id]: uId,
  });
};

export const findMatch = async (uId) => {
  return await apiClient.post(ApiName.find_random_host, {
    [ApiParams.user_id]: uId,
  });
};

export const getUserList = async (list) => {
  return await apiClient.post(ApiName.in_live_list, {
    [ApiParams.in_live_list]: list,
  });
};

export const getGifsList = async () => {
  return await apiClient.post(ApiName.giftList);
};

export const saveProfile = async (uId, hId) => {
  return await apiClient.post(ApiName.save_profile, {
    [ApiParams.user_id]: uId,
    [ApiParams.host_id]: hId,
  });
};

export const removeFromSaved = async (uId, hId) => {
  return await apiClient.post(ApiName.remove_from_save, {
    [ApiParams.user_id]: uId,
    [ApiParams.host_id]: hId,
  });
};

export const getSavedProfiles = async (uId, start, limit) => {
  return await apiClient.post(ApiName.get_saved_profile, {
    [ApiParams.user_id]: uId,
    [ApiParams.start]: start,
    [ApiParams.limit]: limit,
  });
};

export const getBlockedProfiles = async (uId) => {
  return await apiClient.post(ApiName.fetchBlockList, {
    [ApiParams.user_id]: uId,
  });
};

export const deleteAccount = async (uId) => {
  return await apiClient.post(ApiName.delete_profile, {
    [ApiParams.user_id]: uId,
  });
};

export const logOutAccount = async (uId) => {
  return await apiClient.post(ApiName.logOut, {
    [ApiParams.user_id]: uId,
  });
};

export const getDiamondPurchaseList = async () => {
  return await apiClient.post(ApiName.allSubcription);
};

export const getHostProfile = async (uId, hId) => {
  return await apiClient.post(ApiName.get_host_profile, {
    [ApiParams.user_id]: uId,
    [ApiParams.host_id]: hId,
  });
};

export const unblockHost = async (uId, hId) => {
  return await apiClient.post(ApiName.unblockHost, {
    [ApiParams.user_id]: uId,
    [ApiParams.host_id]: hId,
  });
};

export const blockHost = async (uId, hId) => {
  return await apiClient.post(ApiName.blockHost, {
    [ApiParams.user_id]: uId,
    [ApiParams.host_id]: hId,
  });
};

export const makeUserHost = async (data, images, videos) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  images.forEach((image) => formData.append(ApiParams.imagesArray, image));
  videos.forEach((video) => formData.append(ApiParams.videosArray, video));

  return await apiClient.post(ApiName.applyForHost, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const updateHostProfile = async (data, images, videos) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  images.forEach((image) => formData.append(ApiParams.imagesArray, image));
  videos.forEach((video) => formData.append(ApiParams.videosArray, video));

  return await apiClient.post(ApiName.hostProfileUpdate, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const sendNotification = async (authToken, contentType, payload) => {
  return await apiClient.post(ApiName.fcm_noti, payload, {
    headers: {
      Authorization: authToken,
      'content-type': contentType,
    },
  });
};

export const getUserProfile = async (uId) => {
  return await apiClient.post(ApiName.getUserProfile, {
    [ApiParams.user_id]: uId,
  });
};

export const reportUser = async (reason, description, uId) => {
  return await apiClient.post(ApiName.report, {
    [ApiParams.reason]: reason,
    [ApiParams.description]: description,
    [ApiParams.user_id]: uId,
  });
};

export const getUrl = async (media) => {
  const formData = new FormData();
  formData.append('file', media);
  return await apiClient.post(ApiName.storeFileGivePath, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const addDiamonds = async (uId, count, type) => {
  return await apiClient.post(ApiName.diamondPlus, {
    [ApiParams.user_id]: uId,
    [ApiParams.diamond]: count,
    [ApiParams.type]: type,
  });
};

export const minusDiamonds = async (uId, count) => {
  return await apiClient.post(ApiName.diamondMinus, {
    [ApiParams.user_id]: uId,
    [ApiParams.diamond]: count,
  });
};

export const purchaseCoin = async (uId, type) => {
  return await apiClient.post(ApiName.addCoins, {
    [ApiParams.user_id]: uId,
    [ApiParams.type]: type,
  });
};

export const verifyInAppProductPurchase = async (uId, token, productId) => {
  return await apiClient.post(ApiName.verifyInAppProductPurchase, {
    [ApiParams.user_id]: uId,
    [ApiParams.token]: token,
    [ApiParams.product_id]: productId,
  });
};

export const sendCoin = async (uId, myUserId) => {
  return await apiClient.post(ApiName.sendCoin, {
    [ApiParams.user_id]: uId,
    [ApiParams.my_user_id]: myUserId,
  });
};

export const minusCoin = async (uId) => {
  return await apiClient.post(ApiName.minusCoins, {
    [ApiParams.user_id]: uId,
  });
};

export const userSendNotification = async (username, uId, diamondPerMin, agoraToken, identity) => {
  return await apiClient.post(ApiName.sendNotificationToUsers, {
    [ApiParams.username]: username,
    [ApiParams.user_id]: uId,
    [ApiParams.diamond_per_min]: diamondPerMin,
    [ApiParams.agoraToken]: agoraToken,
    [ApiParams.identity]: identity,
  });
};

export const fetchNotification = async (start, limit) => {
  return await apiClient.post(ApiName.fetchNotification, {
    [ApiParams.start]: start,
    [ApiParams.limit]: limit,
  });
};

export const removeNotification = async (uId) => {
  return await apiClient.post(ApiName.notificationRemove, {
    [ApiParams.user_id]: uId,
  });
};

export const getPaymentHistory = async (uId, start, limit) => {
  return await apiClient.post(ApiName.fetchRedeemRequests, {
    [ApiParams.user_id]: uId,
    [ApiParams.start]: start,
    [ApiParams.limit]: limit,
  });
};

export const generateAgoraToken = async (channelName) => {
  return await apiClient.post(ApiName.generateAgoraToken, {
    [ApiParams.channelName]: channelName,
  });
};

export const getDiamondHistory = async (uId) => {
  return await apiClient.post(ApiName.historyDiamond, {
    [ApiParams.user_id]: uId,
  });
};

export const requestRedeem = async (uId, diamond, accountInfo, title) => {
  return await apiClient.post(ApiName.placeRedeemRequest, {
    [ApiParams.user_id]: uId,
    [ApiParams.diamond]: diamond,
    [ApiParams.account_info]: accountInfo,
    [ApiParams.payment_getway_title]: title,
  });
};

export const updateUserCallStatus = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(ApiParams[key], data[key]));
  return await apiClient.post(ApiName.updateUserCallStatus, formData);
};

export const updateIsVideoCall = async (myUserId, callStatus) => {
  return await apiClient.post(ApiName.onOff_video_call, {
    [ApiParams.user_id]: myUserId,
    [ApiParams.is_video_call]: callStatus,
  });
};

export const verifyPurchase = async (token) => {
  return await apiClient.post(ApiName.verifyPurchase, {
    [ApiParams.token]: token,
  });
};
