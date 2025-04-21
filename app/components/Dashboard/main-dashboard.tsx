import { Header } from "./header"
import { HeroBanner } from "./hero-banner"
import { AnnouncementCards } from "./announcement-cards"
import { SavedSchools } from "./saved-schools"
import { TeachersSection } from "./teachers-section"

export function MainDashboard() {
  return (
    <>
      <Header />
      <main className="flex-1 p-4 md:p-6">
        <HeroBanner />
        <AnnouncementCards />
        <SavedSchools />
        <TeachersSection />
      </main>
    </>
  )
}
