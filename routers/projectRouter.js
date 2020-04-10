const express = require('express'); // Import router

const router = express.Router(); // Instantiate router

const Projects = require('../data/helpers/projectModel.js'); // Import action model and all associated helper functions

router.get("/", (req, res) => {
            Projects
            .get()
            .then(response => {
                console.log("New general get request on Action Model!: ", response); 
                res.status(210).json({ message: "New general get request!", response }); 
            })
            .catch(error => {
                console.log("Error on get request to Action Model!: ", error); 
                res.status(400).json({ errorMessage: error}); 
            })
})

router.get("/:id", (req, res) => {
        Projects
        .get(req.params.id)
        .then(response => {
            console.log(`New specific get request on Action Model for ID ${req.params.id}!: `, response); 
            res.status(200).json({ message: `Here is the results for your request for ID#${req.params.id}`, response }); 
        })
        .catch(error => {
            console.log("Error on get request to Action Model!: ", error); 
            res.status(400).json({ errorMessage: error}); 
        })
}); 

router.get("/:id/actions", (req, res) => {
    Projects
    .getProjectActions(req.params.id)
    .then(actions => {
        console.log(`New specific Project Action request for ID ${req.params.id}!: `, actions); 
        res.status(200).json({ message: `Here is the results for your Project Action request for ID#${req.params.id}`, actions }); 
    })
    .catch(error => {
        console.log("Error on Project Action request!: ", error); 
        res.status(400).json({ errorMessage: error}); 
    })
}); 

router.post("/", (req, res) => {
    if(Object.keys(req.body).length){
            if(req.body.name){
                if(req.body.description){
                    
                    const action = { name: req.body.name, description: req.body.description }; 
                    Projects
                    .insert(action)
                    .then(response => {
                        console.log(`Success! New project posted to database: `, response); 
                        res.status(200).json({ message: "Success! New project posted to database:", response}); 
                    })
                    .catch(error => {
                        console.log(`Error on POST request to localhost:4000/api/products!: ${error}`);
                        res.status(400).json({ error }); 
                    })

                } else {
                console.log("Please include `description` field. ");
                res.status(400).json({ errorMessage: "Please include 'description' field." }); 
                }
            } else { 
                console.log("Please include `name` field. ");
                res.status(400).json({ errorMessage: "Please include 'name' field." }); 
            }
        } else { 
            console.log("Please include 'name' and 'description' field. These are required fields.")
            res.status(400).json({ errorMessage: "Please include 'name' and 'description' field. These are required fields."}); 
    }
}); 

router.put("/", (req, res) => {
    console.log(`Please provide '/id' to edit.`);
    res.status(400).json({ errorMessage: "Please provide '/id' to edit." }); 
})

router.put("/:id", (req, res) => {
    if(req.params.id){ 
        if(Object.keys(req.body).length){
                if(req.body.name){
                    if(req.body.description){
                        const project = { description: req.body.description, name: req.body.name }; 
                        Projects
                        .update(req.params.id, project)
                        .then(response => {
                            if(response === null){
                                console.log(`Project ID#${req.params.id} not found! Please try again.`); 
                                res.status(400).json({ errorMessage: `Project ID#${req.params.id} not found! Please try again.`}); 
                            } else {
                            console.log(`Project ID#${req.params.id} successfully edited!`, response); 
                            res.status(200).json({ message: `Project ID#${req.params.id} successfully edited!`, response }); 
                            }
                        })
                    } else {
                    console.log("Please include `description` field. ");
                    res.status(400).json({ errorMessage: "Please include 'description' field." }); 
                    }
                } else { 
                    console.log("Please include `name` field. ");
                    res.status(400).json({ errorMessage: "Please include 'name' field." }); } 
                 } else { 
            console.log("Please include 'name' and 'description' field. These are required fields.")
            res.status(400).json({ errorMessage: "Please include 'name' and 'description' field. These are required fields."}); 
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
        Projects
        .remove(req.params.id)
        .then(response => {
                console.log(`Project ID #${req.params.id} successfully deleted!: ${response}`); 
                res.status(200).json({ message: `Project ID #${req.params.id} successfully deleted!`, response}); 
        })
        .catch(error => {
            console.log("Error in deleting project!", error); 
            res.status(400).json({ errorMessage: "Error in deleting project!: ", error});
        })
    } else {
        console.log("Please provide `id` field of the project you wish to delete."); 
        res.status(400).json({ errorMessage: "Please provide `id` field of the project you wish to delete." }); 
    }
})

module.exports = router; // export router for use

// #### Projects

// | Field       | Data Type | Metadata                                                                    |
// | ----------- | --------- | --------------------------------------------------------------------------- |
// | id          | number    | no need to provide it when creating projects, the database will generate it |
// | name        | string    | required.                                                                   |
// | description | string    | required.                                                                   |
// | completed   | boolean   | used to indicate if the project has been completed, not required            |

// **All these helper methods return a promise. Remember to use .then().catch() or async/await.**

// - `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
// - `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
// - `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
// - `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

// The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.