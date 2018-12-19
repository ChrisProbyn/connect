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



function convert(input) {
  return input.map(row => {
    var year = row.birthdate.getFullYear();
    var month = row.birthdate.getMonth()+1;
    if(month < 10){
      month = "0" + month.toString()
    }
    var day = row.birthdate.getDate(); 
    if(day < 10){
      day = "0" + day.toString()
    } 
    var birthdate = `${year}-${month}-${day}`
    return Object.assign({}, row, { birthdate })
  })
}


const search = process.argv[2];

knex('famous_people').where({first_name: search})
    .asCallback((err,res) => {
        console.log("Searching ...");
        const people = convert(res)
        people.forEach((person, index) => {
            console.log(`${index+1}: ${person.first_name} ${person.last_name}, born ${person.birthdate} ` )
        })
        knex.destroy()
    })
      
    






