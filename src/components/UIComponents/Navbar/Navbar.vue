<template>
    <nav :class="classes" class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <slot></slot>
            <CollapseTransition>
                <div
                    class="collapse navbar-collapse justify-content-end show"
                    :class="navbarMenuClasses"
                    v-show="showNavbar"
                    id="navigation"
                >
                    <!-- <ul class="navbar-nav">
            <slot name="navbar-menu"></slot>
                    </ul>-->
                </div>
            </CollapseTransition>
        </div>
    </nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
    name: 'navbar',
    props: {
        showNavbar: {
            type: Boolean,
            description: 'Whether navbar is visible'
        },
        navbarMenuClasses: {
            type: [String, Object],
            description: 'Navbar menu css classes'
        },
        transparent: {
            type: Boolean,
            default: true,
            description: 'Whether navbar is transparent'
        },
        position: {
            type: String,
            default: 'absolute',
            description: 'Navbar position (absolute|fixed|relative)'
        },
        type: {
            type: String,
            default: 'white',
            validator(value) {
                return [
                    'white',
                    'default',
                    'primary',
                    'danger',
                    'success',
                    'warning',
                    'info'
                ].includes(value)
            },
            description:
                'Navbar type (primary|info|danger|default|warning|success)'
        }
    },
    model: {
        prop: 'showNavbar',
        event: 'change'
    },
    components: {
        CollapseTransition
    },
    computed: {
        classes() {
            let color = `bg-${this.type}`
            let navPosition = `navbar-${this.position}`
            return [
                { 'navbar-transparent': !this.showNavbar && this.transparent },
                { [color]: this.showNavbar || !this.transparent },
                navPosition
            ]
        }
    },
    methods: {
        toggleMenu() {
            this.$emit('change', !this.showNavbar)
        }
    }
}
</script>
<style scoped>
.navbar-relative {
    position: relative;
}
.navbar .btn-round {
    background-color: transparent !important;
    border: 1px solid #fff !important;
    color: #fff !important;
}
.navbar .btn-round:hover{
    background-color: transparent !important;
}
.navbar .btn-round.logoutButtonElipses{
	background-color: transparent !important;
	color: #666 !important;
}
.navbar .btn-round.logoutButtonElipses:hover{
	background-color: #e3e3e3 !important;
}
</style>
