import Header from "@/components/global/Header"
import { getUserSession } from "@/services/auth/storeUser"
import { getUser } from "@/services/getUser"
import { CheckUserSubscription } from "@/services/polar"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}

const RootLayout = async ({ children }: Props) => {
    const user = await getUserSession()

    if (user) {
        await CheckUserSubscription({ userId: user.id });
    }

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
            <div>
                {children}
            </div>
        </div>
    )
}

export default RootLayout