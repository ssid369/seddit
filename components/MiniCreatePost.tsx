"use client"
import { FC } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import UserAvatar from './UserAvatar'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link2 } from 'lucide-react'
import { Image } from 'lucide-react'
interface MiniCreatePostProps {
  session: Session|null
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({session}) => {
    const router = useRouter();
    const pathname= usePathname();


  return <div>
    <li className='overflow-hidden rounded-mf bg-white shadow'>
        <div className=' h-full px-6 py-4 sm:flex sm:justify-between gap-6'>
            <div className='relative flex flex-row'>
                <UserAvatar 
                    user={{
                        name: session?.user.name||null,
                        image: session?.user.image||null
                    }}
                />
                <span className='absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white' />
            </div>

            <Input 
            onClick={() => router.push(pathname + '/submit')}
            placeholder='Create Post'/>
            <Button
            onClick={()=> router.push(pathname+"/submit")}
            variant="ghost"
            >
                <Image></Image>
            </Button>
            <Button
            onClick={()=> router.push(pathname+"/submit")}
            variant="ghost"
            >
                <Link2 className=' text-zinc-500'></Link2>
            </Button>

        </div>
    </li>
  </div>
}

export default MiniCreatePost