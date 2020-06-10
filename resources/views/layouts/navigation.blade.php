<nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
    <div class="container">
        <a class="navbar-brand  special-font" href="{{ url('/') }}">
            <i class="fas fa-pizza-slice text-danger"></i> {{ config('app.name', 'PizzApp') }}
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <!-- Left Side Of Navbar -->
            <ul class="navbar-nav mr-auto"></ul>

            <!-- Right Side Of Navbar -->
            <ul class="navbar-nav ml-auto">
                <a class="nav-link special-font" href="{{ url('/') }}">{{ __('Menu') }}
                </a>
                <a class="nav-link special-font" href="{{ route('cart_index') }}">{{ __('Cart') }}
                    <products-in-cart></products-in-cart>
                </a>
            </ul>
        </div>
    </div>
</nav>
