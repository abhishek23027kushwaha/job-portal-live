import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import LatestJobs from './LatestJob'
import FeaturesSection from '../components/FeaturesSection'
import useGetAllJobs from '../hooks/useGetAllJobs';

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturesSection/>
      <LatestJobs/>
    </div>
  )
}

export default Home
