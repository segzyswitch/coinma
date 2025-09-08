<template>
  <a
    :href="whatsAppLink"
    target="_blank"
    rel="noopener"
    class="whatsapp-float"
  >
    <img
      src="https://freelogopng.com/images/all_img/1661938371whatsapp-png-logo.png"
      alt="Chat on WhatsApp"
      class="whatsapp-icon"
    />
  </a>
</template>

<script setup>
const phone = '+15816198238' // Replace with your full number (no + or spaces)
const message = encodeURIComponent("Hi! I'd like to know more about your services.")

const whatsAppLink = `https://wa.me/${phone}?text=${message}`
</script>

<style scoped>
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.whatsapp-icon {
  width: 50px;
  height: 50px;
}
</style>
