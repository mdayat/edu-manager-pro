# [Edu Manager Pro](../../README.md) - [API Reference (REST)](README.md#rest) - Students

## Create Student

### Endpoint

`POST /api/students`

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

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `400 Bad Request`: Request rejected when body payload is missing in the request body
4. `500 Internal Server Error`: The server failed to create new student

## Get All Students

### Endpoint

`GET /api/students`

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
    "payment_status": "boolean",
    "numberOfEnrolledClassrooms": "number"
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

3. `404 Not Found`: Students are empty
4. `500 Internal Server Error`: The server failed to get all students

## Get Student

### Endpoint

`GET /api/students/{studentId}`

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
  "name": "string",
  "email": "string",
  "age": "number",
  "gender": "string", // "male" or "female"
  "address": "string",
  "payment_status": "boolean",
  "enrolledClassrooms": [
    {
      "id": "string",
      "name": "string"
    }
  ], // Array of classroom payload
  "numberOfEnrolledClassrooms": "number"
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

## Update Student

### Endpoint

`PATCH /api/students/{studentId}`

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Request Body

Send JSON object with **one, or more, or all** of the following properties:

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

If success, the response will have `200` status code with **plain JSON string without any properties** as its response body.

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `400 Bad Request`: Request rejected when body payload is missing in the request body
4. `500 Internal Server Error`: The server failed to update new student

## Delete Student

### Endpoint

`DELETE /api/students/{studentId}`

### Request Headers

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN"
}
```

### Response

If success, the response will have `200` status code with **plain JSON string without any properties** as its response body.

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `500 Internal Server Error`: The server failed to create new student
