import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mb-5">Full Profile Preview</p>
          </div>
        </div>
        <div className="grid gap-6">
            <div className="flex items-start lg:justify between lg:items-center flex-col lg:flex-row gap-5">
                <div className="grid gap-2 w-full sm:w-72">
                    <Label>Profile Image</Label>
                    <img src={user && user.avatar && user.avatar.url} alt="avatar" className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"/>
                </div>
                <div className="grid gap-2 w-full sm:w-72">
                    <Label>Resume</Label>
                    <img src={user && user.resume && user.resume.url} alt="resume" className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"/>
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input type="text" defaultValue={user.fullName} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="text" defaultValue={user.email} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Phone</Label>
                <Input type="text" defaultValue={user.phone} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>About Me</Label>
                <Textarea type="text" defaultValue={user.aboutMe} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Portfolio URL</Label>
                <Input type="text" defaultValue={user.portfolioURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Github URL</Label>
                <Input type="text" defaultValue={user.githubURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>LinkedIn URL</Label>
                <Input type="text" defaultValue={user.linkedinURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Instagram URL</Label>
                <Input type="text" defaultValue={user.instagramURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Youtube URL</Label>
                <Input type="text" defaultValue={user.youtubeURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Pinterest URL</Label>
                <Input type="text" defaultValue={user.pinterestURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Facebook URL</Label>
                <Input type="text" defaultValue={user.facebookURL} disabled/>
            </div>
            <div className="grid gap-2">
                <Label>Twitter URL</Label>
                <Input type="text" defaultValue={user.twitterURL} disabled/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
