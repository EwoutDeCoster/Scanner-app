const knex = require("knex");

const connectedKnex = knex({
  client: "sqlite",
  connection: {
    filename: "/root/selfscanapp/api/database.sqlite",
  },
});

module.exports = connectedKnex;
