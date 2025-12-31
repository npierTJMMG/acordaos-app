<template>
    <div class="header">
        <div class="logo w-100 h-100 d-flex justify-center align-center">
            <v-img :height="88" aspect-ratio="16/9" src="../assets/banco-de-sentencas-logo.png"></v-img>
        </div>
    </div>
    <div class="navbar d-flex text-white justify-center align-center">
        <div class="d-flex justify-end mr-5 align-center w-25">
            <v-icon class="mr-1">mdi-license</v-icon>
            Sobre o Banco de Acórdãos
        </div>
        <div class="d-flex justify-start ml-5 align-centers w-25">
            <v-icon class="mr-1">mdi-scale-balance</v-icon>
            Sobre a Justiça Militar
        </div>
    </div>

</template>

<style lang="scss" scoped>
.header {
    height: 150px;
    width: 100%;
}

.logo {
    background: linear-gradient(190deg, #005BB5 38%, #2176FF 76%)
}

.navbar {
    height: 53px;
    width: 100%;
    background-color: #003f88;
    font-size: 13px;
    font-family: 'Montserrat';
    font-weight: 600;
}
</style>