import React, { useState } from 'react';
import { crowdImage } from '../assets';
const AboutPage = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback('');
    setSubmitted(true); // Simulate feedback submission
    setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-8 lg:px-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold leading-tight text-white">
            Revolutionizing Funding with Blockchain Technology
          </h1>
          <p className="text-gray-100 mt-4 text-lg">
            Our platform empowers individuals and organizations to raise funds
            securely and transparently using blockchain technology. By leveraging
            the power of decentralization, we eliminate intermediaries, reduce
            costs, and create a fairer fundraising experience for everyone.
          </p>
        </div>
        <div className="w-full md:w-1/2 hidden md:block">
          <img
            src={crowdImage} // Replace with your image path
            alt="About page illustration"
            className="rounded-lg shadow-md h-auto w-full object-cover"
          />
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-200">Join the Movement</h2>
        <p className="text-gray-100 mt-4">
          Be part of a future where funding is accessible, secure, and
          transparent. Whether you're a creator, entrepreneur, or simply
          believe in the power of blockchain, we invite you to join our
          community.
        </p>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-200">Feedback</h2>
        <p className="text-gray-100 mt-4">
          We value your feedback. Let us know how we can improve your
          experience with our platform.
        </p>
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full rounded-md border text-gray-400 border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none resize-none"
            placeholder="Share your thoughts and suggestions"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
          />
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 mt-4 text-white bg-[#0eaed6] rounded-md hover:bg-[#50c7e2] focus:ring-2 focus:outline-none focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!feedback}
          >
            {submitted ? 'Submitted!' : 'Send Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutPage;
