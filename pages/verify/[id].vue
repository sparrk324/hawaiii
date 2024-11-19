<template>
    <div class="h-screen grid place-content-center">
    <div class="flex justify-center items-center bg-white border-[2px] p-4 gap-6 rounded-sm">
    
    <div class="tracking-tight flex justify-center items-center gap-1">
      <button
        @click="handleRedirect"
        :disabled="isVerified"
        class="relative w-8 h-8 bg-white border-2 border-gray-400 rounded-md flex items-center justify-center transition-all duration-300 transform"
        :class="{'bg-green-500 border-green-500': isVerified}"
      >
  
      <svg v-if="isVerified"
      class="w-6 h-6 text-white transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
       <path fill="#22c55e" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path><path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
      </svg>
    
      </button>
      <p class="ml text-gray-800 font-normal text-sm"
      :class="{'text-green-600 font-bold text-[20px]': isVerified}"
      >
        {{ isVerified ? "Success!" : "Verify you are human" }}
      </p>
    </div>
  
    <div class="h-full">
        <div class="h-[30px]">
            <img class="relative h-full" src="https://upload.wikimedia.org/wikipedia/zh/thumb/a/a2/Cloudflare_logo.svg/1200px-Cloudflare_logo.svg.png" alt="">
        </div>
            <div class="mt-[-10px] flex justify-end">
                <p>
                   <a href="https://www.cloudflare.com/privacypolicy/" class="hover:text-green-600 text-[10px] underline">Privacy</a> 
                   .
                   <a href="https://www.cloudflare.com/website-terms/" class="hover:text-green-600 text-[10px] underline">Term</a> 
                </p>
            </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVerified: false,
      };
    },
    methods: {
        handleRedirect() {
      this.isVerified = true;
      setTimeout(() => {
        this.$router.push(`/${this.$route?.params?.id}`);
      }, 1000); 
    },
    },
  };
  </script>