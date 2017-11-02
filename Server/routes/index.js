import Recipes from '../controllers/recipes';
import errorHandler from '../middlewares/errors';

const recipeController = new Recipes();

export default (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to the more-recipes Api' });
  });

  app.post('/api/recipes', errorHandler.handleError, recipeController.addRecipe);
  app.delete('/api/recipes/:recipeId', recipeController.deleteRecipe);
};
