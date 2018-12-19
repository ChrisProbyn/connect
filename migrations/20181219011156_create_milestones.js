
exports.up = function(knex, Promise) {
    return knex.schema.createTable('milestones', (table) => {
        table.increments();
        table.string('description');
        table.timestamps();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('milestones');
};
