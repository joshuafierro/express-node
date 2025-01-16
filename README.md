# express-node

### Tasks Backend API

A RESTful API for managing tasks with secure authentication utilizing JSON Web Tokens (JWT) and database persistence via SQLite.

| Features |  Method  |         Endpoint |
| :------- | :------: | ---------------: |
| Login    |  `POST`  |    `/auth/login` |
| Register |  `POST`  | `/auth/register` |
| Create   |  `POST`  |         `/tasks` |
| Read     |  `GET`   |         `/tasks` |
| Update   | `PATCH`  |     `/tasks/:id` |
| Delete   | `DELETE` |      `/tasks/:d` |
