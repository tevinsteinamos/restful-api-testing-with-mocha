# testing-controller-in-mocha

##### This is Tevinstein's submission for a Hacktiv8 portfolio project with
- Node.js v6+
- Express
- MongoDB
- Mongoose
- Mocha
- Chai

## Installation
- Clone the repo: `git clone https://github.com/tevinstein/restful-api-testing-with-mocha.git`
- Install packages: `npm install`
- Start the test: `npm test`

## Tested Restful API
| URL       | Method | Description                              |
|-----------|--------|------------------------------------------|
| /blog     | GET    | Gets all blog                            |
| /blog     | POST   | Does not post a blog with an empty field |
| /blog     | POST   | Posts a blog                             |
| /blog/:id | GET    | Gets a blog by given id                  |
| /blog/:id | DELETE | Updates a blog by given id               |
| /blog/:id | PUT    | Updates a blog by given id               |

## Screenshot

![testing restful api in mocha](http://i.imgur.com/9qZZFn6.png "testing restful api in mocha")

