import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { clearAllApplicationSliceErrors, deleteSoftwareApplication, getAllSoftwareApplications, resetApplicationSlice } from '@/store/slices/softwareApplicationSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';

const Dashboard = () => {
  const {user} = useSelector((state) => state.user);
  const {projects} = useSelector((state) => state.project);
  const {skills} = useSelector((state) => state.skill);
  const {softwareApplications, error, loading, message} = useSelector((state) => state.application);
  const {timeline} = useSelector((state) => state.timeline);

  const dispatch = useDispatch();

  const[appId, setAppId] = useState("");
  function handlDeleteSoftwareApp(id){
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, error, message, loading])

  return (
    <>
      <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
        <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2'>
          <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
            <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
              <Card className="sm:col-span-2 ring-2 ring-black/50 shadow-md shadow-black">
                <CardHeader className="pb-3">
                  <CardDescription className="max-w-lg text-balance leading-relaxed">{user.aboutMe}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link to={user.portfolioURL && user.portfolioURL} target="_blank"><Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Visit Portfolio</Button></Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center ring-2 ring-black/50 shadow-md shadow-black">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">{projects && projects.length}</CardTitle>
                </CardHeader>
                <CardFooter>
                <Link to={"/manage/projects"}><Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Manage Projects</Button></Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col justify-center ring-2 ring-black/50 shadow-md shadow-black">
                <CardHeader className="pb-2">
                  <CardTitle>Skills</CardTitle>
                  <CardTitle className="text-6xl">{skills && skills.length}</CardTitle>
                </CardHeader>
                <CardFooter>
                <Link to={"/manage/skills"}><Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Manage Skills</Button></Link>
                </CardFooter>
              </Card>
            </div>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>My Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Stack</TableHead>
                          <TableHead className="hidden md:table-cell">Deployed</TableHead>
                          <TableHead className="md:table-cell">Update</TableHead>
                          <TableHead className="text-right">Visit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          projects && projects.length > 0 ? (
                            projects.map((project, index) => {
                              return (
                                <TableRow key={index} className="bg-accent">
                                  <TableCell className="font-semibold">
                                    <div className='font-semibold'>{project.title}</div>
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">{project.stack}</TableCell>
                                  <TableCell className="hidden md:table-cell">{project.deployed}</TableCell>
                                  <TableCell>
                                    <Link to={`/update/project/${project._id}`}>
                                      <Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Update</Button>
                                    </Link>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <Link to={project.projectLink ? `${project.projectLink}` : ""} target='_blank'>
                                      <Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Visit</Button>
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )) : (
                          <TableRow>
                            <TableCell className="text-3xl overflow-y-hidden">
                              You have not added any project yet
                            </TableCell>
                          </TableRow>)
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent>
                <Card>
                  <CardHeader className="px-7 gap-3">
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    {
                      skills && skills.length > 0 ? (
                        skills.map((skill, index) => {
                          return(
                            <Card key={index}>
                              <CardHeader>{skill.title}</CardHeader>
                              <CardFooter>
                                <Progress value={skill.proficiency}/>
                              </CardFooter>
                            </Card>
                          )
                        })
                      ) : (
                        <p className="text-3xl overflow-y hidden"> You have not added any skills yet.</p>
                      )
                    }
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <Tabs>
              <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="px-7">
                    <CardTitle>Software Applications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead className="md:table-cell">Icon</TableHead>
                          <TableHead className="md:table-cell">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          softwareApplications && softwareApplications.length > 0 ? (
                            softwareApplications.map((softwareApplication, index) => {
                              return(
                                <TableRow key={index} className="bg-accent">
                                  <TableCell>{softwareApplication.name}</TableCell>
                                  <TableCell><img src={softwareApplication.svg && softwareApplication.svg.url} alt={softwareApplication.name} className='w-10 h-10 rounded-md shadow-md shadow-gray-800/30'/></TableCell>
                                  <TableCell>
                                  {
                                    loading && appId === softwareApplication.id ? (
                                      <SpecialLoadingButton content = {"Deleting..."} width = {"w-fit"}/>
                                    ) : (<Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none" onClick = {()=>handlDeleteSoftwareApp(softwareApplication._id)}>Delete</Button>) 
                                  }
                                  </TableCell>
                                </TableRow>
                              )
                            })
                          ) : 
                          <TableRow>
                            <TableCell className="text-xl overflow-y-hidden">
                              You have not added any software applications yet.
                            </TableCell>
                          </TableRow>
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="px-7 flex items-center justify-between flex-row">
                    <CardTitle>Timeline</CardTitle>
                    <Link to={"/manage/timeline"}><Button className="ring-white/50 shadow-md shadow-gray-500 active:shadow-none">Manage Timeline</Button></Link>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>To</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          timeline && timeline.length > 0 ? (
                            timeline.map((item, index) => {
                              return(
                                <TableRow key={index} className="bg-accent">
                                  <TableCell className="font-medium">{item.title}</TableCell>
                                  <TableCell className="md:table-cell">{item.timeline.from}</TableCell>
                                  <TableCell className="md:table-cell">{item.timeline.to}</TableCell>
                                </TableRow>
                              )
                            }
                          )):(
                            <TableRow>
                              <TableCell className="text-xl overflow-y-hidden">
                                You have not added any timeline items yet.
                              </TableCell>
                            </TableRow>
                          )
                        }
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard;