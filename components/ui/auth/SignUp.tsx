"use client"
import CardTag from '@/components/global/CardTag'
import { useState } from 'react'
import AuthForm from './AuthForm'
import Socials from './Socials'

const SignUpComponent = () => {
  const [loading, setLoading] = useState(false)
  return (
    <CardTag title='Create Your Account' description='Enter your details below to create to your account' content={<AuthForm loading={loading}  setLoading={setLoading} />} footer={<Socials  loading={loading} setLoading={setLoading}/>}  />
  )
}

export default SignUpComponent