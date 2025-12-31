<template>
    <div class="row-flex justify-content-end navigation-path mb-4">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>{{ routeFatherName }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ routeName }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    props: {
        routeName: String,
        routeFatherName: String,
    },
    methods: {
        redirect(path){
            if (this.$route.path !== path) {
                this.$router.push(path)
            }
        }
    }
}
</script>