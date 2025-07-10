import type { PhysicalEvidenceFilters } from "@/types/physical-evidence.interface";
import { api } from "."
import type { InitialStatementFilters, InitialStatementResponse } from "@/types/initial-statements.interface";
import type { ApiResponse } from "@/types/api.interface";
import type { SceneMediaResponse } from "@/types/scene-medias.interface";
export const casesApi = {

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
        const response = await api.get(`/initial-statements/${id}`);
        return response.data;
    },
    getAllInitialStatements: async (
    filters: InitialStatementFilters
    ): Promise<ApiResponse<InitialStatementResponse>> => {
    const response = await api.get("/initial-statements", { params: filters })
    return response.data
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
    getAllSceneMedia: async (
    filters: PhysicalEvidenceFilters
    ): Promise<ApiResponse<SceneMediaResponse>> => {
    const response = await api.get("/scene-medias", { params: filters })
    return response.data
    },

    
    getPartiesByCaseId: async (params: any) => {
        const response = await api.get("/parties", { params });
        return response.data;
    },
    getPartiesById: async (id: string) => {  
        const response = await api.get(`/parties/${id}`);
        return response.data;
    },
    deleteParty: async (id: string) => {
        const response = await api.delete(`/parties/${id}`);
        return response.data;
    }
}
