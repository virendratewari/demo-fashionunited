# Nodejs Rest API using sequelize mysql database

To run, you just have MongoDB installed and running, and NodeJS installed.

* Clone the repo
* `npm install -g sequelize-cli` to run sequelize commond like to create migration file and seeder
* Update database credentials in `server/config/config.json` .
* For more info open https://github.com/sequelize/sequelize  
* `npm install` to install API dependencies.
* Run `sequelize db:migrate` to create db tables
* Run `npm run start:dev` to start the API
* Run `npm run test` to run unit test(with mocha and chai).
* Open http://localhost:3000 to see the application
* To check all APIs please import `fashionunited.postman_collection.json` postman file.