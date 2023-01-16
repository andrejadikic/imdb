'use strict';

/*
npm init -y
npm install
npm install express nodemoseqan -save
npm install nodemon cors joi bcrypt dotenv jsonwebtoken
nmp install sequelize
nmp install sequelize mariadb
npm install sequelize-cli
sequelize init
odemo u config (password prazan)
idemo u package.json dodajemo start u script "start": "nodemon index.js",
odemo u terminal obican i kucamo /Applications/xampp/xamppfiles/bin/mysql -u root -p
enter
create database imdb;
show databases;
moze i use imdb; ako je vec napravljena baza

sequelize model:generate --name User --attributes username:string,password:string,email:string,type:string,isBanned:boolean 
sequelize model:generate --name Genre --attributes name:string,description:string
sequelize model:generate --name Movie --attributes title:string,description:string,rating:double,imageUrl:string
sequelize model:generate --name Award --attributes name:string,description:string
sequelize model:generate --name Celebrity --attributes name:string,education:string,imageUrl:string
sequelize model:generate --name Profession --attributes name:string,description:string
sequelize model:generate --name Review --attributes username:string,comment:string,rating:double
sequelize model:generate --name AwardWinners --attributes year:integer
sequelize model:generate --name News --attributes title:string,text:string,author:string
sequelize model:generate --name Event --attributes name:string,location:string,year:integer
sequelize model:generate --name Like 
sequelize model:generate --name MovieCelebrity --attributes role:string
sequelize db:migrate:user.js
sequelize seed:generate --name celebrity

sequelize db:migrate --from 20221214203422-create-celebrity.js
sequelize db:seed --seed 20221220130246-movie.js 

postman u body ono sto saljem
send ono sto primim token bez bearer kopiram u auth u bearer token 

startujemo sa npm start
*/

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
