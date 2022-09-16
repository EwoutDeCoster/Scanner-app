const knex = require("./knex");


function getAll() {
  return knex("artikels").select("*");
}

function getProduct(EAN) {
  let result = knex("artikels")
    .select("*")
    .where('ean', 'like', `${EAN}%`)
    .orderBy([{ column: "naam", order: "asc" }]);
  return result;
}



module.exports = { getAll, getProduct };
