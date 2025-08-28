import React from 'react'

export default function About() {
  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-5xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          About <span className="text-indigo-600">Vansh Estate</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-slate-600 mb-12">
          Your trusted partner in finding the perfect place to call <span className="font-semibold text-slate-800">home</span>.
        </p>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-2xl p-8 md:p-12 text-left space-y-6">
          <p className="text-slate-700 leading-relaxed">
            <span className="font-semibold text-indigo-600">Vansh Estate</span> is a leading real estate agency specializing in helping clients buy, sell, and rent properties in the most desirable neighborhoods. 
            Our team of experienced agents is dedicated to providing exceptional service and making the process as smooth as possible.
          </p>

          <p className="text-slate-700 leading-relaxed">
            Our mission is to empower our clients to achieve their real estate goals through expert advice, personalized service, and a deep understanding of the local market. 
            Whether you’re buying your first home, selling your property, or searching for the perfect rental, we’re here to guide you every step of the way.
          </p>

          <p className="text-slate-700 leading-relaxed">
            With years of industry experience, our team combines knowledge, passion, and commitment to deliver results that exceed expectations. 
            At <span className="font-semibold text-indigo-600">Vansh Estate</span>, we believe real estate should be an exciting and rewarding journey — and we’re dedicated to making that a reality for you.
          </p>
        </div>
      </div>
    </div>
  )
}
