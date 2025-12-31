<template>
    <footer class="footer">
        <p>{{ fullYear }} © {{ app_name }} - V {{ version }}</p>
    </footer>
</template>
<script>
import env from 'src/environments'
import moment from 'moment'
export default {
    data() {
        return {
            app_name: env.app_name,
            version: env.version
        }
    },
    computed: {
        fullYear() {
            return moment().format('Y')
        },
    },
}
</script>
<style>
</style>
