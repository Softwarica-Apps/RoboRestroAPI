const User = require('../models/users');
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


describe('User  Schema test', () => {     
    it('Add User testing', () => {         
        const user = {             
            'first_name': 'Utsav',             
            'last_name': 'Shrestha',
            'phone':'9849329276',
            'email':'shresthau96@gmail.com',
            'password':'password'         
        };                  
        return User.create(user)             
        .then((pro_ret) => {                 
            expect(pro_ret.first_name).toEqual('Utsav');  
            expect(pro_ret.last_name).toEqual('Shrestha');   
            expect(pro_ret.phone).toEqual('9849329276');             
            expect(pro_ret.email).toEqual('shresthau96@gmail.com'); 
            expect(pro_ret.password).toEqual('password'); 

              
                      

          
           
        });     }); 

        // update the test

       it('to test the update', async () => { 
 
            return User.updateOne({
               _id :Object('5d21df42a5ecb718a46bbe09'
               )}, 
               {$set : {first_name:'Dragonball'}})     
                .then((pp)=>{         
                    expect(pp.ok).toEqual(1)     
              })    
            }) 
            

            //delete the test
           it('to test the delete user is working or not', async () => {         
                const status = await User.deleteMany();         
               expect(status.ok).toBe(1); });  


    })

