const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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

function findPeople(db) {
    const sqlText = 'SELECT * FROM famous_people WHERE first_name = $1'
    const search = process.argv[2];
    db.query(sqlText, [search], (err,res) => {
        console.log("Searching ...")
        const people = convert(res.rows)
        console.log(`Found ${people.length} person(s) by the name '${search}': `)
        people.forEach((person, index) => {
          console.log(`${index+1}: ${person.first_name} ${person.last_name}, born ${person.birthdate} ` )
        })
        client.end()
    })
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  findPeople(client);
});
