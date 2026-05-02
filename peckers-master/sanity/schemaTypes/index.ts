import { type SchemaTypeDefinition } from 'sanity'
import homepage from './homepage'
import location from './location'
import sliderCard from './sliderCard'
import homepagePersonDetails from './homepagePersonDetails'
import footer from './footer'
import menupage from './menupage'
import ourstorypage from './ourstorypage'
import ourstorybottompage from './ourstorybottompage'
import siteSettings from './siteSettings'
import locationPage from './locationPage'
import mapSection from './mapSection'
import reviewsHomepage from './reviewsHomepage'
import enquireSection from './enquireSection'
import saucepage from './saucepage'
import uniquenessLanding from './uniquenessLanding'
import uniquenessSubsection from './uniquenessSubsection'
import timeline from './timeline'
import locationHistory from './locationHistory'
import menuNavbar from './menuNavbar'
import crewpage from './crewpage'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepage, location, sliderCard, homepagePersonDetails, footer, 
    menupage, ourstorypage, timeline, ourstorybottompage, siteSettings, 
    locationPage, mapSection, reviewsHomepage, enquireSection, 
    saucepage, uniquenessLanding, uniquenessSubsection, locationHistory, 
    menuNavbar, crewpage
  ],
}

