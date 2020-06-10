<template>
    <div class="card m-2 d-inline-block special-font" style="width: 18rem;">
        <img class="card-img-top" :src="'../pizza/' + product.image" alt="Product Image">
        <div class="card-body ">
            <h6 class="card-title bold py-1" style="font-variant: petite-caps">{{ product.title }}
                <span class="text-danger text-bold"> &#8364;{{ product.price }}</span>
                <span class="badge badge-pill badge-warning">{{ product.promo }}</span>
            </h6>
            <modal :show="showModal" @close="showModal = false">
                <div slot="content" class="modal-dialog modal- modal-dialog-centered modal-">
                    <description-modal @close="showModal = false" :product="product">
                    </description-modal>
                </div>
            </modal>
            <button class="btn btn-default pm-3" @click="showModal = true">
                <i class="fas fa-info text-info" title="Description"></i>
            </button>
            <label>
                <input type="number"
                       v-model="quantity"
                       step="1"
                       class="amount ml-3"
                       min="1"
                       max="100">
            </label>
            <button class="btn btn-primary float-right" @click="add_to_cart(product)">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Product",
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                quantity: 1,
                showModal: false,
            }
        },
        methods: {
            add_to_cart(product) {
                if (this.quantity > 100 || this.quantity < 1) {
                    this.$root.showNotification('alert', 'The quantity must be a number between 1 and 100')
                } else {
                    this.$root.add_to_cart(product, this.quantity);
                }
            }
        }
    }
</script>

<style scoped>
    .amount {
        width: 65px;
    }
</style>
