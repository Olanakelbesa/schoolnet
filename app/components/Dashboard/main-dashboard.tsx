import { Header } from "./header"

import { AnnouncementCards } from "./announcement-cards"
import { SavedSchools } from "./saved-schools"
import { TeachersSection } from "./teachers-section"
import NavbarSm from "./navbar-sm"
import HeroBanner from "./hero-banner"

export function MainDashboard() {
  return (
    <>
    <NavbarSm/>
      <Header />
      <main className="flex-1 px-4  md:p-6">
        <HeroBanner/>
        <AnnouncementCards />
        <SavedSchools />
        <TeachersSection />
      </main>
    </>
  )
}
