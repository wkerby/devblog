const express = require('express'); //require in the express package

const app = express(); //create app constant for server

const PORT = process.env.PORT || 3001; //establish port number and use port 3001 if no dynamic port number found

//allow interpretation of JSON data
app.use(express.json());

//allow for url encoded data
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, 'public'))); //tell server to render any static files in the public directory

//create connection to sequelize database
sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'))
});


