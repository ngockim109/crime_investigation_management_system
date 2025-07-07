export const ALL_PERMISSIONS = {
    PERMISSIONS: {
        GET_PAGINATE: { method: "GET", apiPath: '/api/permissions', module: "PERMISSIONS" },
        CREATE: { method: "POST", apiPath: '/api/permissions', module: "PERMISSIONS" },
        UPDATE: { method: "PATCH", apiPath: '/api/permissions/:id', module: "PERMISSIONS" },
        DELETE: { method: "DELETE", apiPath: '/api/permissions/:id', module: "PERMISSIONS" },
    },
}

// export const ALL_MODULES = {
//     AUTH: 'AUTH',
//     COMPANIES: 'COMPANIES',
//     FILES: 'FILES',
//     JOBS: 'JOBS',
//     PERMISSIONS: 'PERMISSIONS',
//     RESUMES: 'RESUMES',
//     ROLES: 'ROLES',
//     USERS: 'USERS',
//     SUBSCRIBERS: 'SUBSCRIBERS'
// }
