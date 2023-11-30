import React from 'react'
import MainBannerSection from './MainBannerSection/MainBannerSection'
import CollaboratorsBannerSection from './CollaboratorsBannerSection/CollaboratorsBannerSection'
import PopularClassesSection from './PopularClassesSection/PopularClassesSection'
import StaticsSection from './StaticsSection/StaticsSection'

function HomePage() {
  return (
    <div>
      <MainBannerSection></MainBannerSection>
      <CollaboratorsBannerSection></CollaboratorsBannerSection>
      <PopularClassesSection></PopularClassesSection>
      <StaticsSection></StaticsSection>
    </div>
  )
}

export default HomePage