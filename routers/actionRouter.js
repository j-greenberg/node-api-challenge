const express = require('express'); // Import router

const router = express.Router(); // Instantiate router

const Actions = require('../data/helpers/actionModel.js'); // Import Action functions
const Projects = require('../data/helpers/projectModel.js'); // Import Project functions

router.get("/", (req, res, next) => {
            Actions
            .get()
            .then(response => {
                console.log("New general get request on Action Model!: ", response); 
                res.status(210).json({ message: response }); 
            })
            .catch(error => {
                console.log("Error on get request to Action Model!: ", error); 
                res.status(400).json({ errorMessage: error}); 
            })
})

router.get("/:id", (req, res, next) => {
        Actions
        .get(req.params.id)
        .then(response => {
            console.log(`New specific get request on Action Model for ID ${req.params.id}!: `, response); 
            res.status(210).json({ message: response }); 
        })
        .catch(error => {
            console.log("Error on get request to Action Model!: ", error); 
            res.status(400).json({ errorMessage: error}); 
        })
}); 

router.post("/", (req, res) => {
    Projects
    .get(req.body.project_id)
    .then(response =>{
        if(response === null){ // triggered if invalid Project ID has been entered
            console.log(`Project ID#${req.body.project_id} does not exist! Please try again.`); 
            res.status(400).json({ errorMessage: `Project ID#${req.body.project_id} does not exist! Please try again.` })
        } 
        else{ // this is triggered if response is NOT null and thus a valid Project ID has been entered
            if(Object.keys(req.body).length){
                if(req.body.project_id){
                    if(req.body.notes){
                        if(req.body.description){
                            const action = { project_id: req.body.project_id, description: req.body.description, notes: req.body.notes}; 
                            Actions
                            .insert(action)
                            .then(response => {
                                console.log(`Success! New action posted to database: ${response}`); 
                                res.status(200).json({ message: "Success! New action posted to database:", response}); 
                            })
                            .catch(error => {
                                console.log(`Error on POST request to localhost:4000/api/actions!: ${error}`);
                                res.status(400).json({ error }); 
                            })
                        } else {
                        console.log("Please include `description` field. ");
                        res.status(400).json({ errorMessage: "Please include 'description' field." }); 
                        }
                    } else { 
                        console.log("Please include `notes` field. ");
                        res.status(400).json({ errorMessage: "Please include 'notes' field." }); 
                    }
                } else{
                    console.log("Please include project ID."); 
                    res.status(400).json({ errorMessage: "Please include 'project_id' field." }); 
                }
            } else { 
                console.log("Please include 'project_id', 'notes', and 'description' field. These are required fields.")
                res.status(400).json({ errorMessage: "Please include 'project_id', 'notes', and 'description' field. These are required fields."}); 
            }
            // End of long conditionals
        }
    })
    .catch(error => {
        console.log(`No such Project ID#${req.body.project_id} exists. Please try again.`); 
        res.status(400).json({ errorMessage: `No such Project ID#${req.body.project_id} exists. Please try again.` })
    })
}); 

router.put("/", (req, res) => {
    console.log(`Please provide '/id' to edit.`);
    res.status(400).json({ errorMessage: "Please provide '/id' to edit." }); 
})

router.put("/:id", (req, res) => {
    if(req.params.id){ 
        if(Object.keys(req.body).length){
                if(req.body.notes){
                    if(req.body.description){
                        const action = { description: req.body.description, notes: req.body.notes }; 
                        Actions
                        .update(req.params.id, action)
                        .then(response => {
                            if(response === null){
                                console.log(`Action ID#${req.params.id} not found! Please try again.`); 
                                res.status(400).json({ errorMessage: `Action ID#${req.params.id} not found! Please try again.`}); 
                            } else {
                            console.log(`Action ID#${req.params.id} successfully edited!`, response); 
                            res.status(200).json({ message: `Action ID#${req.params.id} successfully edited!`, response }); 
                            }
                        })
                    } else {
                    console.log("Please include `description` field. ");
                    res.status(400).json({ errorMessage: "Please include 'description' field." }); 
                    }
                } else { 
                    console.log("Please include `notes` field. ");
                    res.status(400).json({ errorMessage: "Please include 'notes' field." }); } 
                 } else { 
            console.log("Please include 'notes', and 'description' field. These are required fields.")
            res.status(400).json({ errorMessage: "Please include 'notes', and 'description' field. These are required fields."}); 
        } 
        
     } else {
            console.log(`Please provide ID# to edit.`);
            res.status(400).json({ errorMessage: `Please provide ID# to edit.`})
        }      
})

router.delete("/", (req, res) => {
    console.log(`Please provide '/id' to delete.`);
    res.status(400).json({ errorMessage: "Please provide '/id' to delete." }); 
})

router.delete("/:id", (req, res) => {
    if(req.params.id){
        Actions
        .remove(req.params.id)
        .then(response => {
                console.log(`ID #${req.params.id} successfully deleted!: ${response}`); 
                res.status(200).json({ message: `ID #${req.params.id} successfully deleted!`, response}); 
        })
        .catch(error => {
            console.log("Error in deleting action!", error); 
            res.status(400).json({ errorMessage: "Error in deleting action!: ", error});
        })
    } else {
        console.log("Please provide `id` field of the resource you wish to delete."); 
        res.status(400).json({ errorMessage: "Please provide `id` field of action you wish to delete." }); 
    }
})

module.exports = router; // export router for use