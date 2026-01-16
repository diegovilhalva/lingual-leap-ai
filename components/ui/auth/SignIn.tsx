"use client"
import CardTag from "@/components/global/CardTag"
import { useState } from "react"
import AuthForm from "./AuthForm"
import Socials from "./Socials"


const SignInComponent = () => {
  const [loading, setLoading] = useState(false)

  return (
    <CardTag title='Login to Your Account' description='Enter your email below to access  your account' content={<AuthForm loading={loading} setLoading={setLoading} />} footer={<Socials loading={loading} setLoading={setLoading} />} />
  )
}

export default SignInComponent