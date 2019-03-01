<template>
  <div class="uk-card uk-card-default uk-card-body uk-margin-medium">
    <div class="uk-flex-around uk-child-width-1-3@m" uk-grid>

      <div>
        <h4 class="uk-text-center@s">2018-2022 Tax Result</h4>

        <div class="uk-grid-small" uk-grid v-for="(item, key) in resultIn2018" :key="key">
          <div class="uk-width-expand@s" uk-leader="media: @s" v-text="toStartCase(key)"></div>
          <vue-numeric 
            :currency="config.currency" 
            :precision="config.precision" 
            :value="item" 
            read-only
          ></vue-numeric>
        </div>
      </div>

      <div>
        <h4 class="uk-text-center@s">2023 Tax Result</h4>

        <div class="uk-grid-small" uk-grid v-for="(item, key) in resultIn2023" :key="key">
          <div class="uk-width-expand@s" uk-leader="media: @s" v-text="toStartCase(key)"></div>
          <vue-numeric 
            :currency="config.currency" 
            :precision="config.precision" 
            :value="item" 
            read-only
          ></vue-numeric>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { toStartCase } from '@/utils/common'

export default {
  data () {
    return {
      config: {
        currency: '₱',
        precision: 2,
      },
    }
  },

  methods: {
    toStartCase (str) {
      return toStartCase(str)
    },
  },

  computed: {
    ...mapGetters(['resultIn2018', 'resultIn2023']),
  }
}
</script>