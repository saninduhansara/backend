import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({

    productId : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    altNames : {
        type : [String],
        default : []
    },

    labelledPrice : {
        type : Number,
        required : true
    },

    images : {
        type : [String],
        default : ["default-product.jpg"]
    },

    description : {
        type : Number,
        required : true,
        default : 0
    },

    isAvailable : {
        type : Boolean,
        default : true
    },

    category : {
        type : String,
        required : true,
        default : "cosmetics"

    }

    
})

const Product = mongoose.model('Products', productSchema);
export default Product;