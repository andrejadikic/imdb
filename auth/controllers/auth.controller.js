const bcrypt  =require( 'bcrypt');
const { sequelize,User } = require('../models');
const jwt = require('jsonwebtoken')
//const User  =require( '../../models/user.js');
const Joi =require('joi');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({where: { username: username }});
    
    if (!user) throw new Error('Username not found');
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error('Invalid password');
    if (user.isBanned) throw new Error('Account suspended');
    
    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
        type: user.type,
        banned: user.isBanned,
      },
      process.env.SECRET_KEY,
      { expiresIn: '50h' }
    );
    console.log(token);
    res.status(200).json(`Bearer ${token}`);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { username,password,email} = req.body;
    const passHash = await bcrypt.hash(password, 12);
    //ubacujemo usera u bazu
    const usr = {
      username: username,
      password: password,
      email: email
    }
    console.log(username);
    console.log(password);
    const schema = Joi.object().keys({
      username: Joi.string().min(5).required(),
      password: Joi.string()
        .min(8)
        .max(25)
        .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')).required(),
      email: Joi.string().email().required()
    });
    
    const validate = schema.validate(usr);
    if (validate.error) throw new Error( validate.error.details[0].message);
    const existingUser = await User.findOne({where: {username: username}});
    if (existingUser) throw new Error('Username already in use');
    console.log(username);
    console.log(password);
    usr.password = passHash;
    const user = await User.create(usr);


    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
        type: user.type,
        banned: user.isBanned,
      },
      process.env.SECRET_KEY,
      { expiresIn: '50h' }
    );
    console.log(token);
    res.status(201).json(`Bearer ${token}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.login = login;
exports.register = register;