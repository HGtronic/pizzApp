<template>
    <div class="py-5 mt-4">
        <h2 class="special-font motto-background">fast. fresh. delicious.</h2>
        <product v-for="(product, index) in products"
                 :key="product.id"
                 :product="product">
        </product>
        <!--        <infinite-loading-->
        <!--            @infinite="infiniteHandler"-->
        <!--            class="mt-5 text-center"-->
        <!--            ref="infiniteLoading"-->
        <!--            spinner="waveDots">-->
        <!--            <div slot="no-more" class="special-font sc-background text-center">-->
        <!--                <i class="fas fa-pizza-slice text-danger "/>-->
        <!--                <p>My favorites on PizzApp</p>-->
        <!--            </div>-->
        <!--            <div slot="no-results">-->
        <!--                <h2 class="text-center special-font ">No results...</h2>-->
        <!--            </div>-->
        <!--        </infinite-loading>-->
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
                products: [{
                    "id": "1",
                    "price": "19.00",
                    "title": "Romano Margherita (V)",
                    "description": "Mozzarella & Oregano",
                    "image": "Romano Margherita (V).jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "2",
                    "price": "11.95",
                    "title": "BBQ Chicken",
                    "description": "Mozzarella, Chicken Ham, Fresh Green Peppers & BBQ Sauce",
                    "image": "BBQ Chicken.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "3",
                    "price": "11.95",
                    "title": "Smoky Beef Sausage",
                    "description": "Mozzarella, Spicy Sausage and Fresh Onions",
                    "image": "Smoky Beef Sausage.jpg",
                    "promo": "Top",
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "4",
                    "price": "10.95",
                    "title": "Creamy Veggie (V)",
                    "description": "Green Peppers, Corn, Onions, Black Olives, Cr\u00e8me Fra\u00eeche, Mozzarella",
                    "image": "Creamy Veggie (V).jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "5",
                    "price": "13.95",
                    "title": "Fiery Zanana (V)",
                    "description": "Fresh Pineapple, Diced Sweet Piquant\u00e9 Pepper, Chilli Flakes, Domino's Sauce, Mozzarella",
                    "image": "Fiery Zanana (V).jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "6",
                    "price": "11.95",
                    "title": "Campania (V)",
                    "description": "Mozzarella, Fresh Green Peppers, Mushrooms, Corn, Fresh Tomatoes & Black Olives",
                    "image": "Campania (V).jpg",
                    "promo": "-10%",
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "7",
                    "price": "9.95",
                    "title": "Paprika Chicken",
                    "description": "Mozzarella, Spicy grilled chicken, Red Paprika, Fresh green chilli",
                    "image": "Paprika Chicken.jpg",
                    "promo": "Hot",
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "8",
                    "price": "11.95",
                    "title": "Chicken Hawaiian",
                    "description": "Mozzarella, Chicken Strips, Red Paprika, & Fresh Pineapples",
                    "image": "Chicken Hawaiian.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "9",
                    "price": "8.95",
                    "title": "Pepperoni & Mushroom",
                    "description": "Mozzarella, Beef Pepperoni & Mushrooms",
                    "image": "Pepperoni & Mushroom.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "10",
                    "price": "11.90",
                    "title": "Chicken Kebab",
                    "description": "Chicken Kebab, Green Peppers, Onions, Ranch Sauce, Domino's Sauce, Mozzarella",
                    "image": "Chicken Kebab.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "11",
                    "price": "10.99",
                    "title": "Chicken Foresti\u00e8re",
                    "description": "Cr\u00e8me Fraiche, Mozzarella, Smoked Chicken Strips & Mushrooms",
                    "image": "Chicken Foresti\u00e8re.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "12",
                    "price": "14.95",
                    "title": "Chicken Extravaganza",
                    "description": "Mozzarella, Smoked & Grilled Chicken Strips, Chicken Ham, Green Peppers & Mushrooms",
                    "image": "Chicken Extravaganza.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "13",
                    "price": "8.99",
                    "title": "Meat Extravaganza",
                    "description": "Mozzarella, Beef Pepperoni, Smoky Beef Sausage, Fresh Onions, Green Peppers & Mushrooms",
                    "image": "Meat Extravaganza.jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }, {
                    "id": "14",
                    "price": "9.99",
                    "title": "Quattro Formaggio (V)",
                    "description": "Cheddar, Feta, Goat Cheese, Italian Seasonings, Domino's Sauce, Mozzarella",
                    "image": "Quattro Formaggio (V).jpg",
                    "promo": null,
                    "created_at": "2020-06-08 21:06:50",
                    "updated_at": "2020-06-08 21:07:01",
                    "deleted_at": null
                }]
            };
        },
        methods: {
            // infiniteHandler($state) {
            //     axios.get("/get-products", {
            //         params: {
            //             page: this.page,
            //         },
            //     }).then(({data}) => {
            //         this.total = data.products.total;
            //         if (data.products.data.length) {
            //             this.page += 1;
            //           //  this.products = this.products.concat(data.products.data);
            //             $state.loaded();
            //         } else {
            //             $state.complete();
            //         }
            //     });
            // },
        },
        mounted() {
            //    this.infiniteHandler();
        }
    }
</script>
