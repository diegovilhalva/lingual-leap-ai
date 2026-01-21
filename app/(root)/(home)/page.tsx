import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import { getUserSession } from "@/services/auth/storeUser";
import { getUser } from "@/services/getUser";


export default async function Home() {
   const user = await getUserSession()
    const firestoreUser = await getUser({ userId: user?.id });
 
  const fullUser = {
    id: user?.id!,
    name: user?.name || "",
    image: user?.image || "",
    email: user?.email || "",
    isPro: firestoreUser?.isPro || false,
  };
  return (
    <div>
      <Hero user={user?.id ? fullUser : null} />
      <Features />
    </div>
  );
}
