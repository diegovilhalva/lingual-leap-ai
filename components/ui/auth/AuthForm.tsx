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

import { z, } from "zod"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../input"
import { Button } from "../button"
import { Loader2 } from "lucide-react"



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

    const onSubmit = async(data: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            await new Promise(res => setTimeout(res, 1500)) // simula request
            toast.success(isSignUp ? "Account created successfully!" : "Logged in successfully!")
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
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