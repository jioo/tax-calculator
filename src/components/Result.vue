<template>
  <div>
    <div class="uk-card uk-card-default uk-card-body" v-show="isTax">
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

        <div class="uk-width-1-1"></div>
        <div class="uk-width-auto uk-align-center uk-background-primary uk-padding uk-light uk-text-center">
          <h4 class="uk-margin-remove">
            <vue-numeric 
              :currency="config.currency" 
              :precision="config.precision" 
              :value="taxDifference2018" 
              read-only
            ></vue-numeric>
          </h4>
          <h5 class="uk-margin-remove">Tax Difference</h5>
        </div>

      </div>
    </div>

    <div class="uk-card uk-card-default uk-card-body" v-if="isPayroll">
      <div class="uk-flex-around uk-child-width-1-1@m uk-visible@m" uk-grid>
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

      <div class="uk-flex-around uk-child-width-1-1@m uk-hidden@m" uk-grid>
        <div>
          <h4 class="uk-text-center@s">
            <select class="uk-select uk-width-auto" v-model="showPayrollResult">
              <option value="2018">2018-2022 Tax Result</option>
              <option value="2023">2023 Tax Result</option>
            </select>
          </h4>
        </div>

        <div class="uk-animation-fade-fast" v-if="showPayrollResult === '2018'">
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

        <div v-if="showPayrollResult === '2023'"> 
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
      showPayrollResult: '2018',
      config: {
        currency: '₱',
        precision: 2,
      },
    }
  },
  
  computed: {
    ...mapGetters(['resultIn2018', 'resultIn2023', 'calculator', 'isPayroll', 'isTax']),

    taxDifference2018 () {
      const tax2018 = this.resultIn2018.monthly.withholdingTax
      const tax2023 = this.resultIn2023.monthly.withholdingTax

      return tax2018 - tax2023
    }
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
    calculator () {
      this.resetResults()
    }
  },
}
</script>

<style scoped>
  .adjust-dropdown {
    margin: 0 0 8px 20px !important;
  }
</style>