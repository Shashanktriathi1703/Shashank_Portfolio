import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { clearAllUserErrors, login } from "@/store/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {loading, isAuthenticated, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    function handleLogin(){
        dispatch(login(email, password));
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if(isAuthenticated){
            navigateTo('/');
        }
    }, [dispatch, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                placeholder="m@example.com"
                value = {email}
                onChange = {(e)=>{
                    setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/password/forgot"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input type="password" value = {password} onChange = {(e)=>{setPassword(e.target.value)}} required/>
            </div>
            {
              loading ? (<SpecialLoadingButton content={"Logging In"}/>) :
              <Button type="submit" className="w-full" onClick = {handleLogin}>
                Login
              </Button>
            }
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img
          src=".\src\images\pic.png"
          alt="Image"
        />
      </div>
    </div>
  )
}

export default Login;