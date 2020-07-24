const BookOrders= require('../models/bookorders');
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


describe('BookOrder  Schema test', () => {     
    it('Add BookOrder testing', () => {         
        const bookorders = {             
            'phone': '9849329276',             
            'book_name': 'At the house',
            'book_price':'1500',
            'book_imagename':'123.jpg',
            'payment_type':'on cash delivery' 
               
        };                  
        return BookOrders.create(bookorders)             
        .then((pro_ret) => {                 
            expect(pro_ret.phone).toEqual('9849329276');  
            expect(pro_ret.book_name).toEqual('At the house');   
            expect(pro_ret.book_price).toEqual('1500');             
            expect(pro_ret.book_imagename).toEqual('123.jpg'); 
            expect(pro_ret.payment_type).toEqual('on cash delivery'); 
            
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return BookOrders.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {book_name:'Naruto'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete book order is working or not', async () => {         
                const status = await BookOrders.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

