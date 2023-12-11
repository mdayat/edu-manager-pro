# [Edu Manager Pro](../../README.md) - API Reference

## REST

### Base URL

The base URL for all API endpoints is:
`https://edu-manager-pro.vercel.app/`

### Unprotected Endpoints

Endpoints that require no authentication:

1. [Login](auth.md#login): `POST /api/auth/login`

### Protected Endpoints

Endpoints that require authentication or token (to be precise) to be included in the header of each request. The token can be acquired from login endpoint.

#### Auth

An endpoint that performs authentication-related transaction.

1. [Logout](auth.md#logout): `GET /api/auth/logout`
2. [Refresh](auth.md#refresh): `GET /api/auth/refresh`

#### Users

An endpoint to get account information.

1. [Get Account Information](users.md): `GET /api/users/me`

#### Students

An endpoint to manipulate student data (e.g. add, update, delete, etc.)

1. [Create Student](student.md#create-student): `POST /api/students`
2. [Get All Students](student.md#get-all-students): `GET /api/students`
3. [Get Student](student.md#get-student): `GET /api/students/{studentId}`
4. [Update Student](student.md#update-student): `PATCH /api/students/{studentId}`
5. [Delete Student](student.md#delete-student): `DELETE /api/students/{studentId}`

#### Classrooms

An endpoint to manipulate classroom data (e.g. add, update, delete, etc.)

1. [Create Classroom](classroom.md#create-classroom): `POST /api/classrooms`
2. [Get All Classrooms](classroom.md#get-all-classrooms): `GET /api/classrooms`
3. [Get Classroom](classroom.md#get-classroom): `GET /api/classrooms/{classroomId}`
4. [Update Classroom](classroom.md#update-classroom): `PATCH /api/classrooms/{classroomId}`
5. [Delete Classroom](classroom.md#delete-classroom): `DELETE /api/classrooms/{classroomId}`

## Others

### Regenerate Invalid Access Token

A function that replace expired access token with the new access token through [refresh](auth.md#refresh) endpoint. More detail will be added...
