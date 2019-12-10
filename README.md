# Prince George County Polling Place Locator

Help you locate your nearby polling place for Prince George county residents

Target Platform: Desktop and Laptop Browsers

You can check our online webpage on Heroku [here](https://murmuring-beach-84961.herokuapp.com/)

You can check our user manual [here](https://murmuring-beach-84961.herokuapp.com/docs/user.md)

You can check our developer manual [below](#developer-manual)


## Developer Manual
- Prerequisites:
	- Make sure that you have [node](https://nodejs.org/en/download/) installed. Verify that it is installed by running `node -v`

- Setting up the application on a Mac/Windows/Linux machines:
	- Download the source code from the [GitHub repo](https://github.com/aquat3/PG-County-Polling-places)
	- Run `npm install` to install all the required packages and dependencies
	- To start the server, run `npm start` and navigate to `localhost:3000` to see the app in the browser

- Endpoints:
	- `POST` `/form_search`, This endpoint takes a geocoded address (geocoded by the Google Maps Platform’s geocoding API) and returns a list of nearby polling places that are within a 1-mile radius from the request address.

	- `GET` `/about` Returns text information about the application

	- `GET` `/doc` Returns the documentation page

	- `PUT` `/put` Doesn’t do anything. Returns a non-existant 404 error page
