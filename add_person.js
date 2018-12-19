const settings = require("./settings"); // settings.json
var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });
  const firstName = process.argv[2];
  const lastName = process.argv[3];
  const DOB = process.argv[4];
  
  knex('famous_people').returning('id').insert({first_name: firstName,last_name: lastName,birthdate: DOB}).asCallback((err, res) =>{
      if (err) {
          console.log('error:', err);
      } 
      knex.destroy();
  })
  
 