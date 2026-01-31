import api from './api';

export interface AddMemberRequest {
    treeId: number;
    name: string;
    gender?: string;
    relatedMemberId?: number;
    relationType?: 'parent' | 'child' | 'spouse';
    birthDate?: string;
    location?: string;
    imageUrl?: string;
}

export interface Member {
    id: number;
    treeId: number;
    name: string;
    gender?: string;
    birthDate?: string;
    location?: string;
    imageUrl?: string;
    relations?: any[]; // Define more specifically if needed
}

export const memberService = {
    addMember: async (data: AddMemberRequest) => {
        const response = await api.post('/member/add', data);
        return response.data;
    },

    getMemberDetails: async (memberId: number) => {
        const response = await api.get<Member>(`/member/${memberId}`);
        return response.data;
    },

    deleteMember: async (memberId: number) => {
        const response = await api.delete(`/member/${memberId}`);
        return response.data;
    },
};
