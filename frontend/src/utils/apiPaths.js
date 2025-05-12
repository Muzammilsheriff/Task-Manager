export const BASE_URL = "http://localhost:8000";


export const API_PATHS = {
    AUTH: {
        REGISTER:"/api/auth/register", // Register a new user (Admin Only)
        LOGIN:"/api/auth/login", // Authenticate user & returns JWT toker
        GET_PROFILE:"/api/auth/profile", // Get logged-in user Details
    },

    USER:{
        GET_ALL_USERS:"/api/users", // Get all users (Admin Only)
        GET_USER_BY_ID: (userId) => `/api/users/${userId}`, // Get user by ID (Admin Only)
        CREATE_USER:"/api/users", // Create a new user (Admin Only)
        UPDATE_USER: (userId) => `/api/users/${userId}`, // Update user details
        DELETE_USER: (userId) => `/api/users/${userId}`, // Delete a user
    },

    TASKS: {
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data", // Get dashboard data 
        GET_USER_DASHBOARD_DATA:"/api/tasks/user-dashboard-data", // Get dashboard data 
        GET_ALL_TASKS:"/api/tasks", // Get all tasks (Admin Only)
        GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, // Get task by ID (Admin Only)
        CREATE_TASK:"/api/tasks", // Create a new task (Admin Only)
        UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, // Update task details
        DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, // Delete a task
    
        UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, // Update task status
        UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/checklist`, // Update task checklist
    },

    REPORTS:{
        EXPORT_TASKS:"/api/reports/export/tasks", // Export tasks to CSV (Admin Only)
        EXPORT_USERS:"/api/reports/export/users", // Export tasks by user to CSV (Admin Only)
    },

    IMAGE:{
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload image to server
    }

}