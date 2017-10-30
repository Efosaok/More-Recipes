import userController from '../controllers/users';
import errorHandler from '../middlewares/users';

export default (app) => {
  app.post('/api/v1/users/signup', errorHandler.checkValidUserDetails, userController.signup);
  app.post('/api/v1/users/signin', userController.signin);
};
