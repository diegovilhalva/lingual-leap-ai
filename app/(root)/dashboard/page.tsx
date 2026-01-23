import LanguageSelector from "@/components/dashboard/LanguageSelector"
import LessonGenerator from "@/components/dashboard/LessonGenerator";
import { getUserSession } from "@/services/auth/storeUser";
import { getUser } from "@/services/getUser";
import { redirect } from "next/navigation";


const DashboardPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ selectedLanguage: string }>;
}) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/sign-in");
  }
  const firestoreUser = await getUser({ userId: user?.id });
  const isPro = firestoreUser?.isPro;

  const { selectedLanguage } = await searchParams;
  const currentUser = {
    ...user,
    isPro: isPro || false,
  };
  return (
    <div className="dashboard">
      <main className="container mx-auto p-4 md:p-8">
        <div className="items-center justify-center flex mt-20">
          <LanguageSelector selectedLanguage={selectedLanguage || "Spanish"} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-10">
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
            <LessonGenerator  
              selectedLanguage={selectedLanguage || "Spanish"}
              user={currentUser}
            />
          </div>
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 shadow-lg flex flex-col border border-slate-200 dark:border-slate-700">
            Translator
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage