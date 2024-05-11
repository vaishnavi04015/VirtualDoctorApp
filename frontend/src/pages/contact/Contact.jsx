import React from 'react';
// import contactImg from '../../assets/contactImg.png';
import doctorImg from "../../assets/doctorImg.png"
const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

      <div className="flex justify-around ">
        <div className="w-full md:w-1/2 px-8 mb-8">
          {/* <img className="w-3/4" src={contactImg} alt="contact" /> */}
          <img className="w-3/4" src={doctorImg} alt="contact" />
        </div>
        <div className="w-full md:w-1/2 px-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Form</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
{
  /* <iframe className='m-5'
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15079.453885723136!2d72.8362692128424!3d19.113644500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9d4ea2a2311%3A0x68124744f0f8d09!2sImarticus%20Learning%20Mumbai%20-%20Data%20Science%20%26%20Analytics%2C%20Investment%20Banking%20Course%20In%20Mumbai!5e0!3m2!1sen!2sin!4v1714210376714!5m2!1sen!2sin"
width="725"
height="250"
allowfullscreen=""
loading="lazy"
></iframe> */
}