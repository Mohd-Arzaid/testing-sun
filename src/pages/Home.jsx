import AuditsMarquee from "@/components/manual/home-page-sections/AuditsMarquee"
import Hero from "@/components/manual/home-page-sections/Hero"
import LogoTicker from "@/components/manual/home-page-sections/LogoTicker"
import OurServices from "@/components/manual/home-page-sections/OurServices"

const Home = () => {
  return (
    <>
      <Hero/>
      <LogoTicker/>
      <OurServices/>
      <AuditsMarquee/>
    </>
  )
}

export default Home
