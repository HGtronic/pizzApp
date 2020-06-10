<template>
    <span class="badge badge-danger">{{ this.$store.state.cart_items_count }}</span>
</template>

<script>
    export default {
        name: "ProductsInCart",
        data() {
            return {};
        },
    }
</script>
