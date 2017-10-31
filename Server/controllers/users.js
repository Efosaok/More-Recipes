import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModels from '../db/models';

dotenv.config();
const { Users } = userModels;

const secret = process.env.SECRET;
console.log(secret);
class User {
  static signup(req, res) {
    const {
      email,
      firstname,
      lastname,
      username,
    } = req.body;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).send({ error: 'An error occurred' });
      }
      const password = hash;
      return Users
        .create({
          firstname,
          lastname,
          username,
          email,
          password,
        })
        .then((user) => {
          const payload = {
            userId: user.id,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '10h', // expires in 1 hours
          });
          res.status(200).send({ message: 'You have successfully signed up', user, token, payload });
        })
        .catch((error) => {
          if (error.message === 'Validation error') {
            res.status(400).send({ error: 'Username or email already exists' });
          } else {
            res.status(400).send({ error: error.message });
          }
        });
    });
  }

  static signin(req, res) {
    const {
      email,
      password,
    } = req.body;
    return Users
      .findOne({
        where: {
          email,
          password,
        },
      })
      .then((user) => {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const payload = {
              userId: user.identifier,
            };
            const token = jwt.sign(payload, secret, {
              expiresIn: '10h', // expires in 1 hours
            });
            res.status(200).send({ message: 'You have successfully logged in', token, payload });
          } else {
            res.status(400);
          }
        });
      })
      .catch(error => res.status(400).send({ error: 'Invalid Username or password' }));
  }
}
export default User;
