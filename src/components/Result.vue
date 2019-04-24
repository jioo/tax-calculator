<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body" v-show="isSimpleCalculator">
      <div class="uk-flex-around uk-child-width-1-3@m" uk-grid>

        <div>
          <h4 class="uk-text-center@s">2018-2022 Tax Result</h4>

          <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2018.monthly" :key="key">
            <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
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

          <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2023.monthly" :key="key">
            <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
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

    <div class="uk-card uk-card-default uk-card-body" v-if="!isSimpleCalculator">
      <div class="uk-flex-around uk-child-width-1-1@m" uk-grid>
        <div>
          <h4 class="uk-text-center@s">2018-2022 Tax Result</h4>
          <div class="uk-child-width-1-2@m" uk-grid>
            <div>
              <h5 class="uk-text-center@s">1st Cutoff</h5>
              <hr>

              <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2018.semiMonthly[0]" :key="key">
                <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
                <vue-numeric 
                  :currency="config.currency" 
                  :precision="config.precision" 
                  :value="item" 
                  read-only
                ></vue-numeric>
              </div>
            </div>
            
            <div>
              <h5 class="uk-text-center@s">2nd Cutoff</h5>
              <hr>

              <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2018.semiMonthly[1]" :key="key">
                <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
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
        
        <div>
          <h4 class="uk-text-center@s">2023 Tax Result</h4>
          <div class="uk-child-width-1-2@m" uk-grid>
            <div>
              <h5 class="uk-text-center@s">1st Cutoff</h5>
              <hr>

              <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2023.semiMonthly[0]" :key="key">
                <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
                <vue-numeric 
                  :currency="config.currency" 
                  :precision="config.precision" 
                  :value="item" 
                  read-only
                ></vue-numeric>
              </div>
            </div>
            
            <div>
              <h5 class="uk-text-center@s">2nd Cutoff</h5>
              <hr>

              <div class="uk-grid-small uk-text-small" uk-grid v-for="(item, key) in resultIn2023.semiMonthly[1]" :key="key">
                <div class="uk-width-expand" uk-leader v-text="toStartCase(key)"></div>
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
  
  computed: {
    ...mapGetters(['resultIn2018', 'resultIn2023', 'isSimpleCalculator']),
  },

  methods: {
    toStartCase (str) {
      return toStartCase(str)
    },

    resetResults () {
      this.$store.dispatch('resetResults')
    }
  },

  // Resets value when changing app settings
  watch: {
    isSimpleCalculator () {
      this.resetResults()
    }
  },
}
</script>