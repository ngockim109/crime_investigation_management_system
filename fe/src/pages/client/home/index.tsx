import React from "react"
import HelpSection from "./components/HelpSection"
import ProgramsGrid from "./components/ProgramsGrid"
import OfficerBanner from "./components/OfficerBanner"

const HomePage: React.FC = () => {
  return (
    <div className="w-full mx-auto">
      <OfficerBanner />
      <HelpSection />
      <ProgramsGrid />
    </div>
  )
}

export default HomePage
