# [Edu Manager Pro](../../README.md) - [API Reference (REST)](README.md#rest) - Users

## Get User - `GET`

Returns user account information

### Endpoint

`/api/users/me`

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Response

Returns JSON object with the following properties:

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "picture_url": "string"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `404 Not Found`: The user is not found
4. `500 Internal Server Error`: The server failed to get the student
