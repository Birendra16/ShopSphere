import Product from "../models/Product.js"

export const createProduct = async (data:any)=>{
    return await Product.create(data);
};

export const getAllProducts = async()=>{
    return await Product.find().sort({createdAt: -1});
};

export const getProductById = async (id: string) =>{
    return await Product.findById(id);
};

export const updateProduct = async (id: string, data: any)=>{
    return await Product.findByIdAndUpdate(id, data,{new: true});
};

export const deleteProduct = async(id:string)=>{
    return await Product.findByIdAndDelete(id);
}