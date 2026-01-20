import Header from "@/components/global/Header"
import { getUserSession } from "@/services/auth/storeUser"
import { getUser } from "@/services/getUser"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const RootLayout = async ({ children }: Props) => {
    const user = await getUserSession()

    console.log("User in RootLayout", user)
    const firestoreUser = await getUser({ userId: user?.id })
    const fullUser = {
        id: user?.id!,
        name: user?.name || "",
        image: user?.image || "",
        email: user?.email || "",
        isPro: firestoreUser?.isPro || false,
    };
    return (
        <div>
            <Header user={user?.id ? fullUser : null} />
            <div className="h-[5000px]">
                {children}
            </div>
        </div>
    )
}

export default RootLayout