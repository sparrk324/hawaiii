<template>
    <div class="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5">
      <!-- Job Header -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Full-Stack Software Developer</h1>
        <p class="text-gray-600 mb-1"><strong>Location:</strong> Remote</p>
        <p class="text-gray-600 mb-4"><strong>Type:</strong> Full-Time / Part Time</p>
        <p class="text-gray-600 mb-4"><strong>Salary Range:</strong> 90k</p>
        <p class="text-gray-700 mb-4">
          Join <span class="font-semibold">AccardoTech</span>, a company focused on delivering innovative solutions in [industry]. We value creativity,
          collaboration, and personal growth. This is your chance to be part of a team.
        </p>
      </div>
  
      <!-- Job Description -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Job Overview</h2>
        <p class="text-gray-700 mb-4">
          We are seeking a skilled Full-Stack Software Developer to design, develop, and maintain applications from end to end. The ideal
          candidate will thrive in a fast-paced, collaborative environment and be highly motivated to deliver impactful work.
        </p>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Key Responsibilities</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Develop, test, and maintain front-end and back-end components for scalable web applications</li>
          <li>Design and implement efficient, reusable, and reliable code</li>
          <li>Collaborate with product managers, designers, and other developers to define and implement new features</li>
          <li>Troubleshoot, debug, and optimize code for performance and scalability</li>
          <li>Integrate data storage solutions, such as databases or cloud-based storage</li>
          <li>Ensure application security and data protection best practices</li>
        </ul>
      </div>
  
      <!-- Requirements Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Requirements</h3>
        <p class="text-gray-700 mb-2 font-semibold">Education & Experience:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Bachelor’s degree in Computer Science, Software Engineering, or a related field (or equivalent experience)</li>
          <li>3+ years of experience as a full-stack developer with expertise in front-end and back-end development</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Technical Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Proficiency in HTML, CSS, JavaScript, and frameworks like React, Angular, or Vue.js</li>
          <li>Strong back-end skills in Node.js, Python, Ruby, Java, or PHP</li>
          <li>Experience with relational and NoSQL databases (e.g., MySQL, PostgreSQL, MongoDB)</li>
          <li>Familiarity with API development (RESTful, GraphQL)</li>
          <li>Knowledge of cloud services (AWS, Azure, Google Cloud) is a plus</li>
        </ul>
        <p class="text-gray-700 mb-2 font-semibold">Additional Skills:</p>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Strong problem-solving skills and attention to detail</li>
          <li>Excellent communication and teamwork abilities</li>
          <li>Ability to work independently and manage time effectively in a remote or hybrid environment</li>
        </ul>
      </div>
  
      <!-- Nice-to-Haves Section -->
      <div class="max-w-2xl w-full bg-white rounded-lg shadow-lg mt-6 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-2">Nice-to-Haves</h3>
        <ul class="list-disc list-inside text-gray-700 space-y-2 mb-4">
          <li>Experience with Docker or Kubernetes for containerization</li>
          <li>Understanding of microservices architecture</li>
          <li>Familiarity with testing frameworks (e.g., Jest, Mocha, Jasmine)</li>
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
          If you're passionate about technology and eager to work on impactful projects, we’d love to hear from you!
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
  