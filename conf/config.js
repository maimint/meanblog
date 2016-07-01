var config = function()
{  
 
    return {
        'database': {
          'dbhost':'localhost',
          'dbuser': 'root',
          'dbpass': 'root',
          'dbname':  'disney'
        },
        'mail': {
          'from': 'praveen.p@krds.fr',
          'to': 'praveen.p@krds.sg',
          'auth':{
          	'user': 'praveen.p@krds.fr',
          	'password': '96009443'
          }
        },
        'auth':{
          'user': 'praveen',
          'pass': 'pass'
        }
      };

};


module.exports = new config(); 