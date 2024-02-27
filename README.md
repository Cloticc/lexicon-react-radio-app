<!-- url https://cloticc.github.io/  -->
# My version of the Radio app

This is my version of the Radio app. I have used the Sveriges Radio API to fetch data and display it in a user-friendly way. The app is built with Vite/React and uses React Router to handle the different pages/views.

## How to run the app

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npm start` to start the app or `npm run dev` to start the app in development mode
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser
5. Enjoy!
6. If you want to run the tests, run `npm test`
7. If you want to build the app, run `npm run build`
8. If you want to deploy the app, run `npm run deploy`
9. If you want to see the deployed app, go to [Radio app](https://cloticc.github.io/lexicon-react-radio-app/)

# Exercise React Radio

In this exercise you will create a Radio application that is using the "Sveriges Radios öppna API". To your help you have this scaffolded repo that includes React Router and Sass. The React router you will need in order to handle the different pages/views but Sass is something that is optional for you.

[Here is a live example of a radio application built with this API](https://sradio.onrender.com/)

<figure>
  <img src="./src/assets/screenshot.png">
</figure>

The API you can find on this link: [Sveriges Radio öppna API](https://sverigesradio.se/api/documentation/v2/index.html)

This API returns XML per default but it can be configure via query parameters to return json instead.

Below you will find a set of user stories that you will follow in order to complete this exercise.

The interpretation of these user stories are rather free and how you decide to showcase them is entirely up to you.

- As a user I want to be able to see a list of all the channels.
- As a user I want to be able to see all the programs on a given channel during "today" and also be able to see what airs "tomorrow" and maybe some day later in the week.
- As a user I want to be able to see all the program that airs on a given channel.
- As a user I want to be able to see a list of all the categories.
- As a user I want to be able to see a list of all the programs in a given category.
- As a user I want to be able to search for a program.
- As a user I want to be able to get information on a specific program.
- As a user I want to be able to see when a specific program airs and on which channel.
- As a user I want to be able to mark program as favorites that I can later view in a seperate view.
