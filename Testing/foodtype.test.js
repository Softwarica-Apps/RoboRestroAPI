const Foodtype = require("../models/foodtypes");
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


describe('Foodtype  Schema test', () => {     
    it('Add Foodtype testing', () => {         
        const foodtype = {             
            'food_type': 'Chinese',             
            'food_type_imagename': 'chinese.jpg'
                    
        };                  
        return Foodtype.create(foodtype)             
        .then((pro_ret) => {                 
            expect(pro_ret.food_type).toEqual('Chinese');  
            expect(pro_ret.food_type_imagename).toEqual('chinese.jpg');   
           
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Foodtype.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {food_type:'Japanese'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await Foodtype.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

