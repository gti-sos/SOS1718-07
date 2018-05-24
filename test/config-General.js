exports.config = {   //exportar objeto de la configuracion del test

    seleniumAddress : 'http://localhost:8910',   //url donde esta el navegador cargando
    
    specs: ['T00-API-FRAN.js','T01-loadData-Ismael.js','T02-addData-Ismael.js', "T01-loadData-MiguelAngel.js","T02-addData-MiguelAngel.js", "T01-loadData.js", "T02-addHomicide"],  //test que vamos a cargar
    
    capabilites : {   //tipo de navegador que voy a usar
        'browserName' : 'phantomjs'
        
    }
};