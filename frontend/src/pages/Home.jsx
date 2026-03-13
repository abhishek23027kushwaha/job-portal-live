import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import LatestJobs from './LatestJob'
import FeaturesSection from '../components/FeaturesSection'
import useGetAllJobs from '../hooks/useGetAllJobs';
import { useDispatch } from 'react-redux';
import { setSearchJobByText } from '../redux/jobSlice';

const Home = () => {
  useGetAllJobs();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(""));
  }, [dispatch]);

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
