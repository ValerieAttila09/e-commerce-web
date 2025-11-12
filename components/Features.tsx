const Features = () => {
  return (
    <section id="features" className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Wide Selection</h3>
            <p className="text-gray-600">We offer a vast collection of products, from electronics to fashion, to suit every need and taste.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Fast Shipping</h3>
            <p className="text-gray-600">We provide fast and reliable shipping to ensure you receive your orders as quickly as possible.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Excellent Support</h3>
            <p className="text-gray-600">Our dedicated customer support team is always ready to assist you with any questions or concerns.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
