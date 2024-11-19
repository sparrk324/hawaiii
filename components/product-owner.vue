<template>
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5">
      <!-- Job Header -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Product Owner</h1>
        <p class="text-gray-600 mb-1"><strong>Location:</strong> Remote</p>
        <p class="text-gray-600 mb-4"><strong>Type:</strong> Full-Time</p>
        <p class="text-gray-600 mb-4"><strong>Salary Range:</strong> Competitive</p>
        <p class="text-gray-700 mb-4">
          Join <span class="font-semibold">AccardoTech</span>, a company focused on delivering innovative solutions. We value creativity,
          collaboration, and personal growth. This is your chance to be part of a team.
        </p>
      </div>
  
      <!-- Job Description -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Job Overview</h2>
        <p class="text-gray-700 mb-4">
          We are seeking an experienced and motivated Product Owner to join our team. As a Product Owner, you will serve as the bridge between our customers, stakeholders, and development teams, guiding the product’s vision from conception to implementation.
        </p>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Key Responsibilities</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Define product vision and strategy in collaboration with stakeholders</li>
          <li>Manage and prioritize the product backlog to maximize value</li>
          <li>Write clear user stories and acceptance criteria for development</li>
          <li>Communicate progress and gather feedback from stakeholders</li>
          <li>Lead sprint planning and participate in sprint reviews</li>
          <li>Conduct market research and analyze data to inform decisions</li>
        </ul>
      </div>
  
      <!-- Requirements Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
        <p class="text-gray-700 mb-2 font-semibold">Education & Experience:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Bachelor’s degree in Business, Computer Science, or a related field</li>
          <li>3+ years of experience as a Product Owner or similar role in software development</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Technical Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Familiarity with Agile and Scrum methodologies</li>
          <li>Understanding of software development processes and tools (e.g., JIRA, Trello)</li>
          <li>Knowledge of UX/UI design principles</li>
          <li>Strong analytical and problem-solving skills</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Additional Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Excellent communication and teamwork abilities</li>
          <li>Ability to work independently and manage time effectively</li>
        </ul>
      </div>
  
      <!-- Nice-to-Haves Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nice-to-Haves</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Experience with data analysis tools</li>
          <li>Certifications like Certified Scrum Product Owner (CSPO) or similar</li>
          <li>Familiarity with API development (RESTful, GraphQL)</li>
        </ul>
      </div>
  
      <!-- Benefits Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">What We Offer</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Competitive salary and benefits package</li>
          <li>Opportunities for career growth and development</li>
          <li>Flexible work arrangements (remote, hybrid, in-office)</li>
          <li>A collaborative and inclusive team culture</li>
          <li>Access to training and continuous learning resources</li>
        </ul>
      </div>
  
      <!-- Call to Action -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6 text-center">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ready to Apply?</h3>
        <p class="text-gray-700 mb-4">
          If you're passionate about delivering exceptional products and eager to drive meaningful change, we’d love to hear from you!
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
  