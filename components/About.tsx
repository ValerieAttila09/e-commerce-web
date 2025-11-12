import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Our E-Commerce</h2>
            <p className="text-gray-600 mb-4">We are passionate about providing our customers with the best online shopping experience. Our mission is to offer a wide selection of high-quality products, competitive prices, and exceptional customer service.</p>
            <p className="text-gray-600">We believe that shopping online should be simple, enjoyable, and secure. That&apos;s why we&apos;ve designed our website to be user-friendly, mobile-responsive, and packed with features that make finding and purchasing your favorite products a breeze.</p>
          </div>
          <div>
            <Image src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="About Us" className="rounded-lg shadow-lg" width={1350} height={900} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
