import Header from "@/components/global/Header"
import { getUserSession } from "@/services/auth/storeUser"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const RootLayout = async({ children }: Props) => {
    const user = await getUserSession()

    console.log("User in RootLayout",user)
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default RootLayout