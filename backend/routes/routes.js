var express = require('express');
var User = require('../models/User');
var Node = require('../models/Node');
var Project = require('../models/Project');

//Get the router
var router = express.Router();

//frontend url
var client = 'http://localhost:8080';

//Middleware for all this routers requests
router.use(function timeLog(req, res, next){
	console.log('Request Received: ', dateDisplayed(Date.now()));

	//Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', client);

	//Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	//Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	//Set to true if you need the website to include cookies in the requests sent
	//to the API(e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	//Pass to next layer of middleware
	next();
});

//Welcome message for a GET at http://localhost:3001/
router.get('/', function(req, res){
	res.json({ message: 'Welcome to Kai Yu REST API ' });
});

//=====================USER==================================
//GET all users (using a GET at http://localhost:3001/users)
router.route('/users').get(function(req, res) {
	User.find(function(err, users) {
		if(err)
			res.send(err);
		res.json({ users: users });
	});
});

//POST a user (using POST at http://localhost:3001/addUser)
router.route('/addUser').post(function(req, res){
	var newUser = new User();

	//Set the user attributes
	newUser.user = req.body.user;
	newUser.password = req.body.password;
	newUser.email = req.body.email;
	newUser.firstName = req.body.firstName;
	newUser.lastName = req.body.lastName;

	newUser.save(function(err) {
		if(err)
			res.send(err);
		res.json({ newUser: 'Successfully created new user'});
	});
});

//POST authenticate user login(using POST at http://localhost:3001/login)
router.route('/login').post(function(req, res){
	var username = req.body.identifier;
	var password = req.body.password;

	User.findOne({ user: username }, function(err, user) {
		//401 means user is unknown
		if(!user) {
			res.json({
				code: 401,
				status: 'fail',
				message: 'User does not exist'
			});
		}
		else if(password === user.password) {
			res.json({
				status: 'success',
				user: user,
				message: 'Successfully login'
			});
		}
		else {
			res.json({
				code: 403,
				status: 'fail',
				message: 'Invalid password'
			})
		}
	});
});
//==================================================================

//=======================Project====================================
//POST a new project (using POST at http://localhost:3001/addProject)
router.route('/addProject').post(function(req, res){
	var newProject = new Project();

	//Set the Project attributes
	newProject.title = req.body.title;
	newProject.desc = req.body.desc;
	newProject.deadline = req.body.deadline;
	newProject.users = req.body.users; //must a string array
	// newProject.nodes = req.body.nodes; //must be a node array

	newProject.save(function(err, result) {
		if(err)
			res.json({
				status: 'fail',
				message: 'Sorry, unable to add new project'
			})
			//res.send(err);
		else
			res.json({ 
				status: 'success',
				message: 'Successfully added a new project',
				id: result._id
			})
	});
});

//GET all projects (using GET at http://localhost:3001/projects)
router.route('/projects').get(function(req, res) {
	Project.find(function(err, projects) {
		if(err)
			res.send(err);
		res.json(projects);
	});
});

//GET all projects that the user is working on (using GET at http://localhost:3001/projects/:user)
router.route('/projects/:user').get(function(req, res) {
	Project.find({users: {$elemMatch:{$eq:req.params.user}}}, function(err, projects) {
		if(err)
			res.send(err);
		res.json(projects);
	});
});

// Update project title, desc, deadline....
//PUT update project (using PUT at http://localhost:3001/updateProject/:project_id)
router.route('/updateProject/:project_id').put(function(req, res) {
	Project.findByIdAndUpdate(req.params.project_id, 
							{ $set: { title: req.body.title,
									  desc: req.body.desc,
									  deadline: req.body.deadline }},
							{ new: true }, function(err, project) {
								if(err)
									res.send(err);
								res.json({ project: 'Project successfully updated!'});
							})
});

//Add more user to the project ...
//PUT update project (using PUT at http://localhost:3001/addUserProject/:project_id)
router.route('/addUserProject/:project_id').put(function(req, res) {
	Project.findByIdAndUpdate(req.params.project_id, 
							{ $push: { users: req.body.user }},
							{ new: true }, function(err, project) {
								if(err)
									res.json({
										status: 'fail',
										message: 'Sorry, unable to add user to this project'
									})
									//res.send(err);
								else
									res.json({ 
										status: 'success',
										message: 'Successfully added this user to this project'
									})
							})
});

//Add more node to the project ...
//PUT update project (using PUT at http://localhost:3001/addUserProject/:project_id)
router.route('/addNodeProject/:project_id').put(function(req, res) {
	Project.findByIdAndUpdate(req.params.project_id, 
							{ $push: { nodes: req.body.node_id }},
							{ new: true }, function(err, project) {
								if(err)
									res.json({
										status: 'fail',
										message: 'Sorry, unable to add this node to this project'
									})
									//res.send(err);
								else
									res.json({ 
										status: 'success',
										message: 'Successfully added this node to this project'
									})
							})
});

//===================================================================

//================================Node=============================================
//POST a new node (using POST at http://localhost:3001/addNode)
router.route('/addNode').post(function(req, res){
	var newNode = new Node();

	//Set the Project attributes
	newNode.title = req.body.title;
	newNode.desc = req.body.desc;
	newNode.created_by = req.body.created_by;
	newNode.primaryNode = req.body.primaryNode; 
	newNode.previousNode = req.body.previousNode; 
	newNode.project_id = req.body.project_id; 

	newNode.save(function(err, result) {
		if(err)
			res.json({
				status: 'fail',
				message: 'Sorry, unable to add new node'
			})
			//res.send(err);
		else
			res.json({ 
				status: 'success',
				message: 'Successfully created a new node',
				id: result._id
			})
	});
});

//GET all node (using a GET at http://localhost:3001/nodes)
router.route('/nodes').get(function(req, res) {
	Node.find(function(err, nodes) {
		if(err)
			res.send(err);
		res.json(nodes);
	});
});

//GET all node according to project_id (using a GET at http://localhost:3001/nodes/:project_id)
router.route('/nodes/:project_id').get(function(req, res) {
	Node.find({ project_id: req.params.project_id }, function(err, nodes) {
		if(err)
			res.send(err);
		res.json(nodes);
	});
});

//=================================================================================

module.exports = router;

function dateDisplayed(timestamp) {
	var date = new Date(timestamp);
	return (date.getMonth() + 1 + '/' + date.getDate() + '/' 
			+ date.getFullYear() + " "
			+ date.getHours() + ":" 
			+ date.getMinutes() + ":"
			+ date.getSeconds());
}