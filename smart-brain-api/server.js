const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'admin',
    database : 'smart-brain'
  }
});

knex.select('*').from('users').then(data =>{

	console.log(data);

});


const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {

	users: [
	{
		id: '123',
		name: 'John',
		email: 'john@gmail.com',
		password:'cookies',
		entries: 0,
		joined: new Date()

	},
		{
		id: '124',
		name: 'Sally',
		email: 'Sally@gmail.com',
		entries: 0,
		joined: ''

	}


	],
	login:[
	{

		id:'987',
		hash:'',
		email:'john@gmail.com'
	}
	]

}


app.get('/', (req, res) => {

	res.send(database.users);

})

app.post('/signin', (req, res) =>{

	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
		res.json("Success");
	} else {

		res.status(400).json('error logging in');

	}
	

})

app.post("/register", (req, res)=>{
	const { email, name, password} = req.body;
	knex('users')
	.returning('*')
	.insert({
		email: email,
		name: name,
		joined: new Date()
	})
	.then(user => {

	res.json(user[0]);

	})
	.catch(err => res.status(400).json('unable to join'))

	
})

	

app.get('/profile/:id', (req, res) =>{

	const {id} = req.params;
	knex.select('*').from('users').where({id})
	.then(user => {
		if ( user.length){

				res.json(user[0]);

		}else{
			res.status(400).json('not found')
		}

	})

	.catch(err => res.status(400).json('error getting user'))



})

app.put('/image', (req, res)=>{

	const {id} = req.body;
	let found = false;

	database.users.forEach(user => {
		if(user.id===id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}

	})
	if(!found){
		res.status(400).json('User not found');
	}

})

app.listen(3000, ()=> {

console.log('app is running on port 3000')



})


//bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
//});
// Load hash from your password DB.
//bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
//});
//bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
//});

/*
	/ -----> res = this is working
	/ signin --> POST = success/fail
	/register --> Post = user
	/profile/:userID --> GET = user
	/image --> Put ---> user


*/