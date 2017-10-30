import recipeController from '../controllers/recipes';
import errorHandler from '../middlewares/errors';

export default (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to the more-recipes Api' });
  });
  app.post('/api/v1/recipes', errorHandler.checkNullInput, recipeController.addRecipe);
  app.delete('/api/v1/recipes/:recipeId', errorHandler.checkInvalidParams, recipeController.deleteRecipe);
  app.get('/api/v1/recipes', recipeController.getAllRecipes);
  app.post('/api/v1/recipes/:recipeId/reviews', errorHandler.checkInvalidReview, recipeController.postReview);
  app.put('/api/v1/recipes/:recipeId', errorHandler.checkInvalidParams, recipeController.modifyRecipe);
  app.post('/api/v1/recipes/:recipeId/upvote', recipeController.upvoteRecipe);
  app.post('/api/v1/recipes/:recipeId/downvote', recipeController.downvoteRecipe);
  app.get('/api/v1/recipes/:recipeId', errorHandler.checkInvalidParams, recipeController.getARecipe);
};
