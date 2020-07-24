const Cart = require('../models/cart');
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


describe('Cart  Schema test', () => {     
    it('Add Cart testing', () => {         
        const cart = {             
            'phone': '9849329276',             
            'food_name': 'Mo:mo',
            'food_quantity':'1',
            'food_price':'100',
            'food_imagename':'momo.jpg', 
            
           
               
        };                  
        return Cart.create(cart)             
        .then((pro_ret) => {                 
            expect(pro_ret.phone).toEqual('9849329276');  
            expect(pro_ret.food_name).toEqual('Mo:mo');   
            expect(pro_ret.food_quantity).toEqual('1');             
            expect(pro_ret.food_price).toEqual('100'); 
            expect(pro_ret.food_imagename).toEqual('momo.jpg'); 
            

            

            
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Cart.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {food_quantity:'2'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete cart is working or not', async () => {         
                const status = await Cart.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

