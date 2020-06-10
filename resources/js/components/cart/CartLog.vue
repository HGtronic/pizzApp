<template>
    <div class="px-4 py-5 px-lg-0">
        <div class="container text-white py-5 text-center" style="width: 450px; color: white" ref="title">
            <h1 class="display-4 special-font text-bold text-capitalize sc-background">Shopping cart</h1>
        </div>
        <div class="pb-5">
            <div class="container">
                <div class="row">
                    <div v-if="!showConfirmed" class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                        <!-- Shopping cart table -->
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="p-2 px-3 text-uppercase">Product</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Price</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Quantity</div>
                                    </th>
                                    <th scope="col" class="border-0 bg-light">
                                        <div class="py-2 text-uppercase">Remove</div>
                                    </th>
                                </tr>
                                </thead>
                                <tbody v-for="(product, index) in cart_items" :key="product.id">
                                <tr>
                                    <th scope="row" class="border-0">
                                        <div class="p-2">
                                            <img
                                                :src="'../pizza/' + product.image"
                                                alt="PizzApp" width="70" class="img-fluid rounded shadow-sm">
                                            <div class="ml-3 d-inline-block align-middle">
                                                <div class="mb-0">
                                                    <p class="text-dark d-inline-block align-middle special-font">
                                                        {{ product.title }}
                                                    </p>
                                                </div>
                                                <span class="text-muted font-weight-normal font-italic d-block">
                                                    <small>{{ product.description}}</small>
                                                </span>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="border-0 align-middle">
                                        <strong>
                                            ${{ priceTotal(product.price, product.quantity)}}
                                        </strong>
                                    </td>
                                    <quantity :product="product"
                                              @update_quantity="product_quantity(product, quantity)">
                                    </quantity>
                                    <td class="border-0 align-middle">
                                        <a href="#" class="text-dark" @click.prevent="remove_from_cart(product)">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="special-font text-center py-3" v-if="cart_items.length === 0">
                                <h5 style="text-decoration: underline">Pick your favorite Pizza from the Menu to get
                                    started</h5>
                            </div>
                        </div>
                        <!-- End Shopping cart table -->
                    </div>
                </div>

                <ValidationObserver v-slot="{ invalid }">
                    <form v-if="!showConfirmed" @submit.prevent="post">
                        <div class="row py-5 p-4 bg-white rounded shadow-sm">
                            <div class="col-lg-6">
                                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                                    Your information
                                </div>
                                <div class="p-4">
                                    <ValidationProvider
                                        mode="aggressive"
                                        rules="required|max:50"
                                        v-slot="{ errors }">
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" v-model="form.first_name" placeholder="First name"
                                                   required="required"
                                                   maxlength="255"
                                                   class="form-control border-0">
                                        </div>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>

                                    <ValidationProvider
                                        mode="aggressive"
                                        rules="required|max:50"
                                        v-slot="{ errors }">
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" v-model="form.last_name" placeholder="Last name"
                                                   required="required"
                                                   maxlength="50"
                                                   class="form-control border-0">
                                        </div>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>

                                    <ValidationProvider
                                        mode="aggressive"
                                        rules="required|max:50"
                                        v-slot="{ errors }">
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" v-model="form.address" placeholder="Address"
                                                   required="required"
                                                   maxlength="50"
                                                   class="form-control border-0">
                                        </div>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>

                                    <ValidationProvider
                                        mode="aggressive"
                                        rules="required|max:50"
                                        v-slot="{ errors }">
                                        <div class="input-group mb-4 border rounded-pill p-2">
                                            <input type="text" v-model="form.city" placeholder="City"
                                                   required="required"
                                                   maxlength="50"
                                                   class="form-control border-0">
                                        </div>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                </div>
                            </div>
                            <!-- One here -->
                            <div class="col-lg-6">
                                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                                    Order summary
                                </div>
                                <div class="p-4">
                                    <p class="font-italic mb-4">
                                        Shipping and additional costs are calculated based on values you
                                        have entered.<small>Free delivery on orders over $30.</small></p>
                                    <ul class="list-unstyled mb-4">
                                        <li class="d-flex justify-content-between py-3 border-bottom">
                                            <strong class="text-muted">Order Subtotal </strong><strong>
                                            ${{ subTotal.toFixed(2) }}</strong></li>
                                        <li class="d-flex justify-content-between py-3 border-bottom">
                                            <strong class="text-muted">Delivery</strong>
                                            <strong>
                                                {{ subTotal !== 0 ? deliveryCost : '$0.00' }}
                                            </strong>
                                        </li>

                                        <li class="d-flex justify-content-between py-3 border-bottom"><strong
                                            class="text-muted">Total</strong>
                                            <h5 class="font-weight-bold"> ${{ totalCost }}</h5>
                                        </li>
                                    </ul>
                                    <button type="submit" class="btn btn-dark rounded-pill py-2 btn-block"
                                            v-if="subTotal > 0"
                                            :disabled="invalid">
                                        Proceed to checkout
                                    </button>
                                </div>
                            </div>
                            <!-- End One here -->
                        </div>
                    </form>
                </ValidationObserver>

                <table border="0" cellpadding="0" cellspacing="0" width="100%" v-if="showConfirmed">
                    <tr>
                        <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                   style="max-width:600px;">
                                <tr style="visibility: collapse;">
                                    <td align="center" valign="top"
                                        style="font-size:0; padding: 35px; background-color: #213379">
                                        <div
                                            style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                   style="max-width:300px;">
                                                <tr>
                                                    <td align="left" valign="top"
                                                        style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                        class="mobile-center">
                                                        <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                            PizzApp</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                                <div class="text-center" style="background-color:white;">
                                    <img :src="'../../photos/order-courier.gif'">
                                </div>
                                <tr>
                                    <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                        bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                               style="max-width:600px;">
                                            <tr>
                                                <td align="center"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                    <img
                                                        :src="'../../photos/order-success.png'"
                                                        width="125" height="120"
                                                        style="display: block; border: 0px;"/><br>
                                                    <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"
                                                        class="text-danger special-font">
                                                        Thank You For Your Order! </h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left"
                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                                    <p class="text-center"
                                                       style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                        We've received your order and will contact you soon.
                                                        You can find your purchase information below. </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="padding-top: 20px;">
                                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="75%" align="left" bgcolor="#eeeeee"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                                Order Confirmation #
                                                            </td>
                                                            <td width="25%" align="left" bgcolor="#eeeeee"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                                {{ Math.floor(Math.random() * 5000) + 1 }}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                                Purchased Item:
                                                                <div v-for="ord in cart_items">
                                                                    {{ ord.title }}
                                                                    - {{ ord.quantity }}X
                                                                </div>
                                                            </td>
                                                            <td width="25%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                                                                <div v-for="ord in cart_items">
                                                                    ${{ (ord.price * ord.quantity).toFixed(2) }}
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                                Delivery
                                                            </td>
                                                            <td width="25%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">
                                                                {{ subTotal >= 30 ? 'Free' : '$9.99' }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="left" style="padding-top: 20px;">
                                                    <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="75%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                TOTAL
                                                            </td>
                                                            <td width="25%" align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                {{ totalCost }}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" height="100%" valign="top" width="100%"
                                        style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                               style="max-width:660px;">
                                            <tr>
                                                <td align="center" valign="top" style="font-size:0;">
                                                    <div
                                                        style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                               width="100%" style="max-width:300px;">
                                                            <tr>
                                                                <td align="left" valign="top"
                                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                                    <p style="font-weight: 800;">Delivery Address</p>
                                                                    <p>
                                                                        {{ this.form.first_name }}
                                                                        {{ this.form.last_name }}
                                                                        <br>
                                                                        {{ this.form.address }}
                                                                        <br>
                                                                        {{ this.form.city }}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div
                                                        style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0"
                                                               width="100%" style="max-width:300px;">
                                                            <tr>
                                                                <td align="left" valign="top"
                                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import Quantity from "./Quantity";

    import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
    import {max, required, email, numeric} from 'vee-validate/dist/rules';

    extend('required', {...required, message: 'This field is required.'});
    extend('max', {...max, message: "This field may not be greater than 255 characters."});

    export default {
        name: "CartLog",
        components: {
            Quantity,
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                showConfirmed: false,
                delivery_cost: 9.99,
                order_cost: "",
                order: [],
                form: {
                    first_name: "",
                    last_name: "",
                    address: "",
                    city: "",
                    note: "",
                }
            }
        },
        methods: {
            remove_from_cart(product) {
                this.$root.remove_from_cart(product);
            },
            priceTotal(price, quantity) {
                return (price * quantity).toFixed(2);
            },
            product_quantity(product, quantity) {
                let found = state.cart_items.find(prd => prd.id === product.id);
                found.quantity = quantity;
            },
            post() {
                this.$refs.title.innerText = ''
                this.showConfirmed = true
                this.$root.showNotification('success', 'Order successfully completed.')

                setTimeout(() => {
                    this.$store.dispatch('empty_cart')
                    this.showConfirmed = false
                }, 10000);
            },
        },
        computed: {
            subTotal() {
                let subTotal = 0;
                let price = []
                for (let product of this.cart_items) {
                    subTotal = (product.price * product.quantity);
                    price.push(subTotal);
                }
                return _.sum(price)
            },
            deliveryCost() {
                return this.subTotal >= 30 ? 'Free' : '$' + this.delivery_cost
            },
            totalCost() {
                if (this.deliveryCost !== 'Free' && this.subTotal !== 0) {
                    return (this.subTotal + this.delivery_cost).toFixed(2)
                } else if (parseInt(this.subTotal) !== 0) {
                    return (this.subTotal).toFixed(2)
                } else {
                    return '0.00'
                }
            },
            ...mapState({
                cart_items: state => state.cart_items,
            })
        }
    }
</script>

