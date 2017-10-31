import models from '../db/models';

const Recipes = models.Recipes;

class Recipe {
  static addRecipe(req, res) {
    const {
      name,
      category,
      description,
      ingredients,
    } = req.body;
    const { userId } = req.decoded;
    return Recipes
    .create({
      name,
      category,
      description,
      ingredients,
      userId,
    })
    .then(user => res.status(200).send({ message: 'Success, recipe creadte', user }))
    .catch(error => res.status(400).send({ error: 'an error occured' }));
  }

  static deleteRecipe(req, res) {
    const { recipeId } = req.params;
    let isFound = false;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipesDatabase.splice(0, 1);
        isFound = true;
      }
    });
    if (isFound === true) {
      res.status(200).send({ message: 'recipe successfully deleted' });
    } else {
      res.status(400).send({ error: 'recipe you intended to delete does not exist' });
    }
  }

  static getAllRecipes(req, res) {
    const {
      sort,
      order,
    } = req.query;
    let allRecipes;
    if (sort === 'upvotes' && order === 'des') {
      recipesDatabase.sort((a, b) => {
        allRecipes = b.upvotes - a.upvotes;
        res.status(200).send({ message: 'Success', allRecipes });
      });
    } else {
      res.status(200).send(recipesDatabase);
    }
  }

  static getARecipe(req, res) {
    const { recipeId } = req.params;
    let isFound = false;
    let oneRecipe;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        oneRecipe = recipe;
        isFound = true;
      }
    });
    if (isFound) {
      res.status(200).send({ message: 'Success, recipe is found', oneRecipe });
    } else {
      res.status(400).send({ error: 'recipe you intended to find cannot be found' });
    }
  }

  static postReview(req, res) {
    const currentDate = `${new Date()}`;
    const { reviews } = req.body;
    const { recipeId } = req.params;
    const createdAt = currentDate.slice(0, 24);
    const updatedAt = currentDate.slice(0, 24);
    reviewIdTracker += 1;
    const id = reviewIdTracker;
    const response = {
      id,
      reviews,
      recipeId,
      createdAt,
      updatedAt,
    };
    reviewsDatabase.push(response);
    let isFound = false;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipe.reviews += 1;
        recipe.updatedAt = updatedAt;
        isFound = true;
      }
    });
    if (isFound) {
      res.status(200).send({ message: 'Success, Your review has been saved', response });
    } else {
      res.status(400).send({ message: 'The recipe you intended to review cannot be found' });
    }
  }

  static modifyRecipe(req, res) {
    const { recipeId } = req.params;
    const currentDate = `${new Date()}`;
    let recipeIsFound = false;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipe.name = req.body.name || recipe.name;
        recipe.category = req.body.category || recipe.category;
        recipe.creator = req.body.creator || recipe.creator;
        recipe.ingredients = req.body.ingredients || recipe.ingredients;
        recipe.updatedAt = currentDate.slice(0, 24);
        recipeIsFound = true;
      }
    });
    if (recipeIsFound) {
      res.status(201).send({ message: 'Success, Your recipe has been updated' });
    } else {
      res.status(400).send({ message: 'The recipe you intended to modify cannot be found' });
    }
  }

  static upvoteRecipe(req, res) {
    const { recipeId } = req.params;
    const currentDate = `${new Date()}`;
    let isFound = false;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipe.upvotes += 1;
        recipe.updatedAt = currentDate.slice(0, 24);
        isFound = true;
      }
    });
    if (isFound) {
      res.status(200).send({ message: 'Success, You have successfully upvoted the recipe' });
    } else {
      res.status(400).send({ error: 'The recipe you intended to upvote cannot be found' });
    }
  }

  static downvoteRecipe(req, res) {
    const { recipeId } = req.params;
    const currentDate = `${new Date()}`;
    let isFound = false;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipe.downvotes += 1;
        recipe.updatedAt = currentDate.slice(0, 24);
        isFound = true;
      }
    });
    if (isFound) {
      res.status(200).send({ message: 'Success, You have successfully downvoted the recipe' });
    } else {
      res.status(400).send({ error: 'The recipe you intended to downvote cannot be found' });
    }
  }
}

export default Recipe;
