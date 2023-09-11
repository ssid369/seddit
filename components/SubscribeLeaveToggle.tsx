"use client"

import { FC, startTransition } from 'react'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import axios, { AxiosError } from 'axios';
import { useCustomToasts } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps {
  subredditId: string, 
  subredditName:string,
  isSubscribed:boolean,
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
    subredditId,
    subredditName,
    isSubscribed,
}) => {

    const {loginToast}= useCustomToasts();
    const router= useRouter();


    const { mutate: subsribe, isLoading: isSubLoading}= useMutation({
        mutationFn: async ()=>{
            const payload: SubscribeToSubredditPayload={
                subredditId,
            }
            const {data} = await axios.post("/api/subreddit/subscribe",payload);
            return data as string;
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                if(err.response?.status===401){
                    return loginToast();
                }
            }

            return toast({
                title:"there was a problem",
                description:"please try again",
                variant:"destructive"
            })
        },
        onSuccess:()=>{
            startTransition(()=>{
                router.refresh();
            })
            return toast({
                title:"Subscribed",
                description:`you are subscribed to r/${subredditName}`
            })
        }
    })

    const {mutate:unSubscribe, isLoading: isUnsubLoading}= useMutation({
        
        mutationFn: async()=>{
            const payload:SubscribeToSubredditPayload={
                subredditId,
            }
            const {data}= await axios.post("/api/subreddit/unsubscribe",payload);
            return data as string;
        },
        onError:(err)=>{
            if(err instanceof AxiosError){
                if(err.response?.status===421){
                    return loginToast();
                }
            }

            return toast({
                title:"there was a problem",
                description:"please try again",
                variant:"destructive"
            })
        },
        onSuccess: ()=>{
            startTransition(()=>{
                router.refresh();
            })
            toast({
                title:"unsubsribed",
                description:`you are now unsubscribed form ${subredditName}`
            })
        }
    })

    return isSubscribed?(
        <Button 
        isLoading={isUnsubLoading}
        onClick={()=>unSubscribe()} 
        className='mt-1 mb-4 bg-red-500 hover:bg-red-500/80'>Unsubscribe</Button>
    ):(
    <Button 
    isLoading={isSubLoading}
    onClick={()=>subsribe()} 
    className=' bg-green-700/80 hover:bg-green-700'>Subscribe</Button>
    );
}

export default SubscribeLeaveToggle