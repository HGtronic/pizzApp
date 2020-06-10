<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Order;
use App\Product;


class HomeController extends Controller
{
    public function index()
    {
        return view('home');
    }

    public function get_products()
    {
        return response()->json(['products' => Product::paginate(8)], 200);
    }

    public function post_order(OrderRequest $request)
    {
        $complete_order = [];
        $products_cost = [];

        foreach ($request->products as $product) {
            $order = new Order();
            $order->product_id = $product['id'];
            $order->product_name = $product['title'];
            $order->quantity = $product['quantity'];
            $order->total = $product['price'] * $product['quantity'];
            $order->first_name = $request->detail['first_name'];
            $order->last_name = $request->detail['last_name'];
            $order->address = $request->detail['address'];
            $order->city = $request->detail['city'];
            $order->save();

            array_push($complete_order, $order);
            array_push($products_cost, ($product['price'] * $product['quantity']));
        }
        return response()->json(['order' => $complete_order, 'order_cost' => array_sum($products_cost)], 200);
    }
}
