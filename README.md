# TFC - Trybe Football Club

This is a full-stack project that uses React.js, Node.js, Express.js and MySQL technologies and runs on Docker. Its purpose is to manage a football championship, allowing you to view the ongoing and finished matches, add or edit the result of a match, in addition to seeing the ranking of the teams.

## Project architecture
The project is divided into 3 parts the client - Front-end -, the server - Back-end - and the database.

### Front-end
The frontend was built with React and JavaScript and was styled with pure CSS. It is also important to mention that the state management of the application was done with Hooks and LocalStorage for the persistence of some user data. The following libraries were also used: Axios.js and React Testing Library, for agility in the consumption of the API and the creation of integration tests, consecutively. 

### Back-end
The backend was built in Node.js with TypeScript using an MSC architecture - Model, Service and Controller - and OOP - Object Oriented Programming. The API was developed based on the REST Architecture and, for reasons of agility, the Express framework was used to manage the contract between the back and the front, and, for the connection with the database, the ORM - Object was used. Relational Mapper - Sequelize.

### Database
The database used was MySQL, due to its robust structure and the possibility of sharing data between different tables using relationships.

## Installation and startup

1. Clone the repository and navigate to the root with the following command:
```
$ git clone git@github.com:victormatia/tfc-repository.git && cd tfc-repository
```
2. To run the project we need to run the front-end, back-end and database containers. To do this, run the following command:
```
$ npm run compose:up
```
3. Ready! Now just access [localhost port 3000](http://localhost:3000)


## License

[MIT](https://choosealicense.com/licenses/mit/)
