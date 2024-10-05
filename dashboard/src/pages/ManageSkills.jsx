import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { clearAllSkillSliceErrors, deleteSkill, getAllSkills, resetSkillSlice, updateSkill } from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(
    (state) => state.skill
  );

  const dispatch = useDispatch();

  const [newProficiency, setNewProficiency] = useState(1);

  function handleInputChange(proficiency) {
    setNewProficiency(proficiency);
  }

  function handleUpdateSkill(id) {
    dispatch(updateSkill(id, newProficiency));
  }

  function handleDeleteSkill(id) {
    dispatch(deleteSkill(id));
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllSkillSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, message, error, loading])
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Manage Your Skills</CardTitle>
                <Link to={"/"}><Button className="w-fit">Return to Dashboard</Button></Link>
              </CardHeader>
              <CardContent className = "grid sm:grid-cols-2 gap-4">
                {
                  skills && skills.length > 0 ? (
                    skills.map((skill, index) => {
                      return(
                        <Card key={index}>
                          <CardHeader className="text-3xl font-bold items-center justify-between flex-row">
                            {skill.title}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Trash2 onClick={()=>handleDeleteSkill(skill._id)} className="h-5 w-5 hover:text-red-600"></Trash2>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" style={{color: "#C7253E"}}>
                                  Delete
                                </TooltipContent>
                              </Tooltip> 
                            </TooltipProvider>
                          </CardHeader>
                          <CardFooter>
                            <Label className="text-2xl mr-2">Proficiency</Label>
                            <Input type="number" defaultValue={skill.proficiency} onChange={(e) => handleInputChange(e.target.value)} onBlur={()=> handleUpdateSkill(skill._id)}/>
                          </CardFooter>
                        </Card>
                      )
                    })
                  ) : (
                    <CardTitle className="text-3xl overflow-y-hidden">You have not added any Skills yet.</CardTitle>
                  )
                }
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ManageSkills;
