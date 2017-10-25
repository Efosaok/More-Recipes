import recipeController from '../controllers/recipes';
import errorHandle from '../middlewares/errors';

export default (app) => {
  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to the more-recipes Api' });
  });

  app.get('/api/addrecipe', errorHandle.handleError, recipeController.addRecipe);
};
