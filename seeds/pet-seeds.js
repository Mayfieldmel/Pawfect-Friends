const sequelize = require('../config/connection');
const { Pet, Post } = require('../models');

const petData = [
  {
    pet_name: 'alesmonde0',
    email: 'nwestnedge0@cbc.ca',
    password: 'password123'
  },
  {
    pet_name: 'jwilloughway1',
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    pet_name: 'iboddam2',
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    pet_name: 'dstanmer3',
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    pet_name: 'djiri4',
    email: 'gmidgley4@weather.com',
    password: 'password123'
  },
  {
    pet_name: 'msprague5',
    email: 'larnout5@imdb.com',
    password: 'password123'
  },
  {
    pet_name: 'mpergens6',
    email: 'hnapleton6@feedburner.com',
    password: 'password123'
  },
  {
    pet_name: 'tpenniell7',
    email: 'kperigo7@china.com.cn',
    password: 'password123'
  },
  {
    pet_name: 'msabbins8',
    email: 'lmongain8@google.ru',
    password: 'password123'
  },
  {
    pet_name: 'jmacarthur9',
    email: 'bsteen9@epa.gov',
    password: 'password123'
  }
];

const seedPets = () => Pet.bulkCreate(petData, {individualHooks: true});

module.exports = seedUsers;
