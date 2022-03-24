
Houses API is a back-end assignment described bellow this section, and contains the suggested steps to run:
1. Go to the folder in the CLI
2. Run `npm install`
3. Run `node app.js` (optional: Install nodemon and run `npm run start`)
4. Test the endpoints

The application uses lowdb dependency for the storage solution in a JSON file. In that way, in changes will be visible in the file located in /utils/db.json, in case of not relying entirely on the get methods to see changes.
Also, it uses uuid dependency for the GUID format when generating a house id.

Additionaly, I added a default GET method to get all houses with the endpoint: http://localhost:3435/houses

Testing in this project was accomplished by setting up ECMA script modules for Jest, and the tests running command is:
`npm run test`

With this approach, the test lack of a decent coverage.

# Backend Assignment

The goal of this assignment is to create a simple **JSON** REST API able to perform `CRUD` operations against the `houses` resource. We want your setup to be minimal and we want to be mindful of your time. :)

## Tasks

- Create a server that listens to port `3435`;
- Implement a storage solution - avoid using ORM;
- Implement CRUD operations for the `houses` resource;
- The endpoints must meet all the requirements of the section `Endpoints`;

## Endpoints

### Create:

```
POST /houses
Body:
{
  "address": "Some Street", // <mandatory>
  "zip_code": "V3G 7F3",    // <mandatory>
  "lat": 12345,             // <mandatory>
  "long": 6789              // <mandatory>
}
```

#### Response:

**Created:**

```
Status: 201 Created
{
  "house": {
    "id": "ed15d1be-522c-11ec-bf63-0242ac130002",
    "address": "Some Street",
    "zip_code": "V3G 7F3",
    "lat": 12345,
    "long": 6789
  }
}
```

**Bad request:**

```
Status: 401 Bad request
{
  "error": "bad request"
}
```

---

### Read:

```
GET /houses/ed15d1be-522c-11ec-bf63-0242ac130002
```

#### Response:

**Found:**

```
Status: 200 OK
{
  "house": {
    "id": "ed15d1be-522c-11ec-bf63-0242ac130002",
    "address": "Some Street",
    "zip_code": "V3G 7F3",
    "lat": 12345,
    "long": 6789
  }
}
```

**Not found:**

```
Status: 404 Not Found
{
  "error": "house ed15d1be-522c-11ec-bf63-0242ac130002 not found"
}
```

---

### Update:

```
PUT /houses/ed15d1be-522c-11ec-bf63-0242ac130002
Body:
{
  "address": "New Street",
  "long": 101112
}
```

#### Response:

**Updated:**

```
Status: 200 OK
{
  "house": {
    "id": "ed15d1be-522c-11ec-bf63-0242ac130002",
    "address": "New Street",
    "zip_code": "V3G 7F3",
    "lat": 12345,
    "long": 101112
  }
}
```

**Not found:**

```
Status: 404 Not Found
{
  "error": "house ed15d1be-522c-11ec-bf63-0242ac130002 not found"
}
```

---

### Delete:

```
DELETE /houses/ed15d1be-522c-11ec-bf63-0242ac130002
```

#### Response:

**Deleted:**

```
Status: 200 OK
{
  "message": "house ed15d1be-522c-11ec-bf63-0242ac130002 deleted successfully"
}
```

**Not found:**

```
Status: 404 Not Found
{
  "error": "house ed15d1be-522c-11ec-bf63-0242ac130002 not found"
}
```

## Considerations

- You can work on this assignment on your own time.
- We know our modern lives are very busy and, bacause we want to be mindful of your time, we don't expect you to take more than 2 hours to complete this assignment.
- Although our stack is Nodejs and Golang, you can use any programming language in order to complete this exercise.
- We'd love to get a sense of how you work and, for that, we ask you to treat this assignment as if it was a feature you were working on and that will be reviewed by your colleagues.
- Once you are satisfied with the work you've done, open a Merge Request and our team will review it. :)

## Bonus

If time permits, we'd love to see how you approach code testability. 

---

Good Luck!
