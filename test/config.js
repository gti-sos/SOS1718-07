exports.config = {   //exportar objeto de la configuracion del test

    seleniumAddress : 'http://localhost:8910',   //url donde esta el navegador cargando
    
    specs: ['T01-loadData.js','T02-addHomicide.js'],  //test que vamos a cargar
    
    capabilites : {   //tipo de navegador que voy a usar
        'browserName' : 'phantomjs'
        
    }
    
    
    
}