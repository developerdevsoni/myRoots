import api from './api';

export const matchService = {
    getMyMatches: async () => {
        const response = await api.get('/match/my-matches');
        return response.data;
    },
};
