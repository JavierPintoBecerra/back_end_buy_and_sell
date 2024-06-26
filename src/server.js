import Hapi from '@hapi/hapi';
import routes from './routes';
import { db } from './database';
import * as admin from 'firebase-admin'; 
import credentials from '../credentials.json';

admin.initializeApp({
    credential: admin.credential.cert(credentials),
}); 

let server;


const start = async()=>{    // function that creates the server
     server = Hapi.Server({
        port : 8001,                     // here we create our Hapi server and pass the configuration object. 
        host: 'localhost',
    }); 

    routes.forEach(route =>server.route(route));

    db.connect();   // Starts the connection with the database 

    await server.start(); 
    console.log(`Server is listening on: ${server.info.uri}`); 
}

process.on('unhandledRejection', err=>{
    console.log(err, 'Opps there is a problem!');
    process.exit(1); 
});

process.on('SIGINT', async ()=>{   // I added the async 
    console.log('Stopping server...')

    await server.stop({timeout: 10000});
    db.end();  
    console.log('Server stopped');
    process.exit(0);
});

start(); 