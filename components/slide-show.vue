<template>
    <div class="">
        <div class="animation-container">
            <div class="moving-box box1"></div>
            <div class="moving-box box2"></div>
            <div class="moving-box box3"></div>
            <div class="moving-box box4"></div>
       <div class="moving-box box5"></div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MovingBoxes'
  };
  </script>
  
  <style scoped>
  /* Container to hold the boxes and set up overflow */
  .animation-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  /* General styling for all moving boxes */
  .moving-box {
    width: 300px;
    height: 100px;
    position: absolute;
    right: 0;
    animation: moveLeft 15s linear infinite; /* Increased duration for slower movement */
  }
  
  /* Different colors and animation delays for each box */
  .box1 {
    background-color: #3498db;
    animation-delay: 0s;
  }
  
  .box2 {
    background-color: #e74c3c;
    animation-delay: 3s;
  }
  
  .box3 {
    background-color: #2ecc71;
    animation-delay: 6s;
  }
  
  .box4 {
    background-color: #f1c40f;
    animation-delay: 9s;
  }
  
  .box5 {
    background-color: #9b59b6;
    animation-delay: 12s;
  }
  
  /* Animation to move the box from right to left */
  @keyframes moveLeft {
    0% {
      transform: translateX(100vw);
    }
    100% {
      transform: translateX(-100vw);
    }
  }
  </style>
  