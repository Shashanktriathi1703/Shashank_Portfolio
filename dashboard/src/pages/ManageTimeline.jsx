import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllTimelineErrors, deleteTimeline, getAllTimeline, resetTimelineSlice } from "@/store/slices/timelineSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageTimeline = () => {
  const { loading, message, error, timeline } = useSelector((state) => state.timeline);
  const dispatch = useDispatch();


  function deletetimeline(id){
    dispatch(deleteTimeline(id));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if(message){
      toast.success(message); 
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, message, loading]);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your  Timeline</CardTitle>
                <Link to={"/"}><Button>Return to Dashbord</Button></Link>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    timeline && timeline.length > 0 ? (
                      timeline.map((item, index) => {
                        return(
                          <TableRow key={index} className="bg-accent">
                            <TableCell className="font-medium">{item.title}</TableCell>
                            <TableCell className="font-medium">{item.description}</TableCell>
                            <TableCell className="md:table-cell">{item.timeline.from}</TableCell>
                            <TableCell className="md:table-cell text-right">{item.timeline.to}</TableCell>
                            <TableCell className="flex justify-end">
                              <button className="border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-50 hover:bg-red-600" onClick={()=>deletetimeline(item._id)}><Trash2 className="h-5 w-5"></Trash2></button>
                            </TableCell>
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
    </>
  )
};

export default ManageTimeline;
