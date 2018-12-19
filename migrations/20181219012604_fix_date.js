
exports.up = function(knex, Promise) {
    return knex.schema.table('milestones', (table) => {
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
        table.date('date_achieved');
        
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.createTable('milestones', (table) => {
        table.timestamps();
        table.dropColumn('date_achieved');
    });
};
