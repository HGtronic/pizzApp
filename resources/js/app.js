/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Noty = require('noty');

import Vuex from 'vuex';

Vue.use(Vuex);
import store from "./store/index"


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

/**
 * Product
 */
Vue.component('products-log', require('./components/products/ProductsLog.vue').default);
Vue.component('products-in-cart', require('./components/products/ProductsInCart').default);

/**
 * Cart
 */
Vue.component('cart-log', require('./components/cart/CartLog.vue').default);

/**
 * Modal
 */
Vue.component('description-modal', require('./components/modal/Description.vue').default);

Vue.component('Modal', {
    template: '#modal-template',
    props: ['show'],
    methods: {
        close: function () {
            this.$emit('close');
        }
    },
    mounted: function () {
        document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode === 27) {
                this.close();
            }
        });
    }
});


const app = new Vue({
    el: '#app',
    store,
    computed: {
        cart_items() {
            return store.state.cart_items
        },
        cart_items_count(quantity) {
            return store.state.cart_items_count
        }
    },
    methods: {
        add_to_cart(product, quantity) {
            store.dispatch('add_to_cart', {product, quantity})
        },
        remove_from_cart(product) {
            store.dispatch('remove_from_cart', product)
            store.commit('decrement_cart_items_count', product.quantity)
            this.showNotification('success', product.title + " was  " + product.quantity + "X removed from the cart.")
        },
        showNotification(type, message) {
            new Noty({
                theme: 'bootstrap-v4',
                type: type,
                layout: 'bottomRight',
                timeout: 2000,
                text: message
            }).show();
        }
    }
});
