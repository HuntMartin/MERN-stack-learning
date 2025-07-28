import mongoose from "mongoose";

const pjSchema = mongoose.Schema(
    {
        pj_name:{
            type: String,
            required: true,
        },
        pj_intro:{
            type: String,
            required: true,
        },
        pj_creator:{
            type: String,
            required: true,
        },
        pj_publishYear:{
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
 
export const Project = mongoose.model('Project', pjSchema);