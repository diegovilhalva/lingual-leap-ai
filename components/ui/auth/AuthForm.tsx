"use client"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field"

import { email, z, } from "zod"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../input"
import { Button } from "../button"
import { Loader2 } from "lucide-react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/services/firebase"
import { saveUserToDatabase } from "@/services/auth/saveUser"



type Props = {
    loading: boolean;
    setLoading: (loading: boolean) => void,
}



const AuthForm = ({ loading, setLoading, }: Props) => {
    const pathName = usePathname()
    const isSignUp = pathName === "/sign-up"

    const formSchema = z.object({
        email: z.email("Email must be entered"),
        password: z.string().min(8, {
            message: "Password must be at least 8 characters"
        }),
        confirmPassword: isSignUp ? z.string().min(8, {
            message: "Password must be at least 8 characters"
        }) : z.string().optional()
    }).superRefine((data, ctx) => {
        if (isSignUp && data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password don't match",
                path: ["confirmPassword"]
            })
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            confirmPassword: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            if (isSignUp) {
                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then(async (userCredential) => {
                        const user = userCredential.user
                        const res = await saveUserToDatabase({
                            id: user.uid,
                            email: user.email!,
                            image: user.photoURL || "",
                            name: user.displayName || user.email!.split("@")[0],
                            isPro: false,
                        })

                        if (!res.success) {
                               toast.error("Failed to save user to database.")
                               setLoading(false)
                               return
                        }

                        await 
                        toast.success("Signed in successfully!");

                        setLoading(false)
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(`Error ${errorCode}: ${errorMessage}`);
                        setLoading(false)
                    })
            } else {
                signInWithEmailAndPassword(auth, data.email, data.password).then(async (userCredential) => {
                    const user = userCredential.user
                    toast.success("Signed in successfully!");
                    console.log(user)
                    setLoading(false)
                })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(`Error ${errorCode}: ${errorMessage}`);
                        setLoading(false)
                    })
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
                <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-email">
                                Email
                            </FieldLabel>
                            <Input {...field} id="form-rhf-email" aria-invalid={fieldState.invalid} placeholder="Enter your email" disabled={loading} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-password">
                                Password
                            </FieldLabel>
                            <Input {...field} type="password" id="form-rhf-password" aria-invalid={fieldState.invalid} placeholder="Enter your password" disabled={loading} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                {isSignUp && (
                    <Controller
                        name="confirmPassword"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-rhf-confirm-password">
                                    Confirm Password
                                </FieldLabel>
                                <Input {...field} type="password" id="form-rhf-confirm-password" aria-invalid={fieldState.invalid} placeholder="Enter your password again" disabled={loading} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                )}
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                    {isSignUp ? "Create Account" : "Login to your account"}
                </Button>
            </FieldGroup>
        </form>
    )
}

export default AuthForm