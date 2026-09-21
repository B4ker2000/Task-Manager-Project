export interface UserRegisterDto {
    username: string;
    email: string;
    password: string;
}

export interface UserLoginDto {
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
}

export interface UserProfile {
    id: number;
    username: string;
    email: string;
    role: string; // This is different than the project roles!
    stats: {
        total: number;
        completed: number;
    };
}

export interface RegisterResponse {
    message: string;
}