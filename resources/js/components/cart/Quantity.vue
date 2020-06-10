<template>
    <td class="border-0 align-middle">
        <label for="quantity">
            <input type="number"
                   id="quantity"
                   class="form-control mt-2 ml-2 "
                   @click="change_quantity(product)"
                   v-model="local_quantity"
                   step="1"
                   min="1" max="100">
        </label>
    </td>
</template>

<script>
    import store from "../../store";

    export default {
        name: "Quantity",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                local_quantity: this.product.quantity
            }
        },
        methods: {
            change_quantity(product) {
                let local_quantity = this.local_quantity

                if (local_quantity > 100 || local_quantity < 1) {
                    this.$root.showNotification('warning', 'The quantity must be a number between 1 and 100.')
                    // set back the original number
                    this.local_quantity = parseInt(product.quantity);
                } else if (product.quantity < local_quantity) {
                    store.commit('increment_cart_items_count', local_quantity - product.quantity)
                    store.dispatch('change_product_quantity', {product, local_quantity})
                } else {
                    store.commit('decrement_cart_items_count', product.quantity - local_quantity)
                    store.dispatch('change_product_quantity', {product, local_quantity})
                }
            }
        }
    }
</script>
