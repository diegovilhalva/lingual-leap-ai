import { getUserSession } from '@/services/auth/storeUser'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

const AuthLayout = async({ children }: { children: ReactNode }) => {
    const user = await getUserSession()
    if (user) {
        redirect("/dashboard")
    }
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