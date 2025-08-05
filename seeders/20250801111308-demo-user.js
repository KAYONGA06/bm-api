'use strict';

const {v4:uuidv4 } = require('uuid');

module.exports ={

  async up (queryInterface,sequelize){

    await queryInterface.bulkInsert('Users',[

      {
      
        firstName:'qwerty',
        lastName:'zero',
        email:'example@gmail.com',
        createdAt: new Date(),
        updatedAt:new Date(),



      },
{
       
        firstName:'kayonga',
        lastName:'sam',
        email:'wert@gmail.com',
        createdAt: new Date(),
        updatedAt:new Date(),

}


    ]);

  },

 down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {}); 
},

};



