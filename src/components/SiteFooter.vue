<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p>© 2026 Vue 个人主页实验</p>
     <button type="button" class="back-to-top" @click="scrollToTop" aria-label="返回顶部">
        返回顶部
      </button>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.82);
  border-top: 1px solid rgba(145, 176, 255, 0.2);
  box-shadow: 0 -8px 22px rgba(38, 78, 168, 0.1);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  color: #475569;
  font-size: 0.92rem;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #62a5ff, #4a7ef0);
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(90, 130, 235, 0.18);
  transition: transform 0.2s ease;
}

.back-to-top:hover {
  transform: translateY(-1px);
}

:global(body.theme-dark) .site-footer {
  background: rgba(17, 17, 17, 0.8);
  border-color: rgba(255, 255, 255, 0.08);
}

:global(body.theme-dark) .footer-inner {
  color: rgba(255, 255, 255, 0.8);
}
</style>
