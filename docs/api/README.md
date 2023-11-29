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

## Others

### Regenerate Invalid Access Token

A function that replace expired access token with the new access token through [refresh](auth.md#refresh) endpoint. More detail will be added...
