const alphaNumeric = (inputtxt) => {
  const letterNumber = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (inputtxt.match(letterNumber)) {
    return true;
  } else {
    return false;
  }
};

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
      if (!isUndefined && !alphaNumeric(info)) {
        if (Number.isInteger(parseFloat(info))) {
          isString = false;
        }
      }
      if (!isUndefined && typeof info !== 'number') {
        if (info.replace(/\s/g, '').length === 0) {
          isWhiteSpace = true;
        }
      }
    });
    if (isUndefined) {
      return res.status(400).send({ error: 'Please fill in all fields' });
    }
    if (isNull) {
      return res.status(400).send({ error: 'A field does not contain any input' });
    }
    if (!isString) {
      return res.status(400).send({ error: 'Only texts can be inputed' });
    }
    if (isWhiteSpace) {
      return res.status(400).send({ error: 'Your input should not contain only white-spaces' });
    } else {
      next();
    }
  }
};

const checkInvalidReview = (req, res, next) => {
  if (req.method !== 'POST') {
    return res.status(400).send({ error: 'Invalid request method' });
  } else {
    let isUndefined = false;
    let isNull = false;
    const { message } = req.body;
    const { recipeId } = req.params;
    [message, recipeId].forEach((params) => {
      if (params === undefined) {
        isUndefined = true;
      }
      if (params === '') {
        isNull = true;
      }
    });
    if (isUndefined) {
      return res.status(400).send({ error: 'No review message found' });
    }
    if (isNull) {
      return res.status(400).send({ error: 'Your review cannot be empty text' });
    }
    if (!isUndefined && !alphaNumeric(message) && Number.isInteger(parseFloat(message))) {
      return res.status(400).send({ error: 'Your reviews should be text and not numbers' });
    }
    if (message.replace(/\s/g, '').length === 0 && typeof message !== 'number') {
      return res.status(400).send({ error: 'Your review message cannot contain only white spaces' });
    } else {
      next();
    }
  }
};

export default {
  checkNullInput,
  checkInvalidReview,
};
