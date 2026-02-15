import Order from "../models/order.js"
import Product from "../models/product.js"



export async function createOrder(req,res){
    if(req.user == null){
        return res.status(401).json({
            message : "Please login "
        })
        // CBC00202
    }
    const latestOrder = await Order.find().sort({ date: -1 }).limit(1)

    try{
    let orderId = "CBC00202"

    if(latestOrder.length > 0){
        const lastOrderIdString = latestOrder[0].orderId
        const lastOrderIdWithoutPrefix = lastOrderIdString.replace("CBC","")
        const lastOrderIdInInteger = parseInt(lastOrderIdWithoutPrefix)
        const newOrderIdInInteger = lastOrderIdInInteger + 1
        const newOrderIdWithoutPrefix = newOrderIdInInteger.toString().padStart(5,"0")
        orderId = "CBC" + newOrderIdWithoutPrefix

    }

    const items = []
    let total = 0
    if(req.body.items !== null && Array.isArray(req.body.items)){
        for(let i=0; i<req.body.items.length; i++){
            let item = req.body.items[i]

            let product = await Product.findOne({ productId : item.productId})
            if(product == null){
                res.status(400).json({
                    message : "Invalid product ID: " + item.productId
                })
                return
            }
            items[i] = {
                productId : product.productId,
                name : product.name,
                image : product.images[0],
                price : product.price,
                quantity : item.quantity
            }
            total += product.price * item.quantity
        }

    }else{
        res.status(400).json({
            message : "Inavalid items format. It should be an array of items"
        })
        return

    }

    const order = new Order({
        orderId : orderId,
        email : req.user.email,
        name : req.user.firstName + " " + req.user.lastName,
        address : req.body.address,
        phone : req.body.phone,
        items : items,
        total : total,
    })

     const result = await order.save()

    
    res.json({
        message : "Order created successfully",
        result : result
    })
    }catch(error){
        console.error("Error creating order", error);
        return res.status(500).json({
            message : "Failed to create order"
        })
    }
    
}

export async function getOrders(req,res){
    if(req.user == null){
        return res.status(401).json({
            message : "Please login "
        })
    }
    try{
        if(req.user.role === "admin" ){
            const orders = await Order.find().sort({ date: -1 })
            return res.json(orders)
        } else {
            const orders = await Order.find({ email : req.user.email}).sort({ date: -1 })
            return res.json(orders)
        }

    }catch(error){
        console.error("Error fetching orders:", error);
        return res.status(500).json({
            message : "Failed to fetch orders"
        })
    }
}