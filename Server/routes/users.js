import userController from '../controllers/users';
import errorHandler from '../middlewares/users';
import auth from '../middlewares/auth';

export default (app) => {
  app.post('/api/v1/users/signup', errorHandler.checkValidUserDetails, userController.signup);
  app.post('/api/v1/users/signin', userController.signin);
  app.get('/api/v1/users/:userId/recipes', auth, userController.getUserFavoriteRecipes);
};
