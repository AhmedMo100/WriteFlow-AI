import Footer from "./sections/public/footer";
import Header from "./sections/public/header";
import Hero from "./sections/home/hero";
import FeaturedPosts from "./sections/home/featuredPosts";
import WhyWriteFlowAI from "./sections/home/whyWriteflow";
import LatestPosts from "./sections/home/latestPosts.server";
import CallToAction from "./sections/public/callToAction";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <main className="flex flex-col">

        {/* Hero */}
        <Hero />

        {/* Featured Posts */}
        <FeaturedPosts />

        {/* Why Write Flow AI */}
        <WhyWriteFlowAI />

        {/* Latest Posts */}
        <LatestPosts />

        {/* CTA */}
        <CallToAction
          title={<>Dive into the <span className="text-accent">WriteFlow AI</span> Experience</>}
          description="Explore, discover, and enjoy high-quality blogs carefully curated for you."
          buttonText="Explore Blogs"
          buttonLink="/public/posts"
        />

      </main>
      <Footer />
    </div>
  )
}
