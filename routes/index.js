var express		= 	require('express'),
    router 		= 	express.Router(),
    bodyParser 	= 	require('body-parser'),
    multer		=	require('multer'),
    nodemailer 	= 	require('nodemailer'),
    path  		= 	require('path'),
    promise 	= 	require('bluebird'),
    glob        = 	require('glob'),
    i18n        = require("i18n");
	upload		=	multer({ dest:  'public/uploads/' });

	var conf 	= require('../model/config');
	var db 		= require('../model/db');
	
	var transporter = nodemailer.createTransport('SMTP',{
		service: 'Gmail',
	    auth: {
	        user: conf.mail.auth.user, 
	        pass: conf.mail.auth.password
	    }
 	});

	
	router.get('/', function(req, res, next) {
		console.log(res.__('name_error_msg'));
	  res.render('index', { title: 'Disney Girl' });
	});

	

	router.get('/videos', function(req, res, next) 
	{
		db.getConnection(function(err,connection)
		{
		 	if(err)
		 	{
		 		connection.release();
		    	console.log('Database connection error');
			}
		  	else
		    	console.log('Database connection successful');

			db.query('SELECT url FROM dg_videos', function(err, result)
			{
				if(err)
					return err;
				connection.release();
				
				res.render('videos', {videos: result});
			});
			
		});
	  
	});

	router.get('/pictures', function(req, res, next) {

		//var dir_slider_img = __dirname + '../public/img/slider-images/';
		var dir_slider_img = process.cwd()+'/public/img/slider-images/';

		glob(dir_slider_img + "*.{jpg,JPG,jpeg,JPEG,png,PNG}", function (er, files) 
		{
			files = files.map(function(files)
			{
				return path.basename(files);
			});

			files = files.reverse();

			res.render('pictures', {pictures: files});
		});
	  
	});


	router.get('/about', function(req, res, next) {
	  res.render('about');
	});



	var isEmailexists	=	function(data)
	{
		return new promise(function (resolve, reject)
		{
			db.getConnection(function(err,connection)
			{
			 	if(err)
			 	{
			 		connection.release();
			    	console.log('Database connection error');
				}
			  	else
			    	console.log('Database connection successful');

				db.query('SELECT email FROM dg_users WHERE email = ?', data.email, function(err, result)
				{
					if(result.length !== 0)
						reject({text:i18n.__('email_already_exist'), error:1});
					else
						resolve(result);

			});
				connection.release();
			});
		});

	};


	var saveUsers	=	function(data)
	{
		return new promise(function (resolve, reject)
		{
			db.getConnection(function(err,connection)
			{
			 	if(err)
			 		connection.release();
			    else
			    	console.log('Database connection successful');
			
				db.query('INSERT INTO dg_users SET ?', data, function(err,ret)
				{
					if(err)
						reject({text:i18n.__('error_save_form'), error:1});
					else
						resolve(ret);
				});

				connection.release();
			});
		});
	};


	var sendEmail = function(formData)
	{
		var htmltemp	=	'<table><tr><td>Name</td><td>'+formData.name+'</td></tr><tr><td>Email</td><td>'+formData.email+'</td></tr><tr><td>Photo</td><td><img src="'+formData.photo+'"></td></tr></table>';
		var mailOptions = {
							from: conf.mail.from, 
						    to:conf.mail.to, 
						    subject: 'Disney Form Node', 
						    html: htmltemp
						};

		
		transporter.sendMail(mailOptions, function(err,info)
		{
			if(err)
				console.log(err);
			else
				console.log(info);
		});

		transporter.close();
	};

	router.post('/form', upload.single('photo'), function(req, res, next) 
	{
		if(! req.body )
			return res.send('error')

		var formData				=	req.body;

		formData.has_photo			=	1;
		formData.ua					=	req.headers['user-agent'];
		formData.date_registered	=	Date.now();
		formData.ip					=	req.ip;
		formData.photo 				=	req.file.path;
		
		isEmailexists(formData).then(function(data)
		{
			return saveUsers(formData).then(function(data)
			{
				sendEmail(formData);
				res.json({'text':'Thankyou For Registration', 'error': 0});
			})
			
		})
		.catch (function(error)
		{
			res.json(error);
		});

	});

module.exports = router;
