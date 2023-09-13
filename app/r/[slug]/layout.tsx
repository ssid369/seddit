import SubscribeLeaveToggle from '@/components/SubscribeLeaveToggle';
import { Button, buttonVariants } from '@/components/ui/button';
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db';
import format from 'date-fns/format';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react'



const Layout =async ({
    children,
    params: { slug }
}: {
    children: React.ReactNode,
    params: { slug: string },

}) => {

    const session= await getAuthSession();
    const subreddit= await db.subreddit.findFirst({
        where:{ name:slug},
        include:{
            posts:{
                include:{
                    author:true,
                    votes:true,
                }
            }
        }
    })

    
   
    const subscription = !session?.user?undefined: await db.subscription.findFirst({
        where:{
            subreddit:{
                name:slug
            },
            user:{
                id:session.user.id
            }
        }
    })
    const isSubscribed=!!subscription;

    if(!subreddit) return notFound();

    const memberCount = await db.subscription.count({
        where:{
            subreddit:{
                name:slug
            }
        }
    });

    return (<div className='sm:container max-w-7xl mx-auto h-full pt-12'>
        {/* back button*/}
        <div className='grid  grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
            <div className='flex flex-col  col-span-2 space-y-6 '>{children}</div>
            <div className=' overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last'>
                <div className='px-6 py4'>
                    <p className=' font-semibold py-3'>About r/{subreddit.name}</p>
                </div>
                    <dl className='="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white' >
                        <div className='flex justify-between gap-x-4 py-3'>
                            <dt className=' text-gray-500'>Created</dt>
                            <dt className='text-gray-700'>
                                <time dateTime={subreddit.createdAt.toDateString()}>
                                    {format(subreddit.createdAt,"MMMM d,yyyy")}
                                    </time>
                            </dt>
                        </div>
                        <div className=' flex justify-between gap-x-4 py-3'>
                            <dt className=' text-gray-500'>Members</dt>
                            <dd className='text-gray-700'>
                                {memberCount}
                            </dd>
                        </div>
                        {subreddit.creatorId===session?.user.id?(
                            <div className=' flex justify-between gap-x-4 py-3'>
                                <p className='text-gray-500'>You created this community</p>
                            </div>
                        ):null}
                        {subreddit.creatorId!==session?.user.id?(
                            <div>
                                <SubscribeLeaveToggle subredditId={subreddit.id} subredditName={subreddit.name} isSubscribed={isSubscribed}></SubscribeLeaveToggle>
                            </div>
                        ):null}
                        <Link className={buttonVariants({
                            variant:'outline',
                            className:"w-full my-6"
                        })}
                        href={` ${slug}/submit/`}
                        >Create Post</Link>
                    </dl>
                
            </div>
        </div>
    </div>)
}

export default Layout