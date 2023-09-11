import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import {z} from "zod"
export async function POST(req:Request){
    try{
        const session= await getAuthSession();
        if(!session?.user){
            return new Response("unauthorized",{status:401});
        }
        const body = await req.json();
        console.log("before parse",body);
        const {subredditId}=SubredditSubscriptionValidator.parse(body);
        console.log("after parse");
        const subscriptionExists = await db.subscription.findFirst({
            where:{
                subredditId,
                userId:session.user.id,
            }
        })
        if(subscriptionExists){
            return new Response(" you are alredy subscribed to this community",{status:400});

        }
        await db.subscription.create({
            data:{
                subredditId,
                userId:session.user.id
            }
        })
        return new Response(subredditId);
    }catch(error){
        if (error instanceof z.ZodError) {
            return new Response("invalidaded by zod parser", { status: 422 })
          }
      
          return new Response('Could not subscribe, please try again later', { status: 500 })
    }
}

