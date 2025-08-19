const {default: mongoose} = require('mongoose'); 
const app = require('./app');
const {PORT,MONGODB_URI} = require('./utils/config');

console.log('connecting to database');

mongoose.connect(MONGODB_URI)

.then(()=>{
    console.log('connected to database');

    console.log('server is starting....');
    app.listen(PORT,()=>{console.log(`server is running on port  http://localhost:${PORT}`)})

})

.catch((error)=>{
    console.log('error connecting to database',error.message);
    process.exit(1);
})






