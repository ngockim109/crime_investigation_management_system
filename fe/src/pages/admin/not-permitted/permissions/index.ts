export const ALL_PERMISSIONS = {
  USERS: {
    GET: { method: "GET", apiPath: '/api/users', module: "USERS" },
    CREATE: { method: "POST", apiPath: '/api/users', module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: '/api/users/:user_name', module: "USERS" },
    DELETE: { method: "DELETE", apiPath: '/api/users/:user_name', module: "USERS" },
  },
  CASES: {
    GET: { method: "GET", apiPath: '/api/cases', module: "CASE" },
    CREATE: { method: "POST", apiPath: '/api/users', module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: '/api/users/:user_name', module: "USERS" },
    DELETE: { method: "DELETE", apiPath: '/api/users/:user_name', module: "USERS" },
  },
  CASE_USER: {
    GET: { method: "GET", apiPath: '/api/case-user/user', module: "CASE-USER" },
  },
  REPORTS: {
    GET: { method: "GET", apiPath: '/api/reports', module: "REPORT" },
  },
}

export const ALL_MODULES = {
  AUTH: 'AUTH',
  USERS: 'USERS',
  CASES: 'CASES'
}