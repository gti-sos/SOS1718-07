/*global browser*/
/*global element*/
/*global by*/
/*global expect*/


var newman = require("newman");
var path = require("path");

describe('API should works Miguel Angel', function(){  //compruebo que los datos se cargan
    newman.run({
        collection: require(path.join(process.cwd(),"test","Full Test BackEnd Miguel.postman_collection")),
        reporters: "cli"
    }, function(err){
        if(err){
            throw err;
        }else{
            console.log("Newman collection run complete!");
        }
    });
});