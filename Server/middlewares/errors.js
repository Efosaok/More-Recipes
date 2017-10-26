const handleError = (req, res, next) => {
  if (req.method !== 'POST') {
    res.status(300).send({ message: 'Invalid request method' });
  } else {
    let isUndefined = false;
    const {
      name,
      category,
      description,
      creator,
    } = req.body;
    [name, category, description, creator].forEach((info) => {
      if (info === undefined) {
        isUndefined = true;
      } else {
        next();
      }
    });
    if (isUndefined === true) {
      res.status(401).send({ message: 'Please fill in all fields' });
    }
  }
};

export default {
  handleError,
};
