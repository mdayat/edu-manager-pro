# [Edu Manager Pro](../../README.md) - [API Reference (REST)](README.md#rest) - Classrooms

## Create Classroom

### Endpoint

`POST /api/classrooms`

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
  "description": "string",
  "studentIds": "string[]" // Array of string
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
4. `500 Internal Server Error`: The server failed to create new classroom

## Get All Classrooms

### Endpoint

`GET /api/classrooms`

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
    "numberOfEnrolledStudents": "number"
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

3. `404 Not Found`: Classrooms are empty
4. `500 Internal Server Error`: The server failed to get all classrooms

## Get Classroom

### Endpoint

`GET /api/classrooms/{classroomId}`

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
  "description": "string",
  "enrolledStudents": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "age": "number",
      "payment_status": "boolean"
    }
  ], // Array of student payload
  "numberOfEnrolledStudents": "number"
}
```

### Error

When a request fails, the server will return its error message in the response body as a **plain JSON string without any properties**. This endpoint uses the following error codes:

1. `405 Method Not Allowed`: The server doesn't support the HTTP method used in the request.
2. `401 Unauthorized`: Request rejected due to one of the following scenarios:

   1. Empty `Authorization` header
   2. Invalid access token

   > **Note:** The client should handle this response manually to generate a new pair of access and refresh token. Please refer to [refresh](auth.md#refresh) endpoint.

3. `404 Not Found`: Classrooms are empty
4. `500 Internal Server Error`: The server failed to get the classroom

## Update Classroom

### Endpoint

`PATCH /api/classrooms/{classroomId}`

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
  "description": "string",
  "createdStudentIds": "string[]", // Array of string
  "deletedStudentIds": "string[]" // Array of string
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
4. `500 Internal Server Error`: The server failed to update new classroom

## Delete Classroom

### Endpoint

`DELETE /api/classrooms/{classroomId}`

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

3. `500 Internal Server Error`: The server failed to create new classroom
