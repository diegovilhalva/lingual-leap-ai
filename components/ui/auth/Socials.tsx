import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    loading: boolean;
    setLoading: (loading: boolean) => void
}

const Socials = ({ loading, setLoading }: Props) => {
    const pathName = usePathname()
    const isSignIn = pathName === "/sign-in"
    return (
        <div>
            <p className="font-semibold text-sm">
              { isSignIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link className="hover:underline font-bold" 
            href={isSignIn ? "/sign-up" :"/sign-in"}>
                {isSignIn ? "Sign up" : "Sign in"}
            </Link>
        </div>
    )
}

export default Socials