"use client"
import { User } from 'next-auth'
import { FC } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react'


interface UserAccountNavProps {
    user: Pick<User, "name" | "image" | "email">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    return <div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar className='h-8 w-8' user={{
                    name: user.name || null,
                    image: user.image || null,
                }} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' bg-white' align='end'>
                <DropdownMenuLabel>
                    <div className='flex items-center justify-start gap-2 p-2'>
                        <div className='flex flex-col space-y-1 leading-none'>
                            {user.name && <p className='font-medium'>{user.name}</p>}
                            {user.email && (
                                <p className='w-[200px] truncate text-sm text-muted-foreground'>
                                    {user.email}
                                </p>
                            )}
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/">Feed</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/r/create">make community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem onSelect={(event)=>{
                    event.preventDefault();
                    signOut({
                        callbackUrl:`${window.location.origin}/sign-in`
                    })
                }} 
                className='cursor-pointer'>Signout</DropdownMenuItem>                
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
}

export default UserAccountNav