<template>
    <div>
        <header-component />
        <content-component />
        <footer-component />
    </div>
</template>

<script>
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
import ContentComponent from './components/Content.vue'

export default {
    components: {
        HeaderComponent,
        FooterComponent,
        ContentComponent,
    },
}
</script>

<style>
</style>