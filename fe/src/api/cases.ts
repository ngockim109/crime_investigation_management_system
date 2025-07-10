import { api } from "."
export const casesApi = {
    getSceneInfo: (caseId: string) => {
        return api.get(`/cases/${caseId}/scene-info`);
    },


    create: async (data: any) => {
    const response = await api.post("/initial-statements", data);
    return response.data;
    },
    deleteInitialStatement: async (id: string) => {
    const response = await api.delete(`/initial-statements/${id}`);
    return response.data;
    },
    updateInitialStatement: async (id: string, data: any) => {
    const response = await api.patch(`/initial-statements/${id}`, data);
    return response.data;
    },
    getInitialStatementById: async (id: string) => {
        console.log("id1", id)  
    const response = await api.get(`/initial-statements/${id}`);
    return response.data;
    },
    getInitialStatementByCaseId: async (params: any) => {
        const response = await api.get("/initial-statements", { params });
        return response.data;
    },


    deleteSceneMedia: async (id: string) => {
    const response = await api.delete(`/scene-medias/${id}`);
    return response.data;
    },
    getSceneMediaById: async (id: string) => {
    const response = await api.get(`/scene-medias/${id}`);
    return response.data;
    },
    createSceneMedia: async (data: any) => {
    const response = await api.post("/scene-medias", data);
    return response.data;
    },
    updateSceneMedia: async (id: string, data: any) => {
    const response = await api.patch(`/scene-medias/${id}`, data);
    return response.data;
    },
    getSceneMediaByCaseId: async (params: any) => {
    const response = await api.get("/scene-medias", { params });
    return response.data;
    },

    
    getPartiesByCaseId: async (params: any) => {
    const response = await api.get("/parties", { params });
    return response.data;
    },
    getPartiesById: async (id: string) => {
        console.log("id2", id)  
    const response = await api.get(`/parties/${id}`);
    return response.data;
    },
    deleteParty: (id: string) => api.delete(`/parties/${id}`),
}
