# Event Scheduler
#### Description:

Event Scheduler is a web app that puts an end to the nightmare of scheduling events/meetups with your always-busy family, friends, and colleagues.

<p align="center">
    <img src="https://i.imgur.com/Z7vfy9i.png" alt="Event Scheduler's Homepage"/>
</p>

Events can be created by picking desired date ranges and event names. Event creators can then share with participants the event page hyperlink or event ID, where participants can indicate their unavailable dates.

Once all participants have completed indicating their unavailabilities, the calendar on the event page presents an overview of dates that suit everyone's schedule. Farewell, chat group polls and negotiations!

# Client

The client directory contains frontend files bootstrapped using [React](https://reactjs.org/) with [Create React App](https://github.com/facebook/create-react-app).

File descriptions can be found in the `README` inside the directory.

# Server

The server directory contains backend files bootstrapped using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/).

File descriptions can be found in the `README` inside the directory.

# Design Journal

## Scope

The project has a lot of potentials yet to be built on:
* Logins
* Unavailable Weights
* Calendar App Integrations
* Local Holidays / Formatting

It is published in the current state as a Minimum Viable Product developed within a given timeframe.

## Client - Coding

One of my intentions with the project is to increase my exposure in frontend development with React.

The frontend was first written based on classes, as tutorials and resources I initially found were utilizing the same approach. Not until I was troubled with understanding modules written with React Hooks did I come across the term and the recording of React Conference 2018. I had only realized the recent shift towards the cleaner development approach by then and had gladly rewritten and continued developing my frontend with React Hooks.

Around halfway through the development, I also realized my App.js was too bloated to manage and understand. I had hence separated the pages into elements and restructured App.js with routes to the corresponding pages.

## Client - Interface

Designing the web app with a horizontal columned layout was considered, but a vertical layout was chosen due to better compatibility with mobile device screen ratios and overall elegance.

On the landing page, Create Event was positioned before Access Event as users accessing the landing page are more likely to be event creators. The majority of event participants are anticipated to access events through event hyperlinks shared by event creators.

## Server - Coding

Developing the backend server with Django in the hopes of time-saving was considered initially, as a significant amount of time was already consumed with frontend development when I got to start with the backend for this being my first exposure to React (described further in Client's README.md). Django was taught in class and should hence take less effort to implement.

Yet upon further research, Node.js was found to be highly recommended across communities for development along React in the interest of a shared programming language (JavaScript). I hence chose to go with Node.js, as exposure to industry recommended approaches should be beneficial for my later works anyways.

To my surprise, the basic principles and structures to set up a backend server with Node.js are strikingly similar to that of Django's. Glad to have chosen the approach for the additional experience and would recommend myself to take the same path if given a time machine.

## Server - Database

One of my intentions with the project is to give database managing with the popular MySQL a try. The principles and syntaxes are considerably similar with sqlite3 taught in class. No major obstacles were encountered.