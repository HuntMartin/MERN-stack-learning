import ProjectSingleCard from './ProjectSingleCard';

const ProjectsCard = ({projects}) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {projects.map((item) => (
            <ProjectSingleCard key={item._id} project={item} />
        ))}
    </div>
  )
}

export default ProjectsCard