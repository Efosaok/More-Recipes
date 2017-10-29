import db from '../db/database.json';

const recipesDatabase = db.recipes;
const reviewsDatabase = db.reviews;
let idTracker = 0;
let reviewIdTracker = 0;
class Recipes {
  static addRecipe(req, res) {
    const {
      name,
      category,
      description,
      creator,
      ingredients,
    } = req.body;
    const currentDate = `${new Date()}`;
    const createdAt = currentDate.slice(0, 24);
    const updatedAt = currentDate.slice(0, 24);
    const upvotes = 0;
    const downvotes = 0;
    const reviews = 0;
    idTracker += 1;
    const id = idTracker;
    const response = {
      id,
      name,
      category,
      ingredients,
      creator,
      description,
      createdAt,
      updatedAt,
      upvotes,
      downvotes,
      reviews,
    };
    recipesDatabase.push(response);
    res.status(200).send({ message: 'Recipe Successfully saved and created', response });
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
      res.status(400).send({ message: 'Invalid request sent' });
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
      return allRecipes;
      res.status(200).send({ message: 'Success', allRecipes });
    });
  	}
    res.status(200).send(recipesDatabase);
  }

  static postReview(req, res) {
    const currentDate = '' + new Date();
    const { reviews } = req.body;
    const { recipeId } = req.params;
    const createdAt = currentDate.slice(0, 24);
    const updatedAt = currentDate.slice(0, 24);
    const response = {
      reviews,
      recipeId,
      createdAt,
      updatedAt,
    };
    reviewsDatabase.push(response);
    let isFound = false
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === parseFloat(recipeId)) {
        recipe.reviews += 1;
        recipe.updatedAt = updatedAt;
        isFound = true
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
      res.status(400).send({ message: 'The recipe you intended to upvote cannot be found' });
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
      res.status(400).send({ message: 'The recipe you intended to downvote cannot be found' });
    }
  }

  static getRecipesByUpvotes(req, res) {
    let allRecipes;
    recipesDatabase.sort((a, b) => {
      allRecipes = b.upvotes - a.upvotes;
    });
    res.status(200).send({ message: 'Success', allRecipes });
  }
}

export default Recipes;
