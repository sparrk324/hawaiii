<template>
    <div class="container">
        <div class="section w-full h-auto md:p-10 center-all">
           <!-- text -->
           <div class="md:w-8/12 z-10 transition duration-300 ease-in-out text-center">
               <h2 class="bold-text-md" data-aos="fade-right" data-aos-duration="1400">Do you long for a career opportunity?</h2>
           </div>

           <div class="flex flex-col gap-4 justify-center min-w-full mt-10">

            <!-- SOFTWARE ENGINEER -->
            <div class="job-wrapper relative min-w-full md:w-6/12">
                <div class="job-title w-full">
                   <span>
                       <h4 class="font-black text-[18px]">Software Engineer</h4>
                       <P>(Remote)</P>
                   </span>
                   <button @click="toggleContent1" class="job-title-btn">{{ isOpen1 ? 'view less' : 'view more' }}</button>
                </div>

                <div class="w-full">
                    <Transition name="fade-slide" class="mt-4">
                      <div v-if="isOpen1"><software-dev /></div>
                    </Transition>
                </div>
            </div>

            <!-- PRODUCT OWNER -->
            <div class="job-wrapper relative min-w-full md:w-6/12">
                <div class="job-title w-full">
                   <span>
                       <h4 class="font-black text-[18px]">Product Owner</h4>
                       <P>(Remote)</P>
                   </span>
                   <button @click="toggleContent2" class="job-title-btn">{{ isOpen2 ? 'view less' : 'view more' }}</button>
                </div>

                <div class="w-full">
                    <Transition name="fade-slide" class="mt-4">
                      <div v-if="isOpen2"><product-owner /></div>
                    </Transition>
                </div>
            </div>

            <!-- Digital Marketing Specialist -->
            <div class="job-wrapper relative min-w-full md:w-6/12">
                <div class="job-title w-full">
                   <span>
                       <h4 class="font-black text-[18px]">Digital Marketing Specialist (Intern)</h4>
                       <P>(Hybrid)</P>
                   </span>
                   <button @click="toggleContent3" class="job-title-btn">{{ isOpen3 ? 'view less' : 'view more' }}</button>
                </div>

                <div class="w-full">
                    <Transition name="fade-slide" class="mt-4">
                      <div v-if="isOpen3"><digital-marketing /></div>
                    </Transition>
                </div>
            </div>
           </div>
        </div>
    </div>
</template>

<script setup>
  import { ref } from 'vue';
  
  const isOpen1 = ref(false);
  const isOpen2 = ref(false);
  const isOpen3 = ref(false);
  
  function toggleContent1() {
    isOpen1.value = !isOpen1.value;
  }

  function toggleContent2() {
    isOpen2.value = !isOpen2.value;
  }

  function toggleContent3() {
    isOpen3.value = !isOpen3.value;
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
  