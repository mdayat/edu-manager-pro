# [Edu Manager Pro](../../README.md) - [API Reference (REST)](README.md#rest) - Students

## Create Student - `POST`

### Endpoint

`/api/students`

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Request Body

Send JSON object with the following properties:

```json
{
  "name": "string",
  "email": "string",
  "age": "number",
  "gender": "string", // "male" or "female"
  "address": "string",
  "payment_status": "boolean"
}
```

### Response

If success, the response will have `201` status code with **plain JSON string without any properties** as its response body.

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `400 Bad Request`: Request rejected due to one of the following scenarios:
   1. Body payload is missing in the request body
   2. Body payload in the request body is invalid
4. `500 Internal Server Error`: The server failed to create new student

## Get All Students - `GET`

### Endpoint

`/api/students`

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Response

Returns JSON array of object with the following properties:

```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "age": "number",
    "gender": "string", // "male" or "female"
    "address": "string",
    "payment_status": "boolean"
  }
]
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `500 Internal Server Error`: The server failed to get all students

## Get Single Student - `GET`

### Endpoint

`/api/students/{studentId}`

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
  "age": "number",
  "gender": "string", // "male" or "female"
  "address": "string",
  "payment_status": "boolean"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `404 Not Found`: The student is not found
4. `500 Internal Server Error`: The server failed to get the student
