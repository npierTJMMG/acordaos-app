<template>
    <div class="full-page-error">
        <div class="col-lg-4 col-md-6 ml-auto mr-auto">
            <h2 class="mt-3"><i class="fa fa-info-circle"></i> Erro 404! Página não encontrada</h2>
            <p>
                Oops! Não conseguimos encontrar a página que você requisitou.
                Você pode navegar de volta a página principal aqui:
                <router-link to="/">Página principal</router-link>
            </p>
        </div>
    </div>
</template>
<script>
import {
    Card,
    Checkbox,
    Button,
    InfoSection
} from 'src/components/UIComponents'
//import AppNavbar from '../../Dashboard/Views/Pages/Layout/AppNavbar'
//import AppFooter from '../../Dashboard/Views/Pages/Layout/AppFooter'
export default {
    components: {
        Card,
        //     AppNavbar,
        //     AppFooter,
        InfoSection,
        [Checkbox.name]: Checkbox,
        [Button.name]: Button
    },
    methods: {
        toggleNavbar() {
            document.body.classList.toggle('nav-open')
        },
        closeMenu() {
            document.body.classList.remove('nav-open')
            document.body.classList.remove('off-canvas-sidebar')
        }
    },
    beforeDestroy() {
        this.closeMenu()
    }
}
</script>
<style>
.full-page-error {
    display: flex;
    background: #fff;
    height: 100vh;
    min-height: 100vh;
    justify-content: center;
	align-items: center;
	text-align: center;
}
</style>
