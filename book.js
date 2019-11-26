var express =  require("express");
var router =  express();
var mysql = require("mysql");
var Joi = require("joi");
var config = require("config");

var connection =  mysql.createConnection({
    host: config.get("host"),
    database:config.get("database"),
    user : config.get("user"),
    password:config.get("password")
});
connection.connect();
router.use(express.json());

router.get("/",(request, response)=>{
    var queryText = "select * from book";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.get("/",(request, response)=>{
    var queryText = "select no from book";
    
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

router.get("/:No",(request, response)=>{
    var queryText = `select * from book where No = ${request.params.No}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.post("/",(request, response)=>{
    var validationResult = Validate(request);

    console.log(validationResult.error);
    if(validationResult.error==null)
    {
            var No = request.body.No;
            var Name = request.body.Name;
            var Price = request.body.Price;
            var Author = request.body.Author;

            var queryText = `insert into book values(${No}, '${Name}', ${Price}, '${Author}')`;
            connection.query(queryText,(err, result)=>{
            if(err==null)
                {
                    response.send(JSON.stringify(result));
                }
                else{
                    response.send(JSON.stringify(err));
                }
        });
    }
    else{
        response.send(JSON.stringify(validationResult.error));
    }
});


function Validate(request)
{
    var validationschema = 
    {
        No:Joi.number().required(),
        Name:Joi.string().required(),
        Price:Joi.number().required(),
        Author:Joi.string().required()
    };
   return Joi.validate(request.body, validationschema)
}

router.put("/:No",(request, response)=>{
    var No = request.params.No;
    var Name = request.body.Name;
    var Price = request.body.Price;
	var Author=request.body.Author; 

    var queryText = `update book set Name='${Name}' , Price= ${Price} , Author='${Author}' where No=${No}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});


router.delete("/:No",(request, response)=>{
    var No = request.params.No;
    var queryText = `delete from book where No = ${No}`;
    connection.query(queryText,(err, result)=>{
        if(err==null)
            {
                response.send(JSON.stringify(result));
            }
            else{
                response.send(JSON.stringify(err));
            }
    });
});

module.exports = router;



