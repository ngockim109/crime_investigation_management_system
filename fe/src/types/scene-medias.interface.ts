export interface SceneMedia {
  scene_media_id: string;
  date_taken: string;
  scene_media_file: any[]; 
  scene_media_description: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  captured_by?: string;
  captured_by_user?: {
    username: string;
  };
  case_id?: string;
  case?: {
    case_id: string;
  };
}

export interface SceneMediaFilters {
  page?: number;
  limit?: number;
  scene_media_description?: string;
  captured_by?: string;
  case_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface SceneMediaResponse {
  data: SceneMedia[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateSceneMediaData {
  date_taken: string;
  scene_media_file: any[];
  scene_media_description: string;
  case_id?: string;
  captured_by?: string;
}

export interface UpdateSceneMediaData extends Partial<CreateSceneMediaData> {}