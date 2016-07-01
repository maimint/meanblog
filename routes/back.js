'use strict';

const express		= 	require('express');
const router 		= 	express.Router();
const bodyParser 	= 	require('body-parser');
const path  		= 	require('path');
const jwt           = 	require("jsonwebtoken");
const promise 		= 	require('bluebird');
const conf 			= 	require('../conf/config');
const db 			= 	require('../conf/db'); //mysql db conn

router.get('/', function(req, res){

  res.sendFile(path.join(__dirname, 'back/index.html'));
});

router.post('/auth', function(req, res)
{

	if(! req.body )
		return res.json({'text':'invalid Request', 'error': 1});

	else if(! req.body.user )
		return res.json({'text':'Please Enter Your Username', 'error': 1});

	else if(! req.body.pass )
		return res.json({'text':'Please Enter Your Password', 'error': 1});

	else if(req.body.user !== conf.auth.user || req.body.pass !== conf.auth.pass )
		return res.json({'text':'Invalid Username/Password', 'error': 1});

	else
	{
		res.json({
			'text': 'Welcome User',
			'error': 0,
			'token': jwt.sign(conf.auth.pass, 'mean'),
			'is_logged': true
		});
	}
});


router.post('/addPost', function(req, res)
{

	if(! req.body )
		return res.json({'text':'invalid Request', 'error': 1});

	else if(! req.body.title )
		return res.json({'text':'Please Enter Your Title', 'error': 1});

	else if(! req.body.desc )
		return res.json({'text':'Please Enter Your Description', 'error': 1});


	var formData	=	 {
		post_title 			: 	req.body.title,
		post_desc 			: 	req.body.desc,
		date_registered		: 	Date.now()

	}

	db.getConnection(function(err,connection)
	{
	 	if(err)
	 		return res.json({msg: err, error: 1});
	 	
	   	db.query('INSERT INTO posts SET ?', formData, function(err,ret)
		{
			if(err)
				return res.json({msg: err, error: 1});

			connection.release();

			return res.json({msg: 'success', error: 0});
		});

	});

});


router.post('/managePost', function(req, res)
{

	db.getConnection(function(err,connection)
	{
	 	if(err)
	 		return res.json({msg: err, error: 1});
	 	
	   	db.query('SELECT post_title, post_desc, id_post FROM posts', function(err,results)
		{
			if(err)
				return res.json({msg: err, error: 1});

			connection.release();

			return res.json({msg: 'success', error: 0, posts: results});
		});

	});

});


router.post('/deletePost', function(req, res)
{
	if(! req.body )
		return res.send('error')

	if( req.body.post == null)
		return res.json({text:'Invalid Post Id', error: 1});

	db.getConnection(function(err,connection)
	{
	 	if(err)
	 		return res.json({msg: err, error: 1});
	 	
	   	db.query('DELETE FROM posts WHERE id_post = ?', req.body.post, function(err,results)
		{
			if(err)
				return res.json({msg: err, error: 1});

			return res.json({msg: 'success', error: 0});

			connection.release();
		});

	});

});


router.get('/readPost/:id', function(req, res)
{
	var id = req.params.id;

	if(! id || id <= 0 )
		return res.json({msg: 'Invalid Post ID', error: 1})

	db.getConnection(function(err,connection)
	{
	 	if(err)
	 		return res.json({msg: err, error: 1});
	 	
	   	db.query('SELECT post_title, post_desc FROM posts WHERE id_post = ?', id, function(err,results)
		{
			if(err)
				return res.json({msg: err, error: 1});

			return res.json({msg: 'success', error: 0, post:results});

			connection.release();
		});

	});

});


module.exports = router;
