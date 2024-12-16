// src/utils/authValidation.ts
export const userRoles = {
    ADMIN: "admin",
    INSTRUCTOR: "instructor",
    STUDENT: "student",
};

// Mock: Replace with an actual session or API data
export const getUserRole = (): string => {
    return localStorage.getItem("userRole") || userRoles.STUDENT; // Default to student
};

export const isAuthorized = (requiredRoles: string[]): boolean => {
    const userRole = getUserRole();
    return requiredRoles.includes(userRole);
};
