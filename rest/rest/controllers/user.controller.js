const { sequelize, User } = require('../../models');
const Joi = require('joi');
var  {schemaUser, schemaUserUpdate}  = require('../../common/joivalidate.js');
const bcrypt  = require( 'bcrypt');
const jwt  =require( 'jsonwebtoken');



const getUsers = async (req, res) => {
  try {
    res.status(200).json(await User.findAll());
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const updateUsers = async (req, res) => {
    try {
      const { username, password, email, type, id} = req.body;
      const user = await User.findOne({where: { username: username }});
      if (!user) throw new Error('Username not found');
      if (password === user.password){
        const usr = {
          username: username,
          email: email,
          type: type
        }
        const validate = schemaUserUpdate.validate(usr);
        if (validate.error) throw new Error( validate.error.details[0].message);
        
        await User.update({
          username,
          password:user.password,
          email,
          type
        }, { where: 
          {id} 
        })
        .then(user=>{
          const token = jwt.sign(
            {
              username: user.username,
              id: user.id,
              type: user.type,
              banned: user.isBanned,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30h' }
          );
          res.status(201).json(`Bearer ${token}`);
        })
      }else{
        const passHash = await bcrypt.hash(password, 12);
        const usr = {
          username: username,
          password: password,
          email: email
        }
        const validate = schemaUser.validate(usr);
        if (validate.error) throw new Error( validate.error.details[0].message);
        console.log(id);
      
        await User.update({
          username,
          password:passHash,
          email,
          type
        }, { where: 
          {id} 
        })
        .then(user=>{
          const token = jwt.sign(
            {
              username: user.username,
              id: user.id,
              type: user.type,
              banned: user.isBanned,
            },
            process.env.SECRET_KEY,
            { expiresIn: '30h' }
          );
          res.status(201).json(`Bearer ${token}`);
        })
      }
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
};

const deleteUsers = async (req, res) => {
  const {username}  = req.body;

  console.log(username);
  try {
    await User.destroy({
      where: {
        username
      }
    })
    .then(user =>{
      res.status(200).json(user);
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateProfile = async (req, res) => {
  try {
    const {username, password, email} = req.body;
    
    const id = req.locals.userId;
    const type = req.locals.userType;
    const user = await User.findOne({where: { id}});

    if (password === user.password){
      const usr = { username, email, type}
      const validate = schemaUserUpdate.validate(usr);
      if (validate.error) throw new Error( validate.error.details[0].message);
      
      await User.update({
        username,
        password:user.password,
        email,
        type
      }, { where: 
        {id} 
      })
      .then(user=>{
        const token = jwt.sign(
          {
            username: user.username,
            id: user.id,
            type: user.type,
            banned: user.isBanned,
          },
          process.env.SECRET_KEY,
          { expiresIn: '30h' }
        );
        res.status(201).json(`Bearer ${token}`);
      })
    }else{
      const passHash = await bcrypt.hash(password, 12);
      const usr = {username, password, email};
      const validate = schemaUser.validate(usr);
      if (validate.error) throw new Error( validate.error.details[0].message);
      console.log(id);
    
      await User.update({
        username,
        password:passHash,
        email,
        type
      }, { where: 
        {id} 
      })
      .then(user=>{
        const token = jwt.sign(
          {
            username: user.username,
            id: user.id,
            type: user.type,
            banned: user.isBanned,
          },
          process.env.SECRET_KEY,
          { expiresIn: '30h' }
        );
        console.log(password);
        res.status(201).json(`Bearer ${token}`);
      })
    }
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const username = req.locals.username;
    res.status(200).json(await User.findOne({where: { username }}));
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};


// module.exports = {getUsers,deleteUsers,updateUsers};
module.exports.getProfile = getProfile;
module.exports.updateProfile = updateProfile;

module.exports.getUsers = getUsers;
module.exports.deleteUsers = deleteUsers;
module.exports.updateUsers = updateUsers;