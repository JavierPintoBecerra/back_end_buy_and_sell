import { db } from "./database";

export const deleteListingRoute = {

    method: 'DELETE',
    path: '/api/listings/{id}',
    handler: async (req, h)=>{
        const {id} = req.params;
        // Later on we will have to validate the user that is making the request

        await db.query(
            'DELETE FROM listings WHERE id=?',
            [id], 
        );
        return {message: 'The register has been deleted, hooray!'}; 
    }
}