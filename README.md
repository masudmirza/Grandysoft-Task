# **Node.js E-commerce REST API with Swagger Documentation**
## **Table of contents**
---
- [Description](#Description)
- [Installation](#Installation)
- [Usage](#Usage)
- [Technologies](#Technologies)
---
## **Description**
It is necessary to create a REST application that will contain randomly generated users and connections between them. If requested, it will be necessary to provide the necessary information.

---
## **Installation**
1. Start by forking this repository on Github.
2. Clone this project to your machine by using the "git clone + URL" command.
3. Move to project directory.
4. Run the folowing to install dependencies.
```javascript
npm install
``` 
5. Set up database.
6. Run the following code to start.
```javascript
npm run start
```
---
## **Usage**

When you run the project, tables will be automatically created in the database and users will be inserted there. To change the number of the user, you can enter the desired number parameter from the userGenerator function.
---
## **Endpoints**
1. api/users/subscribe - request method - POST, accepts senderId and receiverId from body
2. api/users/all - request method - GET
3. api/users/count - request method - GET, accepts query parameter - senderId, receiverId
4. api/users/friends/:userId - request method - GET, accepts params parameter - userId, query parameter - order and sortBy
5. api/users/max/following - request method - GET
6. api/users/not/following - request method - GET