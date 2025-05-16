import Footer from '@/app/components/Footer'
import SetNewPassword from '@/app/components/ForgotPwd/set-new-password'
import Header from '@/app/components/Header'
import React from 'react'

function page() {
  return (
    <div>
      <Header/>
        <SetNewPassword/>
      <Footer/>
    </div>
  )
}

export default page