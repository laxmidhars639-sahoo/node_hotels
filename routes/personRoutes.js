const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

//post route to add person
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        // Create new person document using the mongoose model
        const newPerson = new Person(data);

        // Save the new person document to the database
        const savedPerson = await newPerson.save(); // Use async/await
        console.log('Data saved successfully');
        res.status(200).json(savedPerson);
    } catch (error) {
        console.error('Error saving person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/', async (req,res)=>{
    try{
        const data = await Person.find();
        console.log('Data fetched successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:workType', async(req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType == 'chef'|| workType == 'manager' || workType == 'waiter'){
            const data = await Person.find({work:workType});
            console.log('Data fetched successfully');
            res.status(200).json(data);
        }else{
            res.status(404).json({ error: 'Invalid worktype Error' });
        }
    }catch(error){
        console.error('Error fetching person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        const data = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!data){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('data updated successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error updating person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId = req.params.id;
        const data = await Person.findByIdAndDelete(personId);
        if(!data){
            return res.status(404).json({error :'Invalid person id error'});
        }
        console.log('data deleted successfully');
        res.status(200).json(data);
    }catch(error){
        console.error('Error deleting person:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;