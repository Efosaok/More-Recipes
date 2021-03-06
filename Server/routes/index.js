import recipeController from '../controllers/recipes';
import errorHandler from '../middlewares/errors';
import auth from '../middlewares/auth';

export default (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to the more-recipes Api' });
  });
  app.post('/api/v1/recipes', auth, errorHandler.checkNullInput, recipeController.addRecipe);
  app.delete('/api/v1/recipes/:recipeId', auth, recipeController.deleteRecipe);
  app.get('/api/v1/recipes', recipeController.getAllRecipes);
  app.post('/api/v1/recipes/:recipeId/reviews', auth, errorHandler.checkInvalidReview, recipeController.postReview);
  app.put('/api/v1/recipes/:recipeId', auth, errorHandler.checkInvalidModification, recipeController.modifyRecipe);
  app.post('/api/v1/recipes/:recipeId/upvote', auth, recipeController.upvoteRecipe);
  app.post('/api/v1/recipes/:recipeId/downvote', auth, recipeController.downvoteRecipe);
  app.get('/api/v1/recipes/:recipeId', recipeController.getARecipe);
  app.post('/api/v1/recipes/:recipeId/favorite', auth, recipeController.favoriteRecipe);
};
