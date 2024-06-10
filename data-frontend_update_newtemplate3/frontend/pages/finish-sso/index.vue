<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { SECRET_TOKEN_KEY } from '~/constants/common.const';

    const route = useRoute();
    const {id, token} = route.query;
    if(id && token) {
        window.localStorage.setItem(SECRET_TOKEN_KEY, JSON.stringify({id, token}));
    }
    window.close();
   
</script>

<template>

</template>
