const request = require('supertest');
const app = require('../server/server.js');
const { Leagues, Admin, Teams, Players, Schedule } = require('../database/model/postgresDB');


describe('root route', () => {
	it('returns a 200 status code', (fin) => {
		request(app)
			.get('/')
			.expect(200)
			.end(err =>{
			 	if(err) console.error(err); fin()});
	});
	
	it('returns HTML', (done) => {
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);
	});

});

describe("admin route", function(){
	const username = 'root';
	const password = 'toor';

	before( function() {
		Admin.create({ username, password })
			.then(() => { 
				console.log('ADMIN ADDED UP IN THAT TEST DOE'); 
			})
			.catch(err => {
				console.error(err)
			});
	});

	after( function() {
		Admin.destroy({ where: { username, password } })
			.then(() => console.log("deleted admin"))
			.catch((err) => console.log("error deleting admin", err));
	});

	it("returns a 200 status code", function(done){
		request(app)
			.get('/admin')
			.expect(200,done);
	});

	it("validates admin login", function(done){
		request(app)
			.post('/admin/login')
			.send({ 'username': '', 'password': '' })
			.expect(400, done);
	});

	it("logs in valid user", function(done){
		request(app)
			.post('/admin/login')
			.send({ 'username': 'ROOT', 'password': 'TOOR' })
			.expect(200, done);
	});

	it("should not log in invalid user", function(done){
		request(app)
			.post('/admin/login')
			.send({ 'username': 'rooty', 'password': 'ytoor' })
			.expect(400, done);
	});
	
	it("deletes an admin", function(done){
		request(app)
			.post('/admin/delete')
			.send({ 'username':'root', 'password': 'toor' })
			.expect(201, done);
	});
});

describe("league route", function(){

	it("returns a 200 status code", function(done){
		request(app)
			.get("/league")
			.expect(200, done)
	});

	it('returns json', (done) => {
		request(app)
			.get('/league')
			.expect('Content-Type', /json/, done);
	});
	
	it('can return all leauges', (done => {
		request(app)
			.get('/league')
			.expect(200,done);
	}));

	it('can return just one league', (done => {
		request(app)
			.get('/league/1/')
			.expect('Content-Length', /112/,  done);
	}));

});

describe("league adding and removing", function(){
	it("should add new league", function(done){
		request(app)
			.post('/league')
			.send({ 'name': 'TESTLEAGUE' })
			.expect(200, done);
	});

	it("should retrieve newly added league", function(done){
		request(app)
			.get('/league/1/')
			.expect('Content-Type', /json/, done);	
	});
});
describe("player behavior", function(){
	const data = {
				'firstname': 'testPlayerFirstName',
				'lastname': 'testPlayerLastName',
				'teamname': 'testPlayerTeamName',
				'battingavg': 0,
				'hits': 100,
				'atbats': 100,
				'homeruns': 100
		}

	it("should add a new player", function(done){
		request(app)
			.post('/admin/player/addPlayer')
			.send(data)	
			.expect(200,done);	
	});
});

describe('schedule behavior', function(){
	const data = { 'data': 'test data goes here' };
	
	it('should return all schedules', function(done){
		request(app)
			.get('/schedule')
			.expect(200,done);
	})

	it('should return json', function(done){
		request(app)
			.get('/schedule')
			.expect('Content-Type', /json/, done);
	})

	it('should return on schedule', function(done){
		request(app)
			.get('/schedule/1')
			.expect(200,done);
	})

	it('should add a schedule', function(done){
		request(app)
			.post('/schedule')
			.send(data)
			.expect(200,done);
	});

	it('should delete a schedule', function(done){
		request(app)
			.post('/schedule/1')
			.expect(200,done);
		
		request(app)
			.get('/schedule/1')
			.expect(404,done);

	});	
});
