let app = require('./src/app');

app.listen(process.env.server_port,()=>{
    console.log("Server Started");
});