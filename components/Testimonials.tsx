const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">&quot;I love shopping at this store! The products are amazing, and the customer service is top-notch. I highly recommend it to everyone.&quot;</p>
            <p className="text-gray-800 font-bold">- Jane Doe</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">&quot;The shipping was incredibly fast, and the product quality exceeded my expectations. I will definitely be a returning customer.&quot;</p>
            <p className="text-gray-800 font-bold">- John Smith</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-gray-600 mb-4">&quot;A fantastic online store with a great selection and competitive prices. I couldn&apos;t be happier with my purchase.&quot;</p>
            <p className="text-gray-800 font-bold">- Sarah Wilson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
