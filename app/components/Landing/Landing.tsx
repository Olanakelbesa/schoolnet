import React from 'react'
import HeroSection from './HeroSection'
import ChooseSection from './ChooseSection'
import SchoolCategories from './SchoolCategories'
import HowItWorks from './HowItWork'
import Testimonials from './Testimonilals'
import CTASection from './CTASection'
import Footer from '../Footer'

function Landing() {
  return (
    <div>
      <HeroSection/>
      <ChooseSection/>
      <SchoolCategories/>
      <HowItWorks/>
      <Testimonials/>
      <CTASection/>
      <Footer/>
    </div>
  )
}

export default Landing