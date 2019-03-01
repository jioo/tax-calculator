<template>
  <div class="uk-section uk-section-default">
    <div class="uk-container">
      
      <!-- Card -->
      <div class="uk-card uk-card-default uk-card-body ">
        <div class="uk-flex-center uk-child-width-1-2@m" uk-grid>
          
          <!-- Grid -->
          <div class="uk-width-1-1">
            <div class="uk-margin-large">
              <h3 class="uk-text-center@m" v-text="`${new Date().getFullYear()} Philippines Tax Calculator`"></h3>
            </div>
          </div>
          <!-- ./Grid -->
          
          <!-- Grid -->
          <div>
            <div class="uk-form-horizontal">
              
              <!-- Employee Types -->
              <div class="uk-margin-medium">
                <div class="uk-flex-center@m" uk-grid>
                  <div v-for="(item, key) in types" :key="key">
                    <label>
                      <input 
                        type="radio" 
                        class="uk-radio" 
                        v-model="employeeType" 
                        :value="item"
                      /> 
                      <span v-text="` ${item}`"></span>
                    </label>
                  </div>
                </div>
              </div>
              <!-- ./Employee Types -->
              
              <!-- Salaries -->
              <div class="uk-margin" v-for="(item, key) in salary" :key="key">
                <label class="uk-form-label uk-text-right@m" v-text="`${toStartCase(key)} Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="salary[key]" 
                    @input="onSalaryInput(key)"
                    @blur="onSalaryBlur"
                  ></vue-numeric>
                </div>
              </div>
                <!-- ./Salaries -->

            </div>
          </div>
          <!-- ./Grid -->
          
          <contributions />

          <!-- Grid -->
          <div class="uk-width-1-1">
            <div class="uk-flex-center" uk-grid>
              <!-- Calculate Button -->
              <div class="uk-width-1-2@m">
                <button class="uk-button uk-button-primary uk-width-1-1" @click.prevent="calculate">Calculate</button>
              </div>
              <!-- ./Calculate Button -->
            </div>
          </div>
          <!-- ./Grid -->

        </div>
      </div>
      <!-- ./Card -->

      <result />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertPeriodically, toStartCase } from '@/utils/common'
import taxCalculator from '@/utils/2018-to-2022-tax-calculator'
import contributionCalculator from '@/utils/contributions'
import Contributions from '@/components/Contributions'
import Result from '@/components/Result'

export default {
  components: {
    Contributions,
    Result,
  },

  data () {
    return {
      config: {
        currency: '₱',
        precision: 2,
      },
      salary: {
        annual: 0,
        monthly: 0,
        semiMonthly: 0,
        weekly: 0,
        daily: 0,
      },
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek', 'type', 'types', 'hasContribution', 'contributions']),

    employeeType: {
      get () {
        return this.type
      },
      set (val) {
        this.$store.dispatch('updateType', val)
      }
    },
  },

  watch: {
    // Recalculate Salaries when `workingDays` changes
    workingDaysPerWeek () {
      this.onSalaryInput('monthly')
    }
  },

  methods: {
    onSalaryInput (salaryPeriod) {
      this.salary = convertPeriodically(salaryPeriod, { [salaryPeriod]: this.salary[salaryPeriod] })
    },

    onSalaryBlur () {
      if (!!this.salary.monthly) {
        const monthlySalary = this.salary.monthly,
              contributions = contributionCalculator(monthlySalary)

        this.$store.dispatch('updateContributions', contributions)
        this.$store.dispatch('updateTotalContributions', contributions)
      }
    },

    toStartCase (str) {
      return toStartCase(str)
    },

    calculate () {
      if (!this.salary.monthly) return false
      
      console.log(taxCalculator(this.salary.monthly))
    },
  },
};
</script>

<style lang="scss">
.header-style {
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  overflow-y: hidden;
}
</style>