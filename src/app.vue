<template>
    <div>
        {{title}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            title: 'This is Manage for Blog.'
        }
    },
    mounted(){
        console.log(this.title);
    }
}
</script>
<style scoped>

</style>