import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically to every request if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

// PROFILE
export const fetchProfile = async (userId) => {
  const response = await axiosInstance.get(`/profile/${userId}`);
  return response.data;
};

export const updateProfile = async (userId, profileData) => {
  const response = await axiosInstance.put(`/profile/${userId}`, profileData);
  return response.data.profile;
};

// POSTS
export const fetchUserPosts = async (userId) => {
  const response = await axiosInstance.get("/post/userPost");
  return response.data;
};

export const fetchAllPosts = async () => {
  const response = await axiosInstance.get("/post");
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axiosInstance.post("/post/create", postData);
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axiosInstance.delete(`/post/${postId}`);
  return response.data;
};

export const likePost = async (postId) => {
  const response = await axiosInstance.post(`/post/like/${postId}`);
  return response.data;
};

// COMMUNITIES
export const fetchCommunities = async () => {
  const response = await axiosInstance.get("/communities");
  return response.data;
};

export const fetchCommunityById = async (communityId) => {
  const response = await axiosInstance.get(`/communities/${communityId}`);
  return response.data;
};

export const createCommunity = async (data) => {
  const response = await axiosInstance.post("/communities/create", data);
  return response.data;
};

export const fetchUserCommunities = async () => {
  const response = await axiosInstance.get("/communities/userCommunity");
  return response.data;
};

export const toggleCommunityMembership = async (communityId) => {
  const response = await axiosInstance.post(`/communities/join/${communityId}`);
  return response.data;
};

export const deleteCommunity = async (communityId) => {
  const response = await axiosInstance.delete(`/communities/${communityId}`);
  return response.data;
};

// Events
export const createEvent = async (data) =>
  await axiosInstance.post("/event", data);

export const getCommunityEvents = async (communityId) => {
  const response = await axiosInstance.get(`/event/${communityId}`);
  return response.data;
};

export const joinEvent = async (eventId) => {
  const response = await axiosInstance.post(`/event/join/${eventId}`);
  return response.data;
};

// Matchmaking
export const createMatchPost = async (data) => {
  const response = await axiosInstance.post("/match", data);
  return response.data;
};

export const getCommunityMatchPosts = async (communityId) => {
  const response = await axiosInstance.get(`/match/${communityId}`);
  return response.data;
};
