import React from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import LatestJobs from './LatestJob'
import useGetAllJobs from '../hooks/useGetAllJobs';

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar/>
      <Hero/>
      <LatestJobs/>
    </div>
  )
}

export default Home
