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
              <!-- <div class="uk-margin" v-for="(item, key) in salary" :key="key">
                <label class="uk-form-label uk-text-right@m" v-text="`${toStartCase(key)} Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="salary[key]" 
                    @input="onSalaryInput(key)"
                    @blur="updateContributions"
                  ></vue-numeric>
                </div>
              </div> -->
              <!-- ./Salaries -->

              <!-- Monthly Salary (For Precise calculator) -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m" v-text="`Monthly Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="salary.monthly" 
                    @input="onSalaryInput('monthly')"
                    @blur="updateContributions"
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Monthly Salary -->
          
              <contributions />

            </div>
          </div>
          <!-- ./Grid -->

          <!-- Grid -->
          <div class="uk-child-width-1-2@m" uk-grid>
            <div class="uk-text-center@m">
              <h5>Working Weekdays</h5>  
              <ul class="uk-list uk-list-divider">
                <li v-for="(item, key) in workingWeekdays" :key="key">
                  <label>
                    <input type="checkbox" class="uk-checkbox" v-model="item.value" />
                    {{ item.label }}
                  </label>
                </li>
              </ul>
            </div>

            <div>
              <div class="uk-text-center@m">
                <h5>Total Working Days: <b>{{ workingDays }}</b></h5>  
                <v-calendar 
                  :attributes="attrs"
                  @dayclick="dayClicked"
                  :from-page.sync="currentCalendar" 
                ></v-calendar>
              </div>
            </div>
          </div>
          <!-- ./Grid -->

          <div class="uk-text-center@m">
            <div class="uk-margin uk-tile uk-tile-muted">
              {{ currentCalendar.monthLabel }} 16 - {{ this.lastDayOfCurrentMonth }}
              <br/> Working Days: {{ this.cutOffs.second.workingDays }}
              <ul class="uk-list">
                <li v-for="(item, key) in filteredContributions" :key="key">
                  {{ key.toUpperCase() }}: {{ ( item.value * (item.percent / 100) ).toFixed(2) }}
                </li>
              </ul>
            </div>
          </div>

          <div class="uk-text-center@m">
            <div class="uk-margin uk-tile uk-tile-muted">
              {{ currentCalendar.monthLabel }} 01 - 15
              <br/> Working Days: {{ this.cutOffs.first.workingDays }}
              <ul class="uk-list">
                <li v-for="(item, key) in filteredContributions" :key="key">
                  {{ key.toUpperCase() }}: {{ ( item.value * ((100 - item.percent) / 100) ).toFixed(2) }}
                </li>
              </ul>
            </div>
          </div>

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

      <result id="result" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertPeriodically, toStartCase } from '@/utils/common'
import taxCalculator2018 from '@/utils/2018-to-2022-tax-calculator'
import taxCalculator2023 from '@/utils/2023-tax-calculator'
import contributionCalculator from '@/utils/contributions'
import Contributions from '@/components/Contributions'
import Result from '@/components/Result'
import moment from 'moment-business-days'

export default {
  components: {
    Contributions,
    Result,
  },

  data () {
    return {
      currentCalendar: {
        month: parseInt(moment().format('M')),
        year: parseInt(moment().format('YYYY')),
        monthLabel: moment().format('MMMM'),
      },
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
      attrs: [
        {
          highlight: {
            backgroundColor: '#ff8080', // red
          },
          dates: [],
        }
      ],
      workingDays: 0,
      workingWeekdays: [
        { key: 1, label: 'Monday', value: true },
        { key: 2, label: 'Tuesday', value: true },
        { key: 3, label: 'Wednesday', value: true },
        { key: 4, label: 'Thrusday', value: true },
        { key: 5, label: 'Friday', value: true },
        { key: 6, label: 'Saturday', value: false },
        { key: 0, label: 'Sunday', value: false },
      ],
      cutOffs: {
        first: {
          salary: 0,
          workingDays: 0,
        },
        second: {
          salary: 0,
          workingDays: 0,
        },
      },
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek', 'type', 'types', 'totalContribution', 'contributions']),

    filteredContributions () {
      let contributions = Object.assign({}, this.contributions)
      
      if (this.type == this.types[1])
          delete contributions['sss']
      else
        delete contributions['gsis']

      return contributions
    },

    employeeType: {
      get () {
        return this.type
      },
      set (val) {
        this.$store.dispatch('updateType', val)
        this.updateContributions()
      }
    },

    holidays () {
      return this.attrs[0].dates.map(m => moment(m).format('YYYY-MM-DD') )
    },

    lastDayOfCurrentMonth () {
      return moment(`${this.currentCalendar.year}-${this.currentCalendar.month}-01`, 'YYYY-M-DD').endOf('month').format('DD')
    },
  },

  watch: {
    // Recalculate Salaries when `workingDays` changes
    workingDaysPerWeek () {
      this.onSalaryInput('monthly')
    },

    holidays () {
      this.configureMomentBusiness()
    },

    workingWeekdays: {
      handler () {
        this.configureMomentBusiness()
      },
      deep: true,
    },

    currentCalendar () {
      this.computeWorkingDays()
    }
  },

  methods: {
    configureMomentBusiness () {
      const currentLocal = moment.locale()
      moment.updateLocale(currentLocal, {
        holidays: this.holidays,
        holidayFormat: 'YYYY-MM-DD',
        workingWeekdays: this.mapWorkingWeekdays(),
      });

      this.computeWorkingDays()
    },

    onSalaryInput (salaryPeriod) {
      this.salary = convertPeriodically(salaryPeriod, { [salaryPeriod]: this.salary[salaryPeriod] })
    },

    updateContributions () {
      if (!!this.salary.monthly) {
        const monthlySalary = this.salary.monthly,
              contributions = contributionCalculator(monthlySalary)

        this.$store.dispatch('updateContributions', contributions)
        this.$store.dispatch('updateTotalContribution', contributions)
      }
    },

    toStartCase (str) {
      return toStartCase(str)
    },

    calculate () {
      if (!this.salary.monthly) return false

      const { monthly } = this.salary
      taxCalculator2018(monthly)
      taxCalculator2023(monthly)

      document.querySelector('#result')
        .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    },

    dayClicked (date) {
      const dayClicked = new Date(date.year, date.month - 1, date.day),
            currentHighlights = this.attrs[0].dates

      /**
       * Check if `dayClicked` already exists in `currentHighlights`
       * 
       * https://stackoverflow.com/questions/27450867/how-to-correctly-use-javascript-indexof-in-a-date-array
       */
      const validateDay = currentHighlights.map(Number).indexOf(+dayClicked)

      // Add the `dayClicked` in `currentHighlights`
      if (validateDay === -1)
        currentHighlights.push(dayClicked)

      // Remove the selected day in `currentHighlights`
      else
        currentHighlights.splice(validateDay, 1)
    },

    computeWorkingDays () {
      this.workingDays = moment(`${this.currentCalendar.year}-${this.currentCalendar.month}-01`, 'YYYY-M-DD').monthBusinessDays().length
      this.computeCutOffWorkingDays()
    },

    mapWorkingWeekdays () {
      return this.workingWeekdays
        .filter(m => m.value === true)
        .map(m => m.key)
    },

    computeCutOffWorkingDays () {
      // compute the working days between 01-15 of a month
      const firstCutoff = moment(`${this.currentCalendar.year}-${this.currentCalendar.month}-01`, 'YYYY-M-DD')
        .businessDiff(moment(`${this.currentCalendar.year}-${this.currentCalendar.month}-16-${this.currentCalendar.year}`,'YYYY-M-DD'))
  
      let businessDiffDate = (this.currentCalendar.month !== 12)
        ? `${this.currentCalendar.year}-${this.currentCalendar.month + 1}-01`
        : `${this.currentCalendar.year + 1}-01-01`
        
      // compute the working days between 16 until the end of a month
      const secondCutOff = moment(`${this.currentCalendar.year}-${this.currentCalendar.month}-16`, 'YYYY-M-DD')
        .businessDiff(moment(businessDiffDate,'YYYY-M-DD'))

      this.cutOffs.first.workingDays = firstCutoff
      this.cutOffs.second.workingDays = secondCutOff
    },
  },

  mounted () {
    this.configureMomentBusiness()
  },
}
</script>