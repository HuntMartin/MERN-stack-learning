import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import ProjectsTable from '../components/home/ProjectsTable';
import ProjectsCard from '../components/home/ProjectsCard';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/projects')
            .then((response) => {
                setProjects(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <div className='flex justify-center items-center gap-x-4'>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-1g'
                    onClick={() => setShowType('table')}
                >
                    Table
                </button>
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-1g'
                    onClick={() => setShowType('card')}
                >
                    Card
                </button>

            </div>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Projects List</h1>
                <Link to='/projects/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner /> //This is for being a symbol of loading(refreshing)
            ) : showType === 'table' ? (<ProjectsTable projects={projects} />) : (<ProjectsCard projects={projects} />)
            }

        </div>
    )
}

export default Home