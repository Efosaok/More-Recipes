import db from '../db/database.json';

const recipesDatabase = db.recipes;
let idTracker = 0;

class Recipes {
  addRecipe(req, res) {
    const {
      name,
      category,
      description,
      creator,
    } = req.body;
    const currentDate = '' + new Date();
    const createdAt = currentDate.slice(0, 24);
    const updatedAt = currentDate.slice(0, 24);
    const upvotes = 0;
    const downvotes = 0;
    const reviews = '';
    idTracker += 1;
    const id = idTracker;
    const response = {
      id,
      name,
      category,
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

  deleteRecipe(req, res) {
    const { id } = req.params;
    let isFound = true;
    recipesDatabase.forEach((recipe) => {
      if (recipe.id === id) {
        recipesDatabase.splice(recipesDatabase.indexOf(recipe), 1);
      } else {
        isFound = false;
      }
    });
    if (isFound === false) {
      res.status(401).send({ message: 'Invalid request sent' });
    } else {
      res.send(200).send({ message: 'recipe successfully deleted' });
    }
  }
}

export default Recipes;
