import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (


        <div className='w-full h-screen justify-center items-center bg-white'>
            <SignIn />
        </div>

    )
}