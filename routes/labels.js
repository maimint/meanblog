var express		= 	require('express'),
    router 		= 	express.Router(),
    bodyParser 	= 	require('body-parser'),
    path  		= 	require('path'),
    fs 			 = 	require("fs"),
    db 			= 	require('../model/db');
	
	router.get('/', function(req, res, next) 
	{
		label_list = {};
		db.getConnection(function(err,connection)
		{
		 	if(err)
		 	{
		 		connection.release();
		    	console.log('Database connection error');
			}
		  	else
		    	console.log('Database connection successful');

			db.query('SELECT * FROM i18n_locales WHERE is_enabled = 1 LIMIT 1', function(err, result)
			{
				if(err)
					throw err;

				var enabled_locale	= result[0].locale;
    			var localesQuery 	= 'SELECT id_label,'+enabled_locale+'  FROM i18n_locales_labels';

    
	    		db.query(localesQuery, function(err, labels, fields) 
	    		{
	        		if (err) throw err;

		        for(var n in labels) {

		            var locale_name = labels[n].id_label, label_name=labels[n][enabled_locale];

		            label_list[locale_name] = label_name;
		        }

		       fs.writeFile(process.cwd()+'/locales/'+enabled_locale+'.json', JSON.stringify(label_list), function (err) {
		          if (err) throw err;
		          console.log('Saved!');
		        });
	    
	   		 	});

				connection.release();
			});
			
		});
	  
	});

console.log('testt');
module.exports = router;
