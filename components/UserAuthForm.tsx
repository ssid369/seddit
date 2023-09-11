"use client"

import { FC, useState } from 'react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import { Icons } from './Icons'
import { useToast } from '../hooks/use-toast'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {

  const [isLoading,setIsLoading]=useState<boolean>(false)
  const {toast}=useToast();
  const loginWithGoogle = async ()=>{
    setIsLoading(true);
    try{
      await signIn("google")
    }catch(error){
      //notify user
      toast({
        title:"user login failed",
        description:"try again",
        variant:"destructive"
      })
    }finally{
      setIsLoading(false)
    }
  }

  return <div className={cn("flex justify-center",className)}{...props}>
    <Button 
    onClick={loginWithGoogle}
     isLoading={isLoading} 
     size={"sm"} 
     className='w-full'>
      {isLoading?null: <Icons.google className='h-4 w-4 mr-4 '/>}
      Google</Button>
  </div>
}

export default UserAuthForm