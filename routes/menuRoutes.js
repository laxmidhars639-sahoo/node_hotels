const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

//Post method to save the value of MenuItem
router.post('/', async (req,res)=>{
    try{
        const data = req.body;
        const menuItems = new MenuItem(data);
        const savedMenuItems = await menuItems.save();
        console.log('Menuitems Data saved successfully');
        res.status(200).json(savedMenuItems);
    }catch(error){
        console.error('Error saving MenuItems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//Get method to get the value of MenuItems
router.get('/', async (req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('Menuitems Data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error fetching menuitems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get taste from MenuItems
router.get('/:tasteType', async (req,res)=>{

    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const data = await MenuItem.find({taste:tasteType});
            console.log('Menuitems Data fetched successfully');
            res.status(200).json(data);
        }else{
            res.status(404).json({error:'Invalid tasteType error'});
        }
    }
    catch(error){
        console.error('Error fetching menuitems:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id;
        const updatedMenu = req.body;
        const data = await MenuItem.findByIdAndUpdate(menuId,updatedMenu,{
            new:true,
            runValidators:true
        })
        if(!data){
            return res.status(404).json({error:'Invalid updateId error'});
        }
        console.log('Menu items updated successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error updating menuitems',error);
        res.status(500).json({error :'Internal server error'});
    }
});

router.delete('/:id', async(req,res)=>{
    try{
        const menuId = req.params.id;
        const data = await MenuItem.findByIdAndDelete(menuId);
        if(!data){
            return res.status(404).json({error : 'Invalid menuitems_id error'});
        }
        console.log('menuitem deleted successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error deleting menuitems',error);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;