const Food = require('../models/foods');
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


describe('Food  Schema test', () => {     
    it('Add User testing', () => {         
        const food = {             
            'food_name': 'Ratotouille',             
            'food_category': 'French',
            'food_type':'Stewed Vegetable',
            'food_price':'500',
            'food_description':'Ratotouille' ,   
            'food_imagename':'123.jpg', 
            'food_rating':4,
            'food_review':'Good', 
            'food_offer':'yes'      
        };                  
        return Food.create(food)             
        .then((pro_ret) => {                 
            expect(pro_ret.food_name).toEqual('Ratotouille');  
            expect(pro_ret.food_category).toEqual('French');   
            expect(pro_ret.food_type).toEqual('Stewed Vegetable');             
            expect(pro_ret.food_price).toEqual('500'); 
            expect(pro_ret.food_description).toEqual('Ratotouille'); 
            expect(pro_ret.food_imagename).toEqual('123.jpg'); 
            expect(pro_ret.food_rating).toEqual(4); 
            expect(pro_ret.food_review).toEqual('Good'); 
            expect(pro_ret.food_offer).toEqual('yes'); 
            

              
                      

          
           
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Food.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {food_name:'Dragonball'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete food is working or not', async () => {         
                const status = await Food.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

