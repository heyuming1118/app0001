<template>
  <div class="home">
    <Header title="电影天堂"></Header>
    首页
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'home',
  components: {
   Header,
   Footer
  }
}
</script>
