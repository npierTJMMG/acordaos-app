<template>
  <v-progress-linear v-if="store.loading"
    class="d-sm-none position-sticky"
    indeterminate
    color="primary">
  </v-progress-linear>
  <div class="d-flex flex-column align-center">
    <Header />
    <Pesquisa />
  </div>
  <div class="d-flex flex-column align-center" v-if="store.hasResults">
    <Resultados />

  </div>
  <Footer />
</template>

<script lang="ts" setup>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Pesquisa from '@/components/Pesquisa.vue';
import Resultados from '@/components/Resultados.vue';
import { useSentencasStore } from '@/stores/useSentencasStore';

const store = useSentencasStore()

</script>
