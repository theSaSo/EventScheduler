# Client

## Installation

Installing [Node.js](https://nodejs.org/) to utilize npm is recomeneded.

1. Change directory to the client folder downloaded

    `cd ~/client`

2. Install the necessary node modules

    `npm install`

## Running

1. Change directory to the client folder downloaded

    `cd ~/client`

2. Run the client

    `npm start`

# Files

## public

`index.html`

HTML template with metadata, [Bootstrap](https://getbootstrap.com/)'s styling, icon etc. defined.

`family.png`

Website icon.

`manifest.json`

For web app, comes with [Create React App](https://github.com/facebook/create-react-app) and slightly modified. Resource: [Add a web app manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)

`robots.txt`

For web robot connections, comes with [Create React App](https://github.com/facebook/create-react-app).
Resource: [The Web Robots Pages](https://www.robotstxt.org/robotstxt.html)

## src

`index.js`

Initialising component for App.js.

`index.css`

Custom styling for the web app. The majority of styling is provided by Bootstrap.

`App.js`

Routing component to elements based on URL parameters.

### elements

`Home.jsx`

Landing page. Composed of two main sections: Create Event and Access Event.

Create Event makes use of [react-calendar](https://github.com/wojtekmaj/react-calendar) to render the calendar. An event can be created by picking a desired date range on the calendar and providing an event name.

Access Event is used for accessing existing events, indicating participants' unavailable dates within the event date range.

`Event.jsx`

Event page.

Event is identified with the event ID in URL, and the corresponding event details are fetched from the database through the backend server.

The calendar presented represents the current state of the event.

Participants can indicate their unavailable dates by filling in and submitting the form inputs.

`EventError.jsx`

Error page displayed when users try to access events that do not exist.
