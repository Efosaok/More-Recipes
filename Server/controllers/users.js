import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModels from '../db/models';

dotenv.config();
const { Users } = userModels;

const secret = process.env.SECRET;
console.log(process.env.SECRET);
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
      return Users
        .create({
          firstname,
          lastname,
          username,
          email,
          password: hash,
        })
        .then((user) => {
          const payload = {
            userId: user.identifier,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: '10h', // expires in 1 hours
          });
          res.status(200).send({ message: 'You have successfully signed up', user, token });
        })
        .catch(error => res.status(400).send(error.message));
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
            res.status(400).send({ error: 'Invalid Username or Password' });
          }
        });
      })
      .catch(error => res.status(400).send({ error: 'an error occurred' }));
  }
}
export default User;
