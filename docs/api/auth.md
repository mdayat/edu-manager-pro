# [Edu Manager Pro](../../README.md) - [API Reference (REST)](README.md#rest) - Auth

## Login

Returns a pair of access and refresh token.

### Endpoint

`/api/auth/login`

### Allowed Methods

1. POST

### Request Body

Send JSON object with the following properties:

```json
{
  "credential": "THE_ID_TOKEN_RETURNED_FROM_GOOGLE_AUTHENTICATION"
}
```

### Response

Returns JSON object with the following properties:

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `400 Bad Request`: The request body is empty
3. `401 Unauthorized`: Invalid ID Token
4. `500 Internal Server Error`: The server failed to do one of these scenarios:
   1. Failed to create access and refresh token
   2. Failed to create a new user (if it's a new user)
   3. Failed to update refresh token (if it's an old user)

## Logout

Update user's `refresh_token` in the database to null

### Endpoint

`/api/auth/logout`

### Allowed Methods

1. GET

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_REFRESH_TOKEN"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: The `Authorization` header is empty
3. `500 Internal Server Error`: The server failed to update refresh token

## Refresh

Request a new pair of access and refresh token, update user's `refresh_token` in the database from newly generated refresh token

### Endpoint

`/api/auth/refresh`

### Allowed Methods

1. GET

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_REFRESH_TOKEN"
}
```

### Response

Returns JSON object with the following properties:

```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: The `Authorization` header is empty, or invalid refresh token
3. `500 Internal Server Error`: The server failed to create access and refresh token, or update refresh token
