export const ALL_PERMISSIONS = {
  USERS: {
    GET: { method: "GET", apiPath: '/api/users', module: "USERS" },
    CREATE: { method: "POST", apiPath: '/api/users', module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: '/api/users/:user_name', module: "USERS" },
    DELETE: { method: "DELETE", apiPath: '/api/users/:user_name', module: "USERS" },
  },
}

export const ALL_MODULES = {
  AUTH: 'AUTH',
  USERS: 'USERS',
}