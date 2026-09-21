export interface ProjectCategory {
    id: number;
    name: string;
    colorHex: string;
    projectId: number;
}

// Model for creating a category 
export interface CategoryCreateDto {
    name: string;
    colorHex: string;
}

// Model for the standard structured response wrap
export interface ApiResponseWrapper<T> {
    success: boolean;
    message: string;
    data: T;
}