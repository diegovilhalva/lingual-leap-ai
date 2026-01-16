import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="auth-layout">
            <Link className="flex items-center gap-2 self-center font-bold" href="/">
                <Image src="/favicon.ico" alt='logo' width={30} height={30} />
                Lingual leap AI
            </Link>
            {children}
        </div>
    )
}

export default AuthLayout