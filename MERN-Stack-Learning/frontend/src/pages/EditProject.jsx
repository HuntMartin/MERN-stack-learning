import React, {useEffect, useState} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditProject = () => {
  const [pj_name, setName] = useState('');
  const [pj_creator, setCreator] = useState('');
  const [pj_intro, setIntro] = useState('');
  const [pj_publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar();

  const {id} = useParams();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/projects/${id}`)
    .then((response) => {
      setName(response.data.pj_name);
      setCreator(response.data.pj_creator);
      setIntro(response.data.pj_intro);
      setPublishYear(response.data.pj_publishYear);
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happened. Please check console');
      console.log(error);
    });
  }, [])
  const handleEditProject = () => {
    const data = {
      pj_name,
      pj_creator,
      pj_intro,
      pj_publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/projects/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Project edited successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', {variant: 'error'});
        //alert('An error happened. Please check console');
        console.log(error);
      })
  };

  return(
        <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Project</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Project Name</label>
          <input
            type='text'
            value={pj_name}
            onChange={(e) => setName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Project Intro</label>
          <input
            type='text'
            value={pj_intro}
            onChange={(e) => setIntro(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Project Creator</label>
          <input
            type='text'
            value={pj_creator}
            onChange={(e) => setCreator(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Project Publish Year</label>
          <input
            type='number'
            value={pj_publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProject}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProject