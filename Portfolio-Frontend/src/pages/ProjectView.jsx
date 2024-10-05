import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const{ id } = useParams();

  useEffect(() => {
    const getProject = async() => {
      await axios.get(`http://localhost:4000/api/v1/project/get/${id}`, {withCredentials: true}).then((response) => {
        setTitle(response.data.project.title),
        setDescription(response.data.project.description),
        setProjectBanner(response.data.project.projectBanner && response.data.project.projectBanner.url),
        setGitRepoLink(response.data.project.gitRepoLink),
        setProjectLink(response.data.project.projectLink),
        setTechnologies(response.data.project.technologies),
        setStack(response.data.project.stack),
        setDeployed(response.data.project.deployed)
      }).catch((error)=> {
        toast.error(error.response.data.message);
      });
    };
    getProject();
  }, [id]);

  const descriptionInListFormat = description.split(", ");
  const technologiesInListFormat = technologies.split(", ");

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <div className="w-[100%] px-5 md:w-[1000px]">
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className='text-3xl font-bold mb-4'>{title}</h1>
                  <img src={projectBanner ? projectBanner: "./avatarHolder.jpeg1"} alt={title} className='w-full h-auto shadow-md shadow-gray-500 ring-2 ring-black/40 rounded-2xl'/>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Description:</p>
                  <ul className='list-disc'>
                    {
                      descriptionInListFormat.map((items, index) => {
                        return (
                          <li key={index}>{items}</li>
                        );
                      })
                    }
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Technologies:</p>
                  <ul className='list-disc'>
                    {
                      technologiesInListFormat.map((items, index) => {
                        return (
                          <li key={index}>{items}</li>
                        );
                      })
                    }
                  </ul>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Stack:</p>
                  <p>{stack}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Deployed:</p>
                  <p>{deployed}</p>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Github Repository Link:</p>
                  <Link to={gitRepoLink} target='_blank' className='text-sky-700'>{gitRepoLink}</Link>
                </div>

                <div className="w-full sm:col-span-4">
                  <p className='text-2xl mb-2 font-semibold'>Project Link:</p>
                  <Link to={projectLink ? projectLink : "/"} target='_blank' className='text-sky-700'>{projectLink ? projectLink : "Still Not Deployed"}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectView;