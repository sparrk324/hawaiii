<template>
    <div class="bg-gray-100 w-full min-h-auto flex flex-col items-center py-10 px-5">

        <div class="w-full z-10 center-all bg-gray-300">
            <img class="w-[300px]" src="/public/logo.svg" alt="">
        </div>
      <!-- Form Header -->
      <div class="w-full bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Job Application</h1>
        <p class="text-gray-700 mb-6">Fill out the form below to apply for the position.</p>
  
        <!-- Job Application Form -->
        <form @submit.prevent="handleSubmit">
          <!-- Name -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="name">Full Name</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>
  
          <!-- Email -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your email address"
            />
          </div>
  
          <!-- Phone Number -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your phone number"
            />
          </div>

           <!-- title -->
           <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="title">Title</label>
            <input
              type="title"
              id="title"
              v-model="form.title"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Job Title"
            />
          </div>
  
          <!-- Resume Upload -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="resume">Resume</label>
            <input
              type="file"
              id="resume"
              @change="handleFileUpload('resume', $event)"
              required
              class="w-full text-gray-700 border border-gray-300 rounded-md file:bg-blue-500 file:text-white file:rounded-md file:px-4 file:py-2 file:mr-2 file:cursor-pointer"
            />
          </div>
  
          <!-- Cover Letter -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-2" for="coverLetter">Cover Letter</label>
            <textarea
              id="coverLetter"
              v-model="form.coverLetter"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Introduce yourself and tell us why you’re a great fit for this role"
            ></textarea>
          </div>
  
          <!-- Submit Button -->
          <div class="text-center">
            <button
              type="submit"
              class="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          title: '',
          resume: null,
          coverLetter: '',
        },
      };
    },
    methods: {
      handleFileUpload(field, event) {
        this.form[field] = event.target.files[0];
      },
      handleSubmit() {
        // Perform form validation and processing here.
        console.log('Form submitted:', this.form);
  
        // Clear the form after submission
        this.form = {
          name: '',
          email: '',
          phone: '',
          resume: null,
          coverLetter: '',
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Custom file input style */
  input[type="file"]::file-selector-button {
    background-color: #1d4ed8;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  </style>
  