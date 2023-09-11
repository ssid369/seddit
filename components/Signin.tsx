import React from 'react'
import { Icons } from './Icons'
import Link from 'next/link'
import UserAuthForm from './UserAuthForm'

const Signin = () => {
  return (
    <div className='container mx-auto flex w-fukk flex-col justify-center space-y-6 sm:w-[400px] '>
        <div className='flex flex-col space-y-2 text-center'>
            <Icons.logo className='mx-auto h-6 w-6'></Icons.logo>
            <h1 className='text-2xl font-semibold tracking-tight'> welcome back</h1>
            <p className='text-sm max-w-xs mx-auto '> you are about o start a seddit account, please go 
            throgh our preovacy policy and user agreement</p>
            {/* signionform*/}
            <UserAuthForm  />
            <p className='px-8 text-center text-sm text-zinc-700'>
                New to seddit?{''}
                <Link href="sign-up" className=' hover:text-zinc-800 text-sm underline underline-offset-4'>sign-up</Link>
            </p>

        </div>
    </div>
  )
}

export default Signin