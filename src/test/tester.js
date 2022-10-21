//Local CSS load
const pageCSS = [   
    "/src/test/prototype/page.css",
];


//Array of JS scripts to load 
const pageScriptsExternal = [
    '/src/script/loadmodules.js',   // index page Modules
    'src/test/prototype/page.js'
];


// Page Local Scripts JS & jQ
//-------------------


// Load the CSS, JS and jQuery files listed in the array above
loadcssfile(pageCSS);
loadScriptsInOrder(pageScriptsExternal);