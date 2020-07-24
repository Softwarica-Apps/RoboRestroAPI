const Rating = require('../models/rating');
const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/foodExTesting";

beforeAll(async () => {     
    await mongoose.connect(url, {         
    useNewUrlParser: true, 
    useCreateIndex: true     
}); 
}); 

afterAll(async () => { 

await mongoose.connection.close(); 
}); 


describe('Rating  Schema test', () => {     
    it('Add rating testing', () => {         
        const rating = {             
            'phone': '9849329276',             
            'food_name': 'Mo:mo',
            'rating':'5'
           
               
        };                  
        return Rating.create(rating)             
        .then((pro_ret) => {                 
            expect(pro_ret.phone).toEqual('9849329276');  
            expect(pro_ret.food_name).toEqual('Mo:mo');   
            expect(pro_ret.rating).toEqual('5');                      
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Rating.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {rating:'4.5'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete rating is working or not', async () => {         
                const status = await Rating.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

