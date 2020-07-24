const Book = require('../models/books');
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


describe('Book  Schema test', () => {     
    it('Add Book testing', () => {         
        const book = {             
            'book_name': 'Onepiece',             
            'book_author': 'Oda sensei',
            'book_price':'1000000',
            'book_description':'Luffy the man who will  be  the pirate king',
            'book_imagename':'onepiece.jpg' 
               
        };                  
        return Book.create(book)             
        .then((pro_ret) => {                 
            expect(pro_ret.book_name).toEqual('Onepiece');  
            expect(pro_ret.book_author).toEqual('Oda sensei');   
            expect(pro_ret.book_price).toEqual('1000000');             
            expect(pro_ret.book_description).toEqual('Luffy the man who will  be  the pirate king'); 
            expect(pro_ret.book_imagename).toEqual('onepiece.jpg'); 
            
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Book.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {book_name:'Naruto'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete book is working or not', async () => {         
                const status = await Book.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

