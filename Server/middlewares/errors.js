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
    let isString = true;
    const {
      name,
      category,
      description,
      ingredients,
    } = req.body;
    [name, category, description, ingredients].forEach((info) => {
      if (info === undefined) {
        isUndefined = true;
      }
      if (!isUndefined && !alphaNumeric(info)) {
        if (Number.isInteger(parseFloat(info))) {
          isString = false;
        }
      }
      if (!isUndefined) {
        if (info.trim().length < 1) {
          isNull = true;
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
      if(!isUndefined) {
        if (params.trim().length < 1) {
          isNull = true;
        }
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
    } else {
      next();
    }
  }
};

const checkInvalidModification = (req, res, next) => {
  const {
    name,
    category,
    description,
    ingredients,
    } = req.body;
  let modifiedFields = [];
  let isUndefined = false;
  let isNull = false;
  let isString = true;
  [name, category, description, ingredients].forEach((field) => {
    if (field !== undefined) {
      modifiedFields.push(field);
    }
  });
  if (modifiedFields.length === 0) {
    return res.status(400).send({ error: 'Please fill in the properties you want to modify' });
  }
  modifiedFields.forEach((info) => {
    if (info === undefined) {
      isUndefined = true;
    }
    if (!isUndefined && !alphaNumeric(info)) {
      if (Number.isInteger(parseFloat(info))) {
        isString = false;
      }
    }
    if (!isUndefined) {
      if (info.trim().length < 1) {
        isNull = true;
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
  } else {
    next();
  }
};

export default {
  checkNullInput,
  checkInvalidReview,
  checkInvalidModification,
};
