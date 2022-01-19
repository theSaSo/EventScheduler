# Server

## Installation

Installing [Node.js](https://nodejs.org/) to utilize npm is recomeneded.

1. Change directory to the server folder downloaded

    `cd ~/server`

2. Install the necessary node modules

    `npm install`

## Running

1. Change directory to the server folder downloaded

    `cd ~/server`

2. Run the server

    `npm run devStart`

## Creating Database

MySQL is used as the database management system in this project. No incompatibility with other relational database management systems is expected upon corresponding modification to the database parameters in the index.js file.

Install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/) and [MySQL Shell](https://dev.mysql.com/downloads/shell/). Optionally, you can also install [MySQL Workbench](https://www.mysql.com/products/workbench/) for visual database management. FreeCodeCamp has a great [walkthrough](https://www.youtube.com/watch?v=HXV3zeQKqGY&t=3149s) on installing the software.

Upon opening the MySQL 8.0 Command Line Client:

1. Create Database

    ```
    CREATE DATABASE event-scheduler-db
    ```

    `event-scheduler-db` is an arbitrary name for the database, feel free to pick any other names desired.

2. Create Event Table

    ```
    CREATE TABLE `events` (
    `id` int NOT NULL AUTO_INCREMENT,
    `eventName` varchar(45) NOT NULL,
    `minDate` timestamp NULL DEFAULT NULL,
    `maxDate` timestamp NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
    )
    ```

    Feel free to modify the maximum length of `eventName`.

    Feel free to modify the names, but do be reminded the modify the corresponding names in Server's index.js afterwards.

3. Create Disabled Dates Table

    ```
    CREATE TABLE `disableddates` (
    `id` int NOT NULL AUTO_INCREMENT,
    `eventID` int NOT NULL,
    `startDate` timestamp NOT NULL,
    `endDate` timestamp NOT NULL,
    PRIMARY KEY (`id`),
    KEY `eventID_idx` (`eventID`),
    CONSTRAINT `eventID` FOREIGN KEY (`eventID`) REFERENCES `events` (`id`)
    )
    ```

    Feel free to modify the names, but do be reminded the modify the corresponding names in Server's index.js afterwards.

# Files

`index.js`

Backend server. Database query logics are defined according to requests.

Edit the database parameters in this file if necessary.
