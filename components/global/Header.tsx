"use client"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";


import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { clearUserSession } from "@/services/auth/storeUser";
import { auth } from "@/services/firebase";
import { ThemeToggler } from "./ThemeToggler";

type Props = {
    user: User | null
}

const Header = ({ user }: Props) => {
    const [scrolled, setScrolled] = useState(false)
    const router = useRouter()

    const logout = async () => {
        try {
            await clearUserSession();
            signOut(auth);
            toast.success("Successfully logged out");
            router.push("/");
        } catch (error) {
            console.log("Error signing out:", error);
            toast.error(`"Error signing out:", ${error}`);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-b-slate-200  dark:border-slate-700 shadow-sm" : "bg-transparent")}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link
                        href="/"
                        className="flex items-center space-x-3"
                        aria-label="Go to homepage"
                    >
                        <Image src="/favicon.ico" alt="logo" height={30} width={30} />
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                            Lingual Leap AI
                        </h1>
                    </Link>
                    <div className="flex items-center gap-2">
                        {user ? (
                            <>
                                {/* DESKTOP */}
                                <div className="hidden sm:flex items-center">
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            className={cn(
                                                "rounded-full size-8 mr-2",
                                                user.isPro && "border-4 p-0.5 size-9 border-primary"
                                            )}
                                            alt=""
                                        />
                                    ) : null}

                                    <span className="text-sm text-slate-700 dark:text-slate-300 mr-2 capitalize">
                                        Welcome,{" "}
                                        <span
                                            className={cn(
                                                user.isPro && "text-primary text-xl font-bold italic"
                                            )}
                                        >
                                            {user.name}
                                        </span>
                                    </span>

                                    {user.isPro && (
                                        <Button className="w-fit mr-2">Your Portal</Button>
                                    )}

                                    <Button className="w-fit" onClick={logout}>
                                        Logout
                                    </Button>
                                </div>

                                {/* MOBILE */}
                                <div className="sm:hidden">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button>
                                                <img
                                                    src={user.image || "/avatar-placeholder.png"}
                                                    className={cn(
                                                        "rounded-full size-8",
                                                        user.isPro && "border-2 border-primary"
                                                    )}
                                                    alt="User avatar"
                                                />
                                            </button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel className="truncate">
                                                {user.name}
                                                <p className="text-xs font-normal text-muted-foreground truncate">
                                                    {user.email}
                                                </p>
                                            </DropdownMenuLabel>

                                            <DropdownMenuSeparator />

                                            {user.isPro && (
                                                <DropdownMenuItem asChild>
                                                    <Link href="/portal">Your Portal</Link>
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuItem asChild>
                                                <div className="flex items-center justify-between w-full">
                                                    Theme
                                                    <ThemeToggler />
                                                </div>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={logout}
                                                className="text-red-600 focus:text-red-600"
                                            >
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </>
                        ):(<div className="flex items-center gap-2"> <Link href="/sign-in"> <Button size="sm">Sign In</Button> </Link> <Link href="/sign-up"> <Button size="sm" className="hidden sm:inline-flex"> Sign Up </Button> </Link> </div>)}

                        <div className="hidden sm:block">
                            <ThemeToggler />
                        </div>

                    </div>
                </div>
            </div>

        </header>
    )
}

export default Header