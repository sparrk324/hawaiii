<template>
    <div class="flex flex-col items-center justify-center">
      <!-- Toggle Button -->
      <button
        @click="toggleContent"
        class="px-4 py-2 mb-4 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
      >
        {{ isOpen ? 'Hide Content' : 'Show Content' }}
      </button>
  
      <!-- Content with Transition -->
      <transition name="fade-slide">
        <div
          v-if="isOpen"
          class="p-4 bg-gray-100 border border-gray-300 rounded-md"
        >
          <p class="text-gray-700">This is the content that shows and hides with a toggle button.</p>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isOpen = ref(false);
  
  function toggleContent() {
    isOpen.value = !isOpen.value;
  }
  </script>
  
  <style scoped>
  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
  }
  .fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .fade-slide-enter-to, .fade-slide-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
  </style>