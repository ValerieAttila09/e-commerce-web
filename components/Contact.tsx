'use client'
const Contact = () => {
    return (
      <section id="contact" className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
          <div className="max-w-lg mx-auto">
            <form className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                <input type="text" id="name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input type="email" id="email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Message</label>
                <textarea id="message" rows={5} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-indigo-600 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-indigo-700">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  };
  
  export default Contact;
  