const Feedback = require('../models/feedbacks');
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


describe('Feedback  Schema test', () => {     
    it('Add feedback testing', () => {         
        const feedback = {             
            'firstname': 'Utsav',             
            'lastname': 'Shrestha',
            'email':'shresthau96@gmail.com',
            'feedback':'This app is really good'    
        };                  
        return Feedback.create(feedback)             
        .then((pro_ret) => {                 
            expect(pro_ret.firstname).toEqual('Utsav');  
            expect(pro_ret.lastname).toEqual('Shrestha');   
            expect(pro_ret.email).toEqual('shresthau96@gmail.com');             
            expect(pro_ret.feedback).toEqual('This app is really good'); 
         
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return Feedback.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {firstname:'Naruto'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete feedback is working or not', async () => {         
                const status = await Feedback.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

