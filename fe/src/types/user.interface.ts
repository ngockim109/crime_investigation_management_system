export interface UserFormAdd {
    user_name: string;
    full_name: string
    password: string;
    position: string;
    date_of_birth: string;
    day_attended: string;
    phone_number: string;
    zone: string;
    status: string
}
export interface UserFormEdit {
    full_name: string
    password: string;
    position: string;
    date_of_birth: string;
    day_attended: string;
    phone_number: string;
    zone: string;
    status: string
}
// {
//     "statusCode": 200,
//         "message": "Get all users",
//             "data": {
//         "meta": {
//             "current": 0,
//                 "pageSize": 0,
//                     "pages": 1,
//                         "total": 3
//         },
//         "result": [
//             {
//                 "user_name": "long",
//                 "phone_number": "0123456789",
//                 "full_name": "Lê Phan Hải Long 1111111111",
//                 "position": "investigator",
//                 "date_of_birth": "1995-01-01T00:00:00.000Z",
//                 "day_attended": "2025-07-01T00:00:00.000Z",
//                 "status": "active",
//                 "zone": "A1111111",
//                 "role": {
//                     "role_id": "4637fb08-c05d-4dc2-96f2-6a53dd571342",
//                     "description": "ADMIN",
//                     "permissions": [
//                         {
//                             "permission_id": "0458c663-e39e-4fdd-a145-118c7725da45",
//                             "description": "Create Permission",
//                             "api_path": "/api/permissions",
//                             "method": "POST",
//                             "module": "PERMISSIONS",
//                             "isDeleted": false,
//                             "created_at": "2025-07-07T21:01:57.933Z",
//                             "updated_at": "2025-07-07T21:01:57.933Z"
//                         },
//                         {
//                             "permission_id": "0bf02d0a-8185-488c-bc9f-6f1a34785100",
//                             "description": "Update User",
//                             "api_path": "/api/users/:id",
//                             "method": "PATCH",
//                             "module": "USERS",
//                             "isDeleted": false,
//                             "created_at": "2025-07-07T21:00:35.632Z",
//                             "updated_at": "2025-07-07T21:00:35.632Z"
//                         },
//                         {
//                             "permission_id": "1be9b8d8-664b-482c-b20a-2f698b8ce3a8",
//                             "description": "Update Role",
//                             "api_path": "/api/roles/:id",
//                             "method": "PATCH",
//                             "module": "ROLES",
//                             "isDeleted": false,
//                             "created_at": "2025-07-07T21:05:10.386Z",
//                             "updated_at": "2025-07-07T21:05:10.386Z"
//                         }
//                     ],
//                     "created_at": "2025-07-07T21:07:56.124Z",
//                     "updated_at": "2025-07-07T21:07:56.124Z",
//                     "isDeleted": false
//                 },
//                 "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsb25nIiwiZnVsbF9uYW1lIjoiTGUgUGhhbiBIYWkgTG9uZyIsInBvc2l0aW9uIjoiaW52ZXN0aWdhdG9yIiwiZGF0ZV9vZl9iaXJ0aCI6IjE5OTUtMDEtMDFUMDA6MDA6MDAuMDAwWiIsImRheV9hdHRlbmRlZCI6IjIwMjUtMDctMDFUMDA6MDA6MDAuMDAwWiIsInBob25lX251bWJlciI6IjAxMjM0NTY3ODkiLCJzdGF0dXMiOiJhY3RpdmUiLCJ6b25lIjoiQTEiLCJyb2xlIjp7InJvbGVJZCI6IjQ2MzdmYjA4LWMwNWQtNGRjMi05NmYyLTZhNTNkZDU3MTM0MiIsImRlc2NyaXB0aW9uIjoiQURNSU4ifSwiaWF0IjoxNzUxOTIzNDc2LCJleHAiOjE3NTI1MjgyNzZ9.GRNsZEMTsz0jCRYRZl7vS-qO1mm762FoK_ofZtJXyF0"
//             },
//             {
//                 "user_name": "long1",
//                 "phone_number": "0123456789",
//                 "full_name": "Lê Phan Hải Long 1111111111",
//                 "position": "investigator",
//                 "date_of_birth": "1995-01-01T00:00:00.000Z",
//                 "day_attended": "2025-07-01T00:00:00.000Z",
//                 "status": "active",
//                 "zone": "A2",
//                 "role": null,
//                 "refreshToken": null
//             },
//             {
//                 "user_name": "long2",
//                 "phone_number": "0123456789",
//                 "full_name": "Le Phan Hai Long",
//                 "position": "investigator",
//                 "date_of_birth": "1995-01-01T00:00:00.000Z",
//                 "day_attended": "2025-07-01T00:00:00.000Z",
//                 "status": "active",
//                 "zone": "A1",
//                 "role": null,
//                 "refreshToken": null
//             }
//         ]
//     }
// }
export interface UserReponse {
    user_name: string;
    full_name: string
    password: string;
    position: string;
    date_of_birth: string;
    day_attended: string;
    phone_number: string;
    zone: string;
    status: string
    refreshToken?: string
    role: {
        role_id: string,
        description: "",
        permissions: {
            permission_id: string,
            description: string,
            api_path: string,
            method: string,
            module: string
        }[

        ]
    }
}
export interface ResponseGetAllUserApi {
    meta: {
        current: number,
        pageSize: number,
        pages: number,
        total: number
    },
    result: UserReponse[]
}
export interface UserFilters {
    current?: number
    pageSize?: number
    position?: string
}