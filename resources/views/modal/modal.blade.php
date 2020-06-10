<script type="x/template" id="modal-template">
    <transition name="modal">
        <div class="modal-mask" v-show="show">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>
                <div class="modal-body">
                    <slot name="body">
                        default body
                    </slot>
                </div>
                <div class="modal-footer text-right">
                    <slot name="footer">
                        default footer
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</script>
