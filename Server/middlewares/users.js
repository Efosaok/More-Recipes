const isValidEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([ \.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
};

const checkValidUserDetails = (req, res, next) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    confirmpassword,
  } = req.body;
  const matchingDetails = {
    0: 'firstname',
    1: 'lastname',
    2: 'username',
    3: 'email',
    4: 'password',
    5: 'confirmpassword',
    };
  const reqBody = [firstname, lastname, username, email, password, confirmpassword];
  let undefinedBody;
  let isNull = false;
  for (let i = 0; i < reqBody.length; i += 1) {
    if (reqBody[i] === undefined) {
      undefinedBody = matchingDetails[i];
    }
    if (reqBody[i] === '') {
      isNull = true;
    }
  }
  if (undefinedBody) {
    return res.status(400).send({ error: `Please input ${undefinedBody}` });
  }
  if (!isValidEmail(email)) {
    return res.status(400).send({ error: 'Please enter a valid email' });
  }
  if (isNull) {
    return res.status(400).send({ error: 'An input field cannot be blank' });
  }
  if (!undefinedBody && Number.isInteger(parseFloat(firstname || lastname || username))) {
    return res.status(400).send({ error: 'Your names cannot be digits only' });
  } else {
    next();
  }
};

export default {
  checkValidUserDetails,
};
