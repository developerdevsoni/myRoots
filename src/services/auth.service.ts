import api from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export const authService = {
    login: async (data: LoginRequest) => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
    },
};
