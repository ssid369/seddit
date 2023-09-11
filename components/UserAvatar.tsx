import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User } from 'next-auth'
import Image from 'next/image'
import { FC, use } from 'react'
import { Icons } from './Icons'
import { AvatarProps } from '@radix-ui/react-avatar'

interface UserAvatarProps extends AvatarProps{
  user: Pick<User, "name"|"image">
}

const UserAvatar: FC<UserAvatarProps> = ({user, ...props}) => {
  return <div>
    <Avatar>
        {user.image?(
            <div className='relatice aspect-square h-full w-full'>
                <Image
                fill
                src={user.image}
                alt="profile picture"
                referrerPolicy="no-referrer"
                />
            </div>
        ):(
            <AvatarFallback>
                <span className='sr-only'>{user?.name}</span>
                <Icons.user></Icons.user>
            </AvatarFallback>
        )}
    </Avatar>
  </div>
}

export default UserAvatar