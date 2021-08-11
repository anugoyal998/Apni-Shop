const express = require('express');
const router = new express.Router();
const ProductSchema = require("../model/ProductSchema.js")
const UserSchema = require("../model/UserSchema.js")
const AddToCartSchema = require("../model/AddToCartSchema.js")
const TASchema = require("../model/TASchema.js")
const Razorpay = require('razorpay')
const PaymentSchema = require('../model/PaymentSchema.js')
//get products from db
router.get("/get-products", async (req, res) => {
    try {
        const data = await ProductSchema.find({});
        res.status(200).json(data)
    } catch (error) {
        console.log("Error in gettng data from db", error);
    }
})

//get product acc to id
router.get("/product/:id", async (req, res) => {
    try {
        const data = await ProductSchema.find({id: req.params.id});
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in gettng data from db acc to id", error);
    }
})

//signup api
// router.post("/signup", async (req, res) => {
//     try {
//         const user = new UserSchema(req.body)
//         await user.save();
//         res.status(200).json("Signup success");
//     } catch (error) {
//         console.log("Error in signup", error);
//     }
// })

// //login api
// router.post("/login", async (req, res) => {
//     try {
//         const user = await UserSchema.find({userName: req.body.userName});
//         if(user){
//             return res.status(200).json(user);
//         }else return  res.status(400).json("No user found");
//     } catch (error) {
//         console.log("Error in login", error);
//     }
// })


//signup / login api
router.post('/signup', async (req, res) =>{
    try {
        const data = await UserSchema.findOne({email: req.body.email});
        if(data==undefined){
            const User = new UserSchema(req.body)
            await User.save();
            const TA = new TASchema({
                googleId: req.body.googleId,
                price: 0,
            })
            await TA.save();
            console.log("data saved successfully")
        }
        res.send("login/signup success")
    } catch (error) {
        console.log("Error in signup", error);
    }
})

//add to cart
router.post('/add-to-cart', async (req, res) => {
    try {
        const User = await AddToCartSchema.findOne({googleId: req.body.googleId, id: req.body.id});
        if(!User){
       const data = new AddToCartSchema(req.body);
       await data.save();
       res.status(200).send("Added to cart successfully"); 
    }else res.status(200).send("Already Added to cart");
    } catch (error) {
        console.log("error in addToCart", error);
    }
})

//get Data from Cart
router.get('/get-cart-items/:gId',async (req, res) => {
    try {
        const data = await AddToCartSchema.find({googleId: req.params.gId});
        res.status(200).send(data);
    } catch (error) {
        console.log("error in getCartItems", error);
    }
})

//update totalprice








//razorpay
router.post('/orders/:gId', async (req, res) => {
    var instance = new Razorpay({ key_id: 'rzp_test_NrNMTNSXspRsSj', key_secret: 'WM5lWrQOEzrcrdNdL2swrm6K' })
    var options = {
        amount: Number(req.body.price.cost)*100,
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    instance.orders.create(options,async  function(err, order) {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(order);
        const currentDateAndTime = new Date();
        const paymentData = new PaymentSchema({
            googleId: req.params.gId,
            productId: req.body.id,   
            url: req.body.url,
            title: req.body.title,
            price: req.body.price,
            discount: req.body.discount,
            tagline: req.body.tagline,
            razorpay_order_id: order.id,
            date_and_time: currentDateAndTime
        })
        await paymentData.save();
        console.log("Payment saved successfully");
    });
})

//get payment history
router.get('/payment-history/:gId',async (req, res) => {
    try {
        const data = await PaymentSchema.find({googleId: req.params.gId});
        res.status(200).json(data);
    } catch (error) {
        console.log("Error getting payment history", error);
    }
})


module.exports = router;