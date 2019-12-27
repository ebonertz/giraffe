<template>
  <div v-if="products">
    <p>Total products: {{ products.total }}</p>
    <div v-for="product in products.results"
         :key="product.id">
      <AddToCart :product-id="product.id"/>
      {{ product.masterData.current.name }}
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  import AddToCart from './AddToCart';
  import productsQuery from '../constants/products.graphql';

  export default {
    components: {AddToCart},
    apollo: {
      products: {
        query: gql`
        {
          products(limit: 10) {
            total
            results {
              id
              masterData {
                current {
                  name(locale: "en")
                  description(locale:"en")
                }
              }
            }
          }
        }`,
      },
    },
  }
</script>
