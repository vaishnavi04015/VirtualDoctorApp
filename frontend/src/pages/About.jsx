import React from 'react';

function About() {
  return (
    <div className="container mx-auto px-4 py-8 text-xl">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <div className="max-w-3xl mx-auto text-gray-800">
        <p className="mb-4">24/7 Virtual Care is a leading provider of online healthcare services, offering convenient access to board-certified doctors and medical professionals anytime, anywhere.</p>
        <p className="mb-4">Our mission is to revolutionize the healthcare industry by leveraging technology to improve patient outcomes and increase access to quality care. With our user-friendly platform, patients can connect with experienced doctors through secure video consultations, phone calls, or text messaging.</p>
        <p className="mb-4">What sets us apart:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>24/7 Availability: We understand that health concerns don't always arise during regular office hours. That's why we offer around-the-clock access to healthcare professionals.</li>
          <li>Convenience: Skip the waiting room and receive medical advice from the comfort of your own home, office, or wherever you may be.</li>
          <li>Quality Care: Our team of board-certified doctors and medical professionals is committed to delivering personalized care and treatment plans tailored to your individual needs.</li>
          <li>Secure and Confidential: Your privacy and security are our top priorities. Our platform complies with strict healthcare regulations and uses encryption to protect your personal information.</li>
          <li>Affordability: We believe that everyone should have access to quality healthcare. Our services are affordable and transparent, with no hidden fees.</li>
        </ul>
        <p className="mb-4">Whether you need treatment for a minor illness, prescription refills, mental health support, or general medical advice, 24/7 Virtual Care is here to help. Our platform is easy to use, and our dedicated support team is available to assist you every step of the way.</p>
        <p className="mb-4">Thank you for choosing 24/7 Virtual Care for your healthcare needs. We're committed to providing you with the highest level of care and convenience.</p>
      </div>
    </div>
  );
}

export default About;
