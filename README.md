# Description

Application that manages some information regarding insurance policies and
company clients.

# Available Scripts

To run the app, you need to clone this project and run npm install. After that,
in the project directory, you can:

### `npm start`

Runs the API service in the port 3000.

### `npm test`

Run all the Unit Tests for the application.

# Considerations

1. The requirement of Authentication was not clear because I'm not abled to
   perform a login with the information provided by the APIs.
2. I've handled the Authorization via http headers, I suppose that this
   information will be available after the user logs in.
3. The only error code at the moment is 403 Forbidden Access. I've considered
   that if the user is not found it returns an empty array and status 200, It
   could be considered as a 404 Not found, but I think that it is missleading
   and the usage is better suited for errors in routes.

# Available Endpoints

## Client

Returns a client searched by its id.

- **URL**

  /clients/:id

- **Method:**

  `GET`

- **URL Params**

  `id: ObjectId()`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br /> **Content:** `{ products }`

- **Error Response:**

  `None`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: '/clients/id',
    headers: {role: 'admin'},
    dataType: 'json',
    type: 'GET',
    success: function (r) {
      console.log(r);
    },
  });
  ```

---

Get Client by Id

Returns a client searched by its name.

- **URL**

  /clients/name/:name

- **Method:**

  `GET`

- **URL Params**

  `name: String`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br /> **Content:** `{ products }`

- **Error Response:**

  `None`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: '/clients/name/Ivan',
    dataType: 'json',
    headers: {role: 'admin'},
    type: 'GET',
    success: function (r) {
      console.log(r);
    },
  });
  ```

---

## Policies

Returns a list of policies linked to a username

- **URL**

  /policies/name/Ivan

- **Method:**

  `GET`

- **URL Params**

  `name: String`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br /> **Content:** `{ products }`

- **Error Response:**

  `None`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: '/policies/name/Ivan',
    dataType: 'json',
    headers: {role: 'admin'},
    type: 'GET',
    success: function (r) {
      console.log(r);
    },
  });
  ```

---

Get Client by Id

Returns a user linked to a policy number.

- **URL**

  /policies/:id

- **Method:**

  `GET`

- **URL Params**

  `id: ObjectId()`

- **Data Params**

  `None`

- **Success Response:**

  - **Code:** 200 <br /> **Content:** `{ products }`

- **Error Response:**

  `None`

- **Sample Call:**

  ```javascript
  $.ajax({
    url: '/policies/1234',
    dataType: 'json',
    headers: {role: 'admin'},
    type: 'GET',
    success: function (r) {
      console.log(r);
    },
  });
  ```
