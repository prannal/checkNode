var express =  require("express");
var adminRouter = express();

adminRouter.get("/", (request, response)=>
{
    response.send("This is Admin Page");
});

adminRouter.get("/:ANo", (request, response)=>
{
    response.send("You searched for Admin No " + request.params.ANo);
});


adminRouter.post("/:ANo", (request, response)=>
{
    response.send("You searched for Admin No " + request.params.ANo);
});



module.exports = adminRouter;
