import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item
const addFood = async (req,res) =>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error adding Food"})
    }
}

// all food list
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch (error){
        console.log(error);
        res.json({success:false,message:"ListFood not found"})
    }
}

//remove food item
const removeFood = async (req,res) =>{
try{
    const findFood = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${findFood.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true,data:"Food removed"})
}catch (error){
        console.log(error);
        res.json({success:false,message:"Unable to remove the food"})
    }
}

export {addFood,listFood,removeFood}