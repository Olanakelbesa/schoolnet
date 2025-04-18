import Image from "next/image";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing/Landing";

export default function Home() {
  return (
    <div>
      {/* <Login/> */}
      {/* <SignUp /> */}
      <Navbar/>
      <Landing/>
    </div>
  );
}
