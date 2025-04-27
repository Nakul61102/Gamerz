import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Update if needed

// Authentication APIs
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};

export const fetchProfile = async (userId) => {
  const token = localStorage.getItem("token"); // Get token from local storage

  try {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach the token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const fetchUserPosts = async (userId) => {
  const token = localStorage.getItem("token"); // Get token from local storage

  try {
    const response = await fetch(`${API_URL}/post/userPost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Attach the token
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Fetch all communities
export const fetchCommunities = async () => {
  const token = localStorage.getItem("token"); // Get token from localStorage
  try {
    const response = await axios.get(`${API_URL}/communities`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching communities:", error);
    throw error;
  }
};

// Join a community
export const joinCommunity = async (communityId) => {
  try {
    const token = localStorage.getItem("token"); // Get auth token
    const response = await fetch(`${API_URL}/communities/join/${communityId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });

    if (!response.ok) {
      throw new Error("Failed to join community");
    }

    return await response.json();
  } catch (error) {
    console.error("Error joining community:", error);
    throw error;
  }
};

export const fetchAllPosts = async () => {
  const response = await axios.get(`${API_URL}/post`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(`${API_URL}/post/create`, postData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deletePost = async (postId) => {
  const response = await axios.delete(`${API_URL}/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const likePost = async (postId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/post/like/${postId}`,
    {}, // no body needed for toggle
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const toggleCommunityMembership = async (communityId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/communities/join/${communityId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to toggle community membership");
  }

  return await response.json();
};

export const updateProfile = async (userId, profileData) => {
  const response = await axios.put(
    `${API_URL}/profile/${userId}`,
    profileData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.profile;
};

export const createCommunity = async (data) => {
  const res = await fetch(`${API_URL}/communities/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to create community");
  }

  return res.json();
};

export const fetchUserCommunities = async () => {
  try {
    const res = await fetch(`${API_URL}/communities/userCommunity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch user communities");

    return await res.json();
  } catch (error) {
    console.error("Error from fetchUserCommunities in api.js:", error);
    throw error; // Optional: Re-throw to handle it in the component with toast
  }
};
