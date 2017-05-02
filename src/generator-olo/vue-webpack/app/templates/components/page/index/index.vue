/*
 * @Author: yourName
 * @Date: 2017-04-28 16:20:38
 * @Last Modified by: zengyanling
 * @Last Modified time: 2017-04-28 16:55:22
 */
<template src="./index.html"></template>
<script>
import Loading from 'component/loading/loading';
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return {
            a1:11223311
        }
    },
    components: {
        Loading,
    },
    created: function() {
        console.log(11122422112);
    },
    methods: {
        test(){

        }
    }
}
</script>
 <style lang="scss" src="./index.scss"></style>

