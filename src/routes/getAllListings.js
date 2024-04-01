import { db } from "../database";


export const getAllListingsRoute ={     // This creates a new route
    method: 'GET', 
    path: '/api/listings', 
    handler: async (req, h)=>{   // I added the async 
        
        const {results}= await db.query(
            'SELECT * FROM listings'
        );
        return results; 
    }
}