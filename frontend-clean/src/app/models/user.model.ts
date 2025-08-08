export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
    supervisor?: {
        id: number;
        name: string;
        email: string;
    };
    address?: string;
    phone?: string;
    socialInsuranceNumber?: string;
    hireDate?: Date;
    hourlyRate?: number;
    subordinates?: User[];
}

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_APPROBATEUR = 'ROLE_APPROBATEUR';
export const ROLE_USER = 'ROLE_USER';

export enum RoleEnum {
    ADMIN = 'ROLE_ADMIN',
    APPROBATEUR = 'ROLE_APPROBATEUR',
    USER = 'ROLE_USER'
}

export const ALL_ROLES = [
    { name: ROLE_ADMIN, display: 'Admin' },
    { name: ROLE_APPROBATEUR, display: 'Approver' },
    { name: ROLE_USER, display: 'User' }
];