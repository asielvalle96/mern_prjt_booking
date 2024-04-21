import React from 'react'
import './Home.css'
import Header from '../components/Header'
import Featured from '../components/Featured'
import PropertyList from '../components/PropertyList'
import FeaturedProperties from '../components/FeaturedProperties'
import MailList from '../components/MailList'
import Footer from '../components/Footer'

export default function Home () {
  return (
    <>
      <Header showHeaderTitleToHeaderSearch='si' />

      <div className='homeContainer'>
        <Featured />
        <h1 className='homeTitle'>Browse by property type</h1>
        <PropertyList />
        <h1 className='homeTitle'>Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </>
  )
}
