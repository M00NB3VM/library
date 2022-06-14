# Library API

An API for books (get, add, update and delete), with function to sign up, log in and borrow/return books.

This server is running locally on port 4000 and this will be used as the reference for the endpoints throughout this documentation.
Server port can easily be changed in server.js.

## Packages used

Built with express and sqlite3

- jsonwebtoken
- dotenv
- md5

Remove the ".example" from the .env file and add your own secret key.

## How **BOOKS**

The book-object contains the following information:

- Id INTEGER
- Title TEXT
- Author TEXT
- Quantity INTEGER

Sample book (JSON format):

```
{ "id": 1,
"title": "Amazing fantasy novel",
"author": "Name",
"quantity": 2 }
```

### Get all books

**GET** http://localhost:4000/books

```
Example: fetch("http://localhost:4000/books")
.then(response => response.json())
[
	{
		"id": 1,
		"title": "Daughter of the moon goddess",
		"author": "Sue Lynn Tan",
		"quantity": 2
	},
	{
		"id": 2,
		"title": "A magic steeped in poison",
		"author": "Judy I. Lin",
		"quantity": 1
	},
	{
		"id": 3,
		"title": "Crowded vol 2: glitter dystopia",
		"author": "Christopher Sebela",
		"quantity": 3
	}
]
```

Response:  
Statuscode 200 \- OK

### Get a single book

**GET** http://localhost:4000/books/:id

```
Example: fetch("http://localhost:4000/books/1")
.then(response => response.json())

{
		"id": 1,
		"title": "Daughter of the moon goddess",
		"author": "Sue Lynn Tan",
		"quantity": 2
	}
```

Response:
Statuscode 200 \- OK

### Add a book

**POST** http://localhost:4000/books

```
Example: fetch("http://localhost:4000/books", {
method: "POST",
data: {
"title": "Test",
"author": "Sir Testing",
"quantity": 1
})
.then(response => response.json())
```

Response:
Statuscode 201 \- created  
Success message

### Update existing book

**PUT** http://localhost:4000/books/:id

```
Example: fetch("http://localhost:4000/books/1", {
method: "PUT",
data: {
"title": "Test",
"author": "Sir Testing",
"quantity": 1
}
})
.then(response => response.json())
```

Response:
Statuscode 200 \- OK  
Success message

**PATCH** http://localhost:4000/books/:id

```
Example: fetch("http://localhost:4000/books/1", {
method: "PATCH",
data: {
"title": "New title"
}
})
.then(response => response.json())
```

Response:
Statuscode 200 \- OK  
Success message

Returns the updated value only, other properties of the object stays unchanged.

### Remove book

**DELETE** http://localhost:4000/books/:id

```
Example: fetch("http://localhost:4000/books/1", {
method: "DELETE",
})
.then(response => response.json())
```

Response:
Statuscode 200 \- OK  
Success message

## How **USERS**

The user object contains the following information:

- Id INTEGER
- Name TEXT
- Email TEXT
- Password TEXT (encrypted)

Sample user (JSON format):

```
{ "id": 1,
"name": "Test Testsson",
"email": "sample@mail.com",
"password": "Password" }
```

### Add new user

**POST** http://localhost:4000/auth/register

```
Example: fetch("http://localhost:4000/auth/register", {
method: "POST",
data: {
"name": "Test Testsson",
"email": "sample@mail.com",
"password": "Password"
})
.then(response => response.json())
```

Response:
Statuscode 201 \- created  
Success message

### Login

**POST** http://localhost:4000/auth/login

Uses _e-mail_ and _password_ to log in.

```
Example: fetch("http://localhost:4000/auth/login", {
method: "POST",
data: {
"email": "sample@mail.com",
"password": "Password"
})
.then(response => response.json())
```

Response:
Statuscode 200 \- Ok  
Returns a token

### User My Page

**GET** http://localhost:4000/me

Response:
Statuscode 200 \- Ok  
Returns the currently logged in user with their name and e-mail, and an array of books they currently have on loan.

#### Notice

This is a school assignment and therefore the list of users are included in the code.

&nbsp;
&nbsp;

> "When in doubt, go to the library."

&nbsp;
&nbsp;

![A cute sheep reading a book](https://media2.giphy.com/media/YYtMieW4jkpyiEaMpJ/giphy.gif?cid=790b7611eb7da1faae1d2ef60ade3baf269e6a45fcbe4323&rid=giphy.gif&ct=s)
