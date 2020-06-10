<template>
    <div class="py-sm-2 mt-4">
        <h2 class="special-font">fast. fresh. delicious.</h2>
        <product v-for="(product, index) in products"
                 :key="product.id"
                 :product="product">
        </product>
        <infinite-loading
            @infinite="infiniteHandler"
            class="mt-5 text-center"
            ref="infiniteLoading"
            spinner="waveDots">
            <div slot="no-more" class="text-primary special-font">
                <i class="fas fa-pizza-slice text-danger "/>
                <p>My favorites on PizzApp</p>
            </div>
            <div slot="no-results">
                <h2 class="text-center special-font">No results...</h2>
            </div>
        </infinite-loading>
    </div>
</template>

<script>
    import Product from "./Product";
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        name: "ProductsLog",
        components: {
            Product,
            InfiniteLoading,
        },
        data() {
            return {
                page: 1,
                products: []
            };
        },
        methods: {
            infiniteHandler($state) {
                axios.get("/get-products", {
                    params: {
                        page: this.page,
                    },
                }).then(({data}) => {
                    this.total = data.products.total;
                    if (data.products.data.length) {
                        this.page += 1;
                        this.products = this.products.concat(data.products.data);
                        $state.loaded();
                    } else {
                        $state.complete();
                    }
                });
            },
        },
        mounted() {
            this.infiniteHandler();
        }
    }
</script>
