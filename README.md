# Code-Review


## To evaluate a simple API and identify improvements to the overall code quality.


Evaluate and improvements the api by using rate limitter, error handler, input validations, code review, logging and etc..


## Table of Contents

- [Done List](#Brief of Done List)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Testing](#testing)


## Brief of Done List
```bash
  * Eslint&Prettier is added to be able to code more elegantly.
  * MongoDB atlas account is opened and configured.
  * Mongodb URL and port variables are added to the .env file.
  * To prevent data safety, console.log(${dburl}) is removed.
  * To be able to run the dist, /src/ parameter is added to start the command at package json.
  * Rate Limiter (prevent brute force attack) is added to all routes.
    - Its values can be changed from the config.ts file.
  * Error Handler middleware is created and implemented to all routes.
    - So that, no need to write manual try catch error handling methods.
  * Winston Logger service is created and added to Error Handler middleware.
  * Test files are written into the /spec file by using chai. 
    - To be able to pass and complete all tests, correct parameters should be supplied.
```

## Installation

Instructions on how to install and set up the project. Include any dependencies that need to be installed and any configuration steps required.

```bash
# Clone the repository
git clone <repository_url>

# Install dependencies
npm install
```
## Usage

```bash
# Run the project
npm run start
```
## Configuration
```bash
Add your own .env file that includes both DBURL and PORT keys and values.
```

## API Documentation
```bash
Under the HTTP directory, there are HTTP files that can run without the 
need for any application such as Postman or Swagger. You can use it directly.
```

## Testing
```bash
npm run test
```