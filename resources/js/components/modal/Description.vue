<template>
    <div class="modal-content">
        <div class="modal-header" style="border-bottom: 0;">
            <h5 class="modal-title" id="modal-title-default">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close()">
                <span aria-hidden="true">×</span>
            </button>
        </div>
        <div class="modal-body special-font" style="margin: 0;">
            <h5>{{ product.description }}</h5>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Description",
        props: {
            product: {
                type: Object,
                required: true,
            }
        }, methods: {
            close: function () {
                this.$emit('close');
            }
        }
    }
</script>


