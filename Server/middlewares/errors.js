const checkNullInput = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(300).send({ message: 'Invalid request method' });
  } else {
    let isUndefined = false;
    let isNull = false;
    let isWhiteSpace = false;
    let isString = true;
    const {
      name,
      category,
      description,
      creator,
      ingredients,
    } = req.body;
    [name, category, description, creator, ingredients].forEach((info) => {
      if (info === undefined) {
        isUndefined = true;
      }
      if (info === '') {
        isNull = true;
      }
      if (!isUndefined) {
        if (info.replace(/\s/g, '').length) {
          isWhiteSpace = false;
        }
      }
      if (Number.isInteger(parseFloat(info))) {
        isString = false;
      }
    });
    if (isUndefined) {
      return res.status(401).send({ message: 'Please fill in all fields' });
    }
    if (isNull) {
      return res.status(400).send({ message: 'A field does not contain any input' });
    }
    if (!isString) {
      return res.status(400).send({ message: 'Only texts can be inputed' });
    }
    if (isWhiteSpace) {
      return res.status(400).send({ message: 'Your input should not contain only white-spaces' });
    } else {
      next();
    }
  }
};

const checkInvalidParams = (req, res, next) => {
  const { recipeId } = req.params;
  if (typeof (recipeId) !== 'string') {
    return res.status(400).send({ message: 'hey ,You sent a bad request' });
  } else {
    next();
  }
};

const checkInvalidReview = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(300).send({ message: 'Invalid request method' });
  } else {
    let isUndefined = false;
    let isNull = false;
    const { reviews } = req.body;
    const { recipeId } = req.params;
    [reviews, recipeId].forEach((params) => {
      if (params === undefined) {
        isUndefined = true;
      }
      if (params === '') {
        isNull = true;
      }
    });
    if (Number.isInteger(parseFloat(reviews))) {
      return res.status(400).send({ message: 'Your reviews should be text and not numbers' });
    }
    if (isUndefined) {
      return res.status(400).send({ message: 'No review message found' });
    }
    if (isNull) {
      return res.status(400).send({ message: 'Your review cannot be empty text' });
    } else {
      next();
    }
  }
};

export default {
  checkNullInput,
  checkInvalidReview,
  checkInvalidParams,
};
