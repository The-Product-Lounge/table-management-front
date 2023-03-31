# MySeat - A mobile seating app

<img src ="https://res.cloudinary.com/table-management/image/upload/v1679467183/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-22_083930_xo7rzo.png" height="800px" alt="Main page image"/>

___

### Table of Contents
- [MySeat Description](#MySeat-description)
- [Application Features](#application-features)
- [Technologies](#technologies)
- [Getting started](#getting-started)
- [Showcase](#showcase)

## MySeat Description
MySeat is a web app that allows you to manage table seating for events, conferences, or any other situation where people need to be seated in groups. With this app, you can:
- Add people to tables: Enter people's details (name and portfolio stage(in this version)) and assign them to a table. The app will either seat the person in the first table that it finds that has less then 3 people in in and that also have the same portfolio stage or create a new table and seat the person in it.
- Manage tables: Each table has a status that shows how many people are seated at it. You can delete a person from a table or remove a table altogether if it's no longer needed.
- Fill gaps: If there's a gap in the table numbers (e.g., Table 1, Table 2, Table 4), the app will automatically create a new table to fill the gap.

## Application Features
- ***Database changes rerenders*** - The app uses firebase as a database so every change in the tables is immediately shown on the ui.
- ***Random profile images*** - If a person doesn't add a profile image then they get a random one from the Dicebear api. 
 
We spent a lot of effort on making sure that the app is both functional and esthetic.

## Technologies

The technology stack we used was:
- Firebase for our databse - which gave us realtime ui re renders on database changes.
- NestJS for our backend - a sturdy and comprehensive backend framework. Must useful for its validations.
- React for our frontend.
- Node.js

The API calls to the backend are done with the REST API method.
</hr>
An important aspect of this project is that The API call "Join Table" is implemented as a queue because it relies on one person accessing and changing the table at a time.

When a user requests to join a table, their request is added to the queue. The API processes each request in order, ensuring that only one person can join the table at a time. If another user tries to join the same table while the queue is processing a previous request, their request will be added to the queue and processed when it's their turn.

This queue-based approach ensures that there are no conflicts or race conditions when multiple users try to join the same table simultaneously. It also helps to prevent data corruption or inconsistencies that could arise from concurrent table updates.

The API is built using NestJS, and it uses @nestjs/bull and redis to manage the queue and process requests. The API has been thoroughly tested and optimized to ensure fast and reliable performance, even under high loads.

We have used many third side libraries for many goals, such as material ui, redux, cloudinary, axios and more.
The layout and design were made with Sass (functions, mixins, variables). 

## Getting started

Head to the repositories 'table-management-front' and 'table-management-backend-nest-js' in my profile and clone the project or download the files.

```
git clone https://github.com/OhayoNB/table-management-front
```

```
git clone https://github.com/OhayoNB/table-management-backend-nest-js
```

Enter the backend part of the project and make sure you have node_modules installed. After that we will initiate the server with 'npm run start:dev':

```
npm i 
npm run start:dev
```

You shuold get a console output that the server is up and running at port 3030.
Enter the frontend section of the project and repeat the same process.

```
npm i 
npm start
```

You shuold get a console output that that the server is up and running at localhost:3000.

That's it! The App should open automatically, enjoy!

## Showcase

### Homepage
The landing page in which the user can enter thier details.

<img src ="https://res.cloudinary.com/table-management/image/upload/v1679467183/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-22_083930_xo7rzo.png" height="800px" alt="Homepage image"/>

### Table page
The main table view.

<img src ="https://res.cloudinary.com/table-management/image/upload/v1679469080/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-22_091033_sw51zc.png" height="800px" alt="Table page image"/>

### Event settings
The damin page, allows you to view and manage all tables in your event.

<img src ="https://res.cloudinary.com/table-management/image/upload/v1679469216/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2023-03-22_091325_dvhyuf.png" height="800px" alt="Event settings page image"/>


### Authors
 - [Yasmin Gudha](https://github.com/YasminGd)
 - [Bar Ohayon](https://github.com/OhayoNB)
