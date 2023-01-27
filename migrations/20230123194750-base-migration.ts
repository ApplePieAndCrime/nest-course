'use strict';

const { QueryTypes } = require('sequelize');
// const { NestFactory } = require('@nestjs/core');
const { User } = require('../src/users/users.model.ts');
// const UsersService = require('../src/users/users.service.ts');
// const { AppModule } = require('../src/app.module.ts');

// !NOT WORK: Cannot use import statement outside a module
// возможно конфликт TS и JS

const nowDate = new Date().toISOString();
// init data
const roles = [
  {
    id: 1,
    value: 'ADMIN',
    description: 'Администратор',
    createdAt: nowDate,
    updatedAt: nowDate,
  },
  {
    id: 2,
    value: 'USER',
    description: 'Пользователь',
    createdAt: nowDate,
    updatedAt: nowDate,
  },
];

const users = [
  {
    id: 1,
    email: 'admin@mail.ru',
    password: 'admin',
    createdAt: nowDate,
    updatedAt: nowDate,
  },
  {
    id: 2,
    email: 'user@mail.ru',
    password: 'user',
    createdAt: nowDate,
    updatedAt: nowDate,
  },
];

const userRoles = [
  {
    id: 1,
    roleId: 1,
    userId: 1,
  },
  {
    id: 2,
    roleId: 2,
    userId: 2,
  },
];

/** @type {require('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    //     const records = [
    //       { id: 1, field_name: 'field value' },
    //       { id: 2, field_name: 'field value' },
    //       { id: 3, field_name: 'field value' },
    //  ];

    //  module.exports = {
    //    up: function(queryInterface, Sequelize) {
    //      const promises = records.map((r) => queryInterface.sequelize.query(`
    //        UPDATE table_name
    //        SET field_name = :field_name
    //        WHERE id = :id
    //      `, {
    //          replacements: r
    //      });

    //      return Promise.all(promises);
    //    },

    //    //.....
    //  };
    console.log('hello');

    // ${dataSet.map(row => `(${Object.keys(row).toString()})`)}
    const createBaseTables = async (tableName, dataSet) => {
      try {
        // const sqlQuery =
        //   `INSERT INTO public.${tableName} (${`${Object.keys(dataSet[0]).map(
        //     value => `"${value}"`
        //   )}`}) ` +
        //   `VALUES ${dataSet.map(
        //     row => `(${Object.values(row).map(value => `'${value}'`)})`
        //   )}`;
        // console.log({ sqlQuery });

        // const result = await queryInterface.sequelize.query(sqlQuery, {
        //   type: QueryTypes.INSERT,
        // });

        const result = await queryInterface.bulkInsert('users', dataSet);

        console.log(`table ${tableName} is ready...`);
        console.log({ result });
        return result;
      } catch (err) {
        console.log(`table:${tableName} err:${err}`);
      }
    };
    // const usersRepository = await queryInterface.connection.getRepository(User);

    // console.log({ usersRepository });
    // const data = await usersRepository.findAll();
    // console.log({ data });
    // await createBaseTables('users', users);

    // await createBaseTables('roles', roles);

    // await createBaseTables('user_roles', userRoles);

    // const application = await NestFactory.createApplicationContext(AppModule);
    // const usersService = application.get(UsersService);
    // console.log({ usersService });
    // const users = await usersService.getAllUsers();
    console.log({ users });

    // await application.close();
    // process.exit(0);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    const removeBaseTables = tableName => {
      const result = queryInterface.bulkDelete(tableName, null, {});
      console.log(`table ${tableName} deleted...`);
      return result;
    };

    await removeBaseTables('users');
    await removeBaseTables('roles');
    await removeBaseTables('user_roles');
  },
};

