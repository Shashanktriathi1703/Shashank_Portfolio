import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SpecialLoadingButton from './SpecialLoadingButton';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Image } from 'lucide-react';
import { addNewSoftwareApplication, clearAllApplicationSliceErrors, getAllSoftwareApplications, resetApplicationSlice } from '@/store/slices/softwareApplicationSlice';

const AddApplication = () => {
  const [name, setName] = useState("");
  const [svg, setSvg] = useState("");
  const [svgPreview, setSvgPreview] = useState("");

  function handleSvg(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvg(file);
      setSvgPreview(reader.result);
    }
  }

  const {loading, error, message} = useSelector((state) => state.application);
  const dispatch = useDispatch();

  function handleAddNewApplication(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("svg", svg);
    dispatch(addNewSoftwareApplication(formData));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationSliceErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  }, [dispatch, loading, error]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form className="w-[100%] px-5 md:w-[650px]" onSubmit={handleAddNewApplication}>
          <div className="space-y-12 ">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                ADD A NEW SOFTWARE APPLICATION
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Software Application Name
                  </Label>
                  <div className="mt-2">
                    <div className="flex rounded-md  shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input type="text" placeholder="Android Studio" value = {name} onChange={(e) => setName(e.target.value)} className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-2"/>
                    </div>
                  </div>
                </div>

                <div className= "col-span-full">
                  <label className= "block text-sm font-medium leading-6 text-gray-900">Software Application's Svg</label>
                  <div className= "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className= "text-center">
                      {
                        svgPreview ? (<img className='mx-auto h-[150px] w-[150px] rounded-md text-gray-300'  src = { svgPreview ? `${svgPreview}`: `./avatarHolder.jpeg1` } alt="svg"/>) : (<Image className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true'/>)
                      }
                      <div className= "mt-4 flex text-sm leading-6 text-gray-600">
                        <Label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload a file</span>
                        <Input id="file-upload" name="file-upload" type="file" class="sr-only" onChange={handleSvg}/>
                        </Label>
                        <p className= "pl-1">or drag and drop</p>
                      </div>
                      <p className= "text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {
              loading ? <SpecialLoadingButton content={"Adding Skill..."}/> : <Button type="submit" className="w-full">Add Application...</Button>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default AddApplication