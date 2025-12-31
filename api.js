// API Configuration
const API_BASE_URL = 'https://3awn-production.up.railway.app/api';

// Utility function to get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Utility function to save auth token
const saveAuthToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Utility function to get user info
const getUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
};

// Utility function to save user info
const saveUserInfo = (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
};

// Utility function to clear auth data
const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
};

// Generic API request function with optimistic updates support
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'حدث خطأ في الطلب');
        }
        
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Auth API functions
const authAPI = {
    signup: async (name, email, password, confirmPassword, accountType) => {
        return await apiRequest('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, confirmPassword, accountType })
        });
    },

    signin: async (email, password, accountType) => {
        return await apiRequest('/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password, accountType })
        });
    }
};

// News API functions
const newsAPI = {
    getAllNews: async (page = 1, limit = 10) => {
        return await apiRequest(`/news?page=${page}&limit=${limit}`);
    },

    getNews: async (id) => {
        return await apiRequest(`/news/${id}`);
    }
};

// Chat API functions with optimistic updates
const chatAPI = {
    getConversations: async () => {
        return await apiRequest('/chat/conversations');
    },

    getMessages: async (userId) => {
        return await apiRequest(`/chat/messages/${userId}`);
    },

    sendMessage: async (receiverId, message) => {
        return await apiRequest('/chat/send', {
            method: 'POST',
            body: JSON.stringify({ receiverId, message })
        });
    },

    getUnreadCount: async () => {
        return await apiRequest('/chat/unread-count');
    }
};

// Account linking API functions
const accountAPI = {
    linkAccount: async (linkedAccountId, linkedAccountType, password) => {
        return await apiRequest('/account/link', {
            method: 'POST',
            body: JSON.stringify({ linkedAccountId, linkedAccountType, password })
        });
    },

    getLinkedAccounts: async () => {
        return await apiRequest('/account/linked');
    },

    getResponsibleAccount: async () => {
        return await apiRequest('/account/responsible');
    },

    searchAccount: async (email, accountType) => {
        return await apiRequest(`/account/search?email=${encodeURIComponent(email)}&accountType=${accountType}`);
    }
};

// Medicine API functions
const medicineAPI = {
    getAllMedicines: async () => {
        return await apiRequest('/medicines');
    },

    getMedicine: async (id) => {
        return await apiRequest(`/medicines/${id}`);
    },

    createMedicine: async (medicineData) => {
        return await apiRequest('/medicines', {
            method: 'POST',
            body: JSON.stringify(medicineData)
        });
    },

    updateMedicine: async (id, medicineData) => {
        return await apiRequest(`/medicines/${id}`, {
            method: 'PUT',
            body: JSON.stringify(medicineData)
        });
    },

    deleteMedicine: async (id) => {
        return await apiRequest(`/medicines/${id}`, {
            method: 'DELETE'
        });
    }
};

// Export all functions
window.API = {
    auth: authAPI,
    news: newsAPI,
    chat: chatAPI,
    account: accountAPI,
    medicine: medicineAPI,
    getAuthToken,
    saveAuthToken,
    getUserInfo,
    saveUserInfo,
    clearAuthData
};

