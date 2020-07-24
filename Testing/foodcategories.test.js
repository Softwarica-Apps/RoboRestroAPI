const Foodcategories = require("../models/foodcategories");
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


describe('Foodcategories  Schema test', () => {     
    it('Add Foodtype testing', () => {         
        const foodcategories = {             
            'food_category': 'Mo:mo',             
            'food_category_imagename': 'momo.jpg'
                
        };                  
        return Foodcategories.create(foodcategories)             
        .then((pro_ret) => {                 
            expect(pro_ret.food_category).toEqual('Mo:mo');  
            expect(pro_ret.food_category_imagename).toEqual('momo.jpg');   
           

              
                      

          
           
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Foodcategories.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {food_category:'chowemin'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await Foodcategories.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

