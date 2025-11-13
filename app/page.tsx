import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import TrendingProducts from '@/components/sections/TrendingProducts';
import Review from '@/components/sections/Review';
import Feedbacks from '@/components/sections/Feedbacks';
import Footer from '@/components/sections/Footer';

export default function App() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <TrendingProducts />
      <Review />
      <Feedbacks />
      <Footer />
    </main>
  );
}