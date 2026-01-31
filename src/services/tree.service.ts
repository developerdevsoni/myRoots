import api from './api';

export interface CreateTreeRequest {
    title: string;
    rootName: string;
    rootGender?: string;
    rootBirthDate?: string;
    rootLocation?: string;
}

export interface Tree {
    id: number;
    title: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export const treeService = {
    createTree: async (data: CreateTreeRequest) => {
        const response = await api.post('/tree/create', data);
        return response.data;
    },

    getUserTrees: async () => {
        const response = await api.get<Tree[]>('/tree/user');
        return response.data;
    },

    getTreeDetails: async (treeId: number) => {
        const response = await api.get(`/tree/${treeId}`);
        return response.data;
    },
};
