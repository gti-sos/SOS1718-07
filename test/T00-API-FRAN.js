/*global browser*/
/*global element*/
/*global by*/
/*global expect*/


var newman = require("newman");
var path = require("path");

describe('API should work', function(){  //compruebo que los datos se cargan
        newman.run({
            collection: require(path.join(process.cwd(),"test","backend-tests-F011.postman_collection.json")),
            reporters: "cli"
        
    }, function(err){
        if(err){
            throw err;
        }else{
            console.log("Collection run complete!");
        }
    });
});