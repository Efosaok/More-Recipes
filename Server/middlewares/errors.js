const handleError = (req, res, next) => {
  if (req.method !== 'GET') {
    res.send({ message: 'Invalid request method' });
  } else {
    next();
  }
};

export default {
  handleError,
};

