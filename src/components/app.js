// app.js
// Inside app.js 
const express = require('express');
const Razorpay = require('razorpay'); 

// This razorpayInstance will be used to
// access any resource from razorpay
const razorpayInstance = new Razorpay({

    // Replace with your key_id
    key_id: rzp_test_fiIwmRET6CApc2,

    // Replace with your key_secret
    key_secret: YAEUthsup8SijNs3iveeVlL1
});

const app = express();
const PORT = process.env.PORT || '5000';

// Here we will create two routes one 
// /createOrder and other /verifyOrder 
// Replace these comments with the code 
// provided later in step 2 & 8 for routes

app.listen(PORT, ()=>{
    console.log("Server is Listening on Port ", PORT);
});


//Inside app.js
app.post('/createOrder', (req, res)=>{ 

    // STEP 1:
    const {amount,currency,receipt, notes}  = req.body;      
        
    // STEP 2:    
    razorpayInstance.orders.create({amount, currency, receipt, notes}, 
        (err, order)=>{
        
          //STEP 3 & 4: 
          if(!err)
            res.json(order)
          else
            res.send(err);
        }
    )
});

//Inside app.js
app.post('/verifyOrder',  (req, res)=>{ 
    
    // STEP 7: Receive Payment Data
    const {order_id, payment_id} = req.body;     
    const razorpay_signature =  req.headers['x-razorpay-signature'];

    // Pass yours key_secret here
    const key_secret = YAEUthsup8SijNs3iveeVlL1;     

    // STEP 8: Verification & Send Response to User
    
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 

    // Passing the data to be hashed
    hmac.update(order_id + "|" + payment_id);
    
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
    
    
    if(razorpay_signature===generated_signature){
        res.json({success:true, message:"Payment has been verified"})
    }
    else
    res.json({success:false, message:"Payment verification failed"})
});

