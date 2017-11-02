## status
[![Coverage Status](https://coveralls.io/repos/github/Efosaok/More-Recipes/badge.svg?branch=development)](https://coveralls.io/github/Efosaok/More-Recipes?branch=development) [![Build Status](https://travis-ci.org/Efosaok/More-Recipes.svg?branch=development)](https://travis-ci.org/Efosaok/More-Recipes) [![Maintainability](https://api.codeclimate.com/v1/badges/1d2147dde2b3b480038b/maintainability)](https://codeclimate.com/github/Efosaok/More-Recipes/maintainability)
# More-Recipes
More-Recipes provides a platform for users to share the awesome and exciting  recipe ideas they have invented or learnt.  Suppose a user comes up with a recipe,  he/she can post it on More-Recipes and  get feedback in form of reviews and votes from other users who explore that recipe. Users can also keep a list of their favorite recipes on the application.

## Getting Started
More recipes v1.0.0-beta is a Node.js app built with the express framework
It runs on node version 5.x.x


### Installing

run `npm install`
run `npm run start:dev` to get the app running
console should log api running on port 3000


### Api Endpoints
All dependencies can be found in package.json file,all listed below
  *POST* /api/v1/users/signup   ``//signup route 

  *POST* /api/v1/users/signin  ``//signin route

  *POST* /api/v1/recipes  ``//add a recipe route

  *DELETE* /api/v1/recipes/<recipeId>  ``//delete a recipe from db route

  *PUT*  /api/v1/recipes/<recipeId>  ``//route to modify a recipe

  *POST* /api/v1/recipes/<recipeId>/reviews  ``//route to post a review

  *GET* /api/v1/recipes/<recipeId>/  ``//route to get a recipe

  *GET*  /api/v1/recipes/  ``//route to get all recipes

  *GET*  /api/v1/users/<recipeId>/favorites ``route to get all favorites recipes of a particular user

  *POST* /api/v1/recipes/<recipeId>/upvote    ``// route to upvote a recipe

  *POST* /api/v1/recipes/<recipeId>/downvote   ``// route to downvote a recipe

  *POST* /api/v1/recipes/<recipeId>/favorite     ``// route to favorite a recipe
    
## Running the tests

After successfully Installing The App,To run tests,
run `npm tests

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* NodeJs
* express
* sequelize
* Postgresql

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/Efosaok/morerecipes) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [Slate](http://semver.org/) Documentation

## Authors

* Solo Project By Efosa Okpugie

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
