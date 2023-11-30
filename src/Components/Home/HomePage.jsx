import React from 'react'
import MainBannerSection from './MainBannerSection/MainBannerSection'
import CollaboratorsBannerSection from './CollaboratorsBannerSection/CollaboratorsBannerSection'
import PopularClassesSection from './PopularClassesSection/PopularClassesSection'

function HomePage() {
  return (
    <div>
      <MainBannerSection></MainBannerSection>
      <CollaboratorsBannerSection></CollaboratorsBannerSection>
      <PopularClassesSection></PopularClassesSection>
    </div>
  )
}

export default HomePage