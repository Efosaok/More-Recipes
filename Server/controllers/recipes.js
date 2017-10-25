import db from '../db/database.json';

const addRecipe = (req, res) => {
  const idCounter = db.recipes.length + 1;
  db.recipes.push({ id: idCounter, name: 'efosa', description: 'hweerjhreh' });
  res.status(200).send(db);
};

export default{
  addRecipe,
};
