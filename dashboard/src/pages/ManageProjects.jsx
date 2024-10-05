import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { clearAllProjectSliceErrors, deleteProject, getAllProjects, resetProjectSlice } from '@/store/slices/projectSlice';
import { Eye, Pen, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManageProjects = () => {
  const {loading, error, projects, message} = useSelector((state) => state.project);

  const dispatch = useDispatch();

  function handleDeleteProject(id) {
    dispatch(deleteProject(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllProjectSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, message, error, loading])

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your  Projects</CardTitle>
                <Link to={"/"}><Button>Return to Dashbord</Button></Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Banner</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Stack</TableHead>
                    <TableHead>Deployed</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    projects && projects.length > 0 ? (
                      projects.map((item, index) => {
                        return(
                          <TableRow key={index} className="bg-accent">
                            <TableCell>
                              <div>
                                <img src={item.projectBanner && item.projectBanner.url} alt={item.title} className='w-16 h-16 rounded-md shadow-md shadow-black/20' />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.stack}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.deployed}</TableCell>
                            <TableCell className="flex flex-row items-center gap-3 h-24">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/view/project/${item._id}`}><button className="border-green-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-600 hover:text-slate-50 hover:bg-green-600 shadow-md shadow-black/20"><Eye className="h-5 w-5"></Eye></button></Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    View
                                  </TooltipContent>
                                </Tooltip> 
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Link to={`/update/project/${item._id}`}><button className="border-yellow-500 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-500 hover:text-slate-50 hover:bg-yellow-500 shadow-md shadow-black/20"><Pen className="h-5 w-5"></Pen></button></Link>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Update
                                  </TooltipContent>
                                </Tooltip> 
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600 shadow-md shadow-black/20" onClick={()=>handleDeleteProject(item._id)}><Trash2 className="h-5 w-5"></Trash2></button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom">
                                    Delete
                                  </TooltipContent>
                                </Tooltip> 
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    )):(
                          <TableRow>
                            <TableCell className="text-xl overflow-y-hidden">
                              You have not added any project yet.
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
    </>
  )
}

export default ManageProjects