const express = require('express');
const router = new express.Router();
const ProductSchema = require("../model/ProductSchema.js")
const UserSchema = require("../model/UserSchema.js")
const AddToCartSchema = require("../model/AddToCartSchema.js")
const TASchema = require("../model/TASchema.js")
const Razorpay = require('razorpay')
const PaymentSchema = require('../model/PaymentSchema.js');
//get products from db
router.get("/get-products", async (req, res) => {
    try {
        const products = await ProductSchema.find({});
        res.json(products)
    } catch (error) {
        console.log("error in getProducts", error)
    }
})

//get product acc to id
router.get("/product/:id", async (req, res) => {
    try {
        const data = await ProductSchema.find({id: req.params.id});
        res.status(200).json(data);
    } catch (error) {
        console.log("Error in gettng data from db acc to id", error);
        res.json(error)
    }
})

//signup api
// router.post("/signup", async (req, res) => {
//     try {
//         const user = new UserSchema(req.body)http://localhost:5000/payment-history/ziL3U5yrIJaLmt9j1CSEH4MHlWH2
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
        const data = await UserSchema.findOne({uid: req.body.uid});
        if(!data){
            const User = new UserSchema({
                email: req.body.email,
                uid: req.body.uid,
            })
            await User.save();
            console.log("data saved successfully")
            res.send("login/signup success")
        }else res.send("user already exists")
    } catch (error) {
        console.log("Error in signup", error);
    }
})

//add to cart
router.post('/add-to-cart/:uid', async (req, res) => {
    try {
        const User = await AddToCartSchema.findOne({uid: req.params.uid, id: req.body.id});
        if(!User){
       const data = new AddToCartSchema({
           uid: req.params.uid,
           id: req.body.id,
           url: req.body.url,
           detailUrl: req.body.detailUrl,
           title: req.body.title,
           price: req.body.price,
           description: req.body.description,
           tagline: req.body.tagline,
       });
       await data.save();
       res.status(200).json("Added to cart successfully"); 
    }else res.status(100).json("Already Added to cart");
    } catch (error) {
        console.log("error in addToCart", error);
    }
})

//get Data from Cart
router.get('/get-cart-items/:uid',async (req, res) => {
    try {
        const data = await AddToCartSchema.find({uid: req.params.uid});
        res.status(200).json(data);
    } catch (error) {
        console.log("error in getCartItems", error);
    }
})

//razorpay
router.post('/orders/:uid', async (req, res) => {
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
            uid: req.params.uid,
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
router.get('/payment-history/:uid',async (req, res) => {
    try {
        const data = await PaymentSchema.find({uid: req.params.uid})
        res.status(200).json(data)
    } catch (error) {
        console.log("Payment history error: ",error)
    }
})

//delete account
router.post('/delete-account', async (req, res) => {
    try {
        const data = await UserSchema.find({uid: req.body.uid})
        if(!data){
            return res.status(404).json("User not found")
        }else{
        await UserSchema.deleteOne({uid: req.body.uid})
        await AddToCartSchema.deleteMany({uid: req.body.uid})
        await PaymentSchema.deleteMany({uid: req.body.uid})
        res.status(200).json("Delete Account Success")}
    } catch (error) {
        console.log("Delete account error: ",error)
    }
})

module.exports = router;