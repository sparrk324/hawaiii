<template>
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5">
      <!-- Job Header -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Digital Marketing Specialist Intern</h1>
        <p class="text-gray-600 mb-1"><strong>Location:</strong> Hybrid</p>
        <p class="text-gray-600 mb-4"><strong>Type:</strong> Internship</p>
        <p class="text-gray-600 mb-4"><strong>Salary Range:</strong> Competitive</p>
        <p class="text-gray-700 mb-4">
          Join <span class="font-semibold">AccardoTech</span>, a company focused on delivering innovative solutions. We value creativity,
          collaboration, and personal growth. This is your chance to gain valuable experience in the digital marketing field.
        </p>
      </div>
  
      <!-- Job Description -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Job Overview</h2>
        <p class="text-gray-700 mb-4">
          We are looking for a motivated Digital Marketing Specialist Intern to assist our marketing team in developing and executing digital marketing strategies. This internship offers an exciting opportunity to learn and grow your skills in a fast-paced environment.
        </p>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Key Responsibilities</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Assist in the creation and implementation of digital marketing campaigns</li>
          <li>Conduct market research and analyze trends to support marketing initiatives</li>
          <li>Manage social media accounts and engage with our audience</li>
          <li>Help develop content for websites, blogs, and newsletters</li>
          <li>Track and report on the performance of digital marketing efforts</li>
          <li>Collaborate with the marketing team to brainstorm new ideas and strategies</li>
        </ul>
      </div>
  
      <!-- Requirements Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
        <p class="text-gray-700 mb-2 font-semibold">Education & Experience:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Currently pursuing a degree in Marketing, Communications, or a related field</li>
          <li>No prior experience required, but coursework or projects in digital marketing is a plus</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Technical Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Familiarity with social media platforms (Facebook, Instagram, Twitter, LinkedIn)</li>
          <li>Basic understanding of digital marketing concepts (SEO, PPC, content marketing)</li>
          <li>Proficiency in Microsoft Office Suite (Word, Excel, PowerPoint)</li>
          <li>Knowledge of design tools (Canva, Adobe Creative Suite) is a plus</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Additional Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Strong written and verbal communication skills</li>
          <li>Creative thinking and problem-solving abilities</li>
          <li>Ability to work in a team and independently</li>
        </ul>
      </div>
  
      <!-- Nice-to-Haves Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nice-to-Haves</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Experience with email marketing platforms (Mailchimp, Constant Contact)</li>
          <li>Understanding of Google Analytics or similar web analytics tools</li>
          <li>Interest in video marketing and content creation</li>
        </ul>
      </div>
  
      <!-- Benefits Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">What We Offer</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Hands-on experience in digital marketing</li>
          <li>Mentorship from experienced marketing professionals</li>
          <li>Flexible work hours</li>
          <li>Opportunity for future employment upon completion of the internship</li>
          <li>Access to training and continuous learning resources</li>
        </ul>
      </div>
  
      <!-- Call to Action -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ready to Apply?</h3>
        <p class="text-gray-700 mb-4">
          If you're eager to kickstart your career in digital marketing and gain valuable experience, we’d love to hear from you!
        </p>
        <nuxt-link to="/application">
        <button class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700">
          Apply Now
        </button>
        </nuxt-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JobDescription'
  }
  </script>
  
  <style scoped>
  /* Add any custom styling here if needed */
  </style>
  