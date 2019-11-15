<template>
  <div class="MovieList">
    <Header title="电影列表"></Header>
      
    
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'movieList',
  components: {
   Header,
   Footer
  }
}

</script>