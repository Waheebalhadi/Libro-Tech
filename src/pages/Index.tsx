import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SolutionsSection from '@/components/sections/SolutionsSection';
import IndustriesSection from '@/components/sections/IndustriesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import BlogSection from '@/components/sections/BlogSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import ContactSection from '@/components/sections/ContactSection';

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero - Primary branded section */}
        <HeroSection />
        
        {/* About - Gradient background */}
        <AboutSection />
        
        {/* Solutions - Light background */}
        <SolutionsSection />
        
        {/* Industries - Muted pattern background */}
        <IndustriesSection />
        
        {/* Why Us - Light background */}
        <WhyUsSection />

        {/* Blog - Muted background */}
        <BlogSection />
        
        {/* FAQ - Gradient background */}
        <FAQSection />
        
        {/* CTA - Primary branded */}
        <CTASection />
        
        {/* Contact - Light background */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
