<template>
  <div id="app">
    <Cart class="cart"/>
    <Products class="products"/>
  </div>
</template>

<script>
import Products from './components/Products.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'app',
  components: {
    Products,
    Cart,
  }
}
</script>
<link rel="stylesheet" type="text/css" href="src/assets/styles.css">

  apollo: {
    products: {
      query:gql`
      {
        products {
          total
          results {
            masterData {
              current {
                name(locale: "en")
              }
            }
          }
        }
      }`
    }
  }
}
</script>
