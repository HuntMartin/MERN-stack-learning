import express from 'express';
import { Project } from '../models/projectModel.js';

const router = express.Router();

// Route for Save a new Project
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.pj_name ||
            !request.body.pj_intro ||
            !request.body.pj_creator ||
            !request.body.pj_publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, intro, creator, publish year of the project'
            })
        }
        const newProject = {
            pj_name: request.body.pj_name,
            pj_intro: request.body.pj_intro,
            pj_creator: request.body.pj_creator,
            pj_publishYear: request.body.pj_publishYear,
        };
        const pj = await Project.create(newProject);
        return response.status(201).send(pj);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

//Route for Get all projects from database
router.get('/', async (request, response) =>{
    try{
        const projects = await Project.find({});
        return response.status(200).json({
            count: projects.length,
            data: projects
        });
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//Route for Get one project from database by id
router.get('/:id', async (request, response) =>{
    try{
        const { id } = request.params;
        const project = await Project.findById(id);
        return response.status(200).json(project);
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

//Route for Update a project
router.put('/:id', async (request, response) => {
    try{
        if(
            !request.body.pj_name ||
            !request.body.pj_intro ||
            !request.body.pj_creator ||
            !request.body.pj_publishYear
        ){
            return response.status(400).send({
                message: 'send all required fields!'
            });
        }
        
        const { id } = request.params;

        const result = await Project.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: 'Project Not Found'});
        }
        return response.status(200).json({message: 'Project updated successfully'});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route for delete a project
router.delete('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        const result = await Project.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Project Not Found'});
        }
        return response.status(200).send({message: 'Project deleted successfully'});

    } catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;