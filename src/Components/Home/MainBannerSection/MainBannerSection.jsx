import { Carousel } from 'flowbite-react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function MainBannerSection() {
  return (
    <div className='h-56 sm:h-64 xl:h-80 2xl:h-96'>
      <Carousel slide={true} slideInterval={4000} className='border-4'>
        <img src='/images/banner_1.svg' alt='...' className='w-full h-full'></img>
        <img src='/images/banner_2.svg' alt='...' className='w-full h-full'></img>
        <img src='/images/banner_3.svg' alt='...' className='w-full h-full'></img>
      </Carousel>
    </div>
  )
}

export default MainBannerSection