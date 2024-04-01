import mysql from 'mysql'


const connetion = mysql.createConnection({
    host: 'localhost', 
    user: 'hapi-server', 
    password: 'J@v13rPinto',
    database: 'buy_and_sell'
})

export const db ={
    connect: ()=> connetion.connect(), 
    query: (queryString, scapedValues)=>
        new Promise((resolve, reject)=>{
            connetion.query(queryString, scapedValues, (error, results, fields) =>{
                if (error) reject(error);
                resolve({results, fields}); 
            })
        }), 
        end: ()=> connetion.end(), 
}