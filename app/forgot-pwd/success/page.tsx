import Footer from "@/app/components/Footer";
import PasswordSuccess from "@/app/components/ForgotPwd/password-success.tsx";
import Header from "@/app/components/Header";
import React from "react";

function page() {
  return (
    <div>
      <Header />
      <PasswordSuccess />
      <Footer />
    </div>
  );
}

export default page;
