var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var ENV = app.get('env');

if ( ENV === 'development' ) {
  app.use(express.static('dev'))
} else {
  app.use(express.static('dist'))
  PORT = 80;
}

app.listen(PORT, ()=>{
  console.log(`Running in ${ENV} mode at http://localhost: ${PORT}`);
})
