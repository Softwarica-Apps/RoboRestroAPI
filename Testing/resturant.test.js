const Restaurants = require('../models/restaurants');
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


describe('Restaurants  Schema test', () => {     
    it('Add Restaurants testing', () => {         
        const restaurants = {             
            'restaurant_name': 'KFC',             
            'restaurant_latitude': '10',
            'restaurant_longitude':'11',
            'restaurant_description':'Its finger licking good',
            'restaurant_rating':'4.5',    
            'restaurant_imagename':'kfc.jpg'       
        };                  
        return Restaurants.create(restaurants)             
        .then((pro_ret) => {                 
            expect(pro_ret.restaurant_name).toEqual('KFC');  
            expect(pro_ret.restaurant_latitude).toEqual('10');   
            expect(pro_ret.restaurant_longitude).toEqual('11');             
            expect(pro_ret.restaurant_description).toEqual('Its finger licking good'); 
            expect(pro_ret.restaurant_rating).toEqual('4.5'); 
            expect(pro_ret.restaurant_imagename).toEqual('kfc.jpg'); 

              
                      

          
           
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Restaurants.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {restaurant_name:'Valley Express'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete restaurants is working or not', async () => {         
                const status = await Restaurants.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

