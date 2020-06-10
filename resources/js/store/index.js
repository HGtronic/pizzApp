window.Vue = require('vue');
import createPersistedState from "vuex-persistedstate";
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

function showNotification(type, message) {
    new Noty({
        theme: 'bootstrap-v4',
        type: type,
        layout: 'bottomRight',
        timeout: 2000,
        text: message
    }).show();
}

export default new Vuex.Store({
    plugins: [createPersistedState()],
    strict: debug,
    state: {
        cart_items_count: 0,
        cart_items: [],
    },
    mutations: {
        increment_cart_items_count(state, quantity) {
            state.cart_items_count += parseInt(quantity);
        },
        decrement_cart_items_count(state, quantity) {
            state.cart_items_count -= parseInt(quantity);
        },
        remove_from_cart(state, product) {
            state.cart_items.splice(state.cart_items.indexOf(product), 1);
        },
        add_to_cart(state, {product, quantity}) {
            let found = state.cart_items.find(prd => prd.id === product.id)

            if (found) {
                if (parseInt(found.quantity) + parseInt(quantity) <= 100) {
                    found.quantity += parseInt(quantity);
                    state.cart_items_count += parseInt(quantity);
                    showNotification('success', found.title + " was added " + quantity + "X to the shopping cart.")
                } else {
                    showNotification('alert', 'Holy guacamole! A maximum of 100 units per product exceeded!')
                }
            } else if (quantity > 100 || quantity < 1) {
                showNotification('warning', 'The quantity must be a number between 1 and 100.')
            } else {
                product.quantity = parseInt(quantity);
                state.cart_items.push(product)
                state.cart_items_count += parseInt(quantity);
                showNotification('success', product.title + " was added " + quantity + "X to the shopping cart.")
            }
        },
        change_product_quantity(state, {product, local_quantity}) {
            let found = state.cart_items.find(prd => prd.id === product.id);
            found.quantity = parseInt(local_quantity);
        },
        empty_cart(state) {
            state.cart_items = [];
            state.cart_items_count = 0;
        }
    },
    actions: {
        add_to_cart(context, product, quantity) {
            context.commit('add_to_cart', product, quantity)
        },
        remove_from_cart(context, product, quantity) {
            context.commit('remove_from_cart', product, quantity)
        },
        change_product_quantity(context, product, local_quantity) {
            context.commit('change_product_quantity', product, local_quantity)
        },
        empty_cart(context) {
            context.commit('empty_cart')
        }
    }
})
