# Role-Based Access Control (RBAC) with Node.js, Express, MongoDB

## **Overview**

This project implements a secure **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** system using the **MVC architecture**. It ensures users can register, log in, and access resources based on their assigned roles, such as `Admin`, `User`, or `Moderator`. Access to specific resources is determined by permissions tied to roles.

---

## **Features**

1. **Authentication**:

   - Users can register, log in, and securely manage their credentials.
   - Passwords are hashed using `bcryptjs`.
   - Tokens are generated and verified using **JWT** for session management.

2. **Authorization**:

   - Role-based permissions ensure users only access what they are authorized for.
   - Admins have full access, while Users may have limited access (e.g., read-only).

3. **Role-Based Access Control (RBAC)**:

   - Roles are stored in a database with associated permissions.
   - Middleware enforces permission checks at the endpoint level.

4. **Scalable Design**:
   - Follows **MVC architecture** for better code organization.
   - Extensible for additional roles, permissions, and features.

---

## **Technologies Used**

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for routing and middleware.
- **MongoDB**: Database for storing users, roles, and permissions.
- **bcryptjs**: Secure password hashing.
- **jsonwebtoken (JWT)**: Stateless authentication.
- **dotenv**: Manage environment variables.
- **mongoose**: MongoDB object modeling.

---

## **Folder Structure**

```js
project/
├── controllers/
│   ├── authController.js  # Handles user authentication (register, login)
│   └── resourceController.js  # Manages access to resources
├── middlewares/
│   └── authMiddleware.js  # Handles authentication and permission checks
├── models/
│   ├── roleModel.js  # Defines the Role schema
│   └── userModel.js  # Defines the User schema
├── routes/
│   ├── authRoutes.js  # Routes for authentication
│   └── resourceRoutes.js  # Routes for resource management
├── config/
│   └── db.js  # MongoDB connection setup
├── app.js  # Entry point of the application
└── .env  # Environment variables
```

---

## **Database Design**

1. **Roles**:

   - Schema:
     ```json
     {
       "name": "admin",
       "permissions": ["read", "write", "delete"]
     }
     ```
   - Example Roles:
     - `admin`: Full access.
     - `user`: Read-only access.

2. **Users**:
   - Schema:
     ```json
     {
       "username": "testuser",
       "password": "hashed_password",
       "role": "role_id"
     }
     ```
   - Role is linked to the `Roles` collection via `roleId`.

---

## **Authentication Workflow**

1. **Register**:

   - Users provide a username, password, and role name.
   - Password is hashed before saving to the database.
   - Role is fetched from the `roles` collection and linked to the user.

2. **Login**:
   - Users log in with their username and password.
   - If credentials are valid, a JWT is issued with the user's ID.

---

## **Authorization Workflow**

1. **Token Validation**:

   - Middleware `authenticateToken` checks for the presence of a valid JWT in the `Authorization` header.

2. **Permission Check**:

   - Middleware `authorizePermission` retrieves the user's role and checks if it contains the required permission for the requested endpoint.

3. **RBAC in Action**:
   - Example:
     - A `user` role cannot access the `/resource/write` or `/resource/delete` endpoints.
     - An `admin` role can access all endpoints.

---

## **Endpoints**

### **1. Authentication Endpoints**

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| POST   | `/auth/register` | Register a new user |
| POST   | `/auth/login`    | Log in a user       |

---

### **2. Resource Endpoints**

| Method | Endpoint           | Permission Required | Description              |
| ------ | ------------------ | ------------------- | ------------------------ |
| GET    | `/resource/read`   | `read`              | Access read-only content |
| POST   | `/resource/write`  | `write`             | Add new content          |
| DELETE | `/resource/delete` | `delete`            | Remove content           |

---
