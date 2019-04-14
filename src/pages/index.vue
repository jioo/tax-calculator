<template>
  <div class="uk-section uk-section-default">
    <div class="uk-container">
      
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
            <div class="uk-card uk-card-body uk-card-default uk-margin-medium">
            
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

              <!-- Monthly Salary -->
              <div class="uk-margin" v-show="!isSimpleCalculator">
                <label class="uk-form-label uk-text-right@m" v-text="`Monthly Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="salary.monthly" 
                    @input="onSalaryInput('monthly')"
                    @blur="updateContributions"
                    @keyup.enter.native="onInputEnter"
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Monthly Salary -->

              <!-- Salaries -->
              <div class="uk-margin" v-for="(item, key) in salary" :key="key" v-show="isSimpleCalculator">
                <label class="uk-form-label uk-text-right@m" v-text="`${toStartCase(key)} Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="salary[key]" 
                    @input="onSalaryInput(key)"
                    @blur="updateContributions"
                    @keyup.enter.native="onInputEnter"
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Salaries -->
            </div>

            <!-- Contributions -->
            <div class="uk-card uk-card-default uk-card-body" v-show="!isSimpleCalculator">
              <contributions />
            </div>
            <!-- ./Contributions -->

          </div>
        </div>
        <!-- ./Grid -->

        <!-- Grid -->
        <div class="uk-align-center uk-text-center" uk-grid>

          <!-- Contributions (Simple Calculator) -->
          <div class="uk-card uk-card-default uk-card-body uk-text-left" v-show="isSimpleCalculator">
            <contributions />
          </div>
          <!-- ./Contributions (Simple Calculator) -->

          <!-- Working Days -->
          <div class="uk-card uk-card-default uk-card-body" v-show="!isSimpleCalculator">
            <h5 class="uk-text-center@m">Working Weekdays</h5>  

            <div class="uk-column-1-2">
              <div v-for="(item, key) in workingWeekdays" :key="key" class="uk-margin">
                <label>
                  <input type="checkbox" class="uk-checkbox" v-model="item.value" />
                  {{ item.label }}
                </label>
              </div>
            </div>
          </div>
          <!-- ./Working Days -->

          <!-- Calendar -->
          <div class="uk-card uk-card-default uk-card-body" v-show="!isSimpleCalculator">
            <div class="uk-text-center@m">
              <h5>Total Working Days: <b>{{ workingDays }}</b></h5> 
              <div class="uk-alert-primary" uk-alert>
                <p>Toggle holidays by clicking any day in the calendar.</p>
              </div>

              <v-calendar 
                :attributes="attrs"
                @dayclick="dayClicked"
                :from-page.sync="currentCalendar" 
              ></v-calendar>
            </div>
          </div>
          <!-- ./Calendar -->

        </div>
        <!-- ./Grid -->

        <!-- 1st Cutoff -->
        <div class="uk-text-center@m" v-show="!isSimpleCalculator">
          <div class="uk-margin uk-tile uk-tile-muted">
            <h5 class="uk-text-center@s">1st Cutoff</h5>
            <hr>

            {{ currentCalendar.monthLabel }} 01 - 15 
            <br/> Working Days: {{ this.cutOffs[0].workingDays }}
            <ul class="uk-list">
              <li v-for="(item, key) in filteredContributions" :key="key">
                <strong>{{ key.toUpperCase() }}</strong> {{  `(${item.percent}%)` }}: 
                {{ ( item.value * (item.percent / 100) ).toFixed(2) }}
              </li>
            </ul>

            <hr>

            <div class="uk-form-horizontal">
              
              <!-- Other Income -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m">Other Income</label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input uk-text-success" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="cutOffs[0].otherIncome"
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Other Income -->

              <!-- Other Deduction -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m ">Other Deduction</label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input uk-text-danger" 
                    :currency="config.currency" 
                    :precision="config.precision"
                    v-model="cutOffs[0].otherDeduction" 
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Other Deduction -->

              <!-- No. Absent (Days) -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m">No. of Absent (Days)</label>
                <div class="uk-form-controls uk-text-left">
                  <input 
                    type="text"
                    name="absent1"
                    :data-vv-as="'No. Absent'"
                    :class="['uk-input uk-text-danger', { 'uk-form-danger': errors.has('absent1') }]"
                    v-validate="`numeric|min_value:0|max_value:${this.cutOffs[0].workingDays}`" 
                    v-model="cutOffs[0].absent"
                    @blur="computeDeduction(0, 'absentDeduction', 'absent1')" 
                  />
                  <span class="uk-text-danger" v-if="errors.has('absent1')">{{ errors.first('absent1') }}</span>
                  <div>
                    Deduction: 
                    <span class="uk-text-danger">
                      <vue-numeric 
                        :currency="config.currency" 
                        :precision="config.precision" 
                        :value="cutOffs[0].absentDeduction" 
                        read-only
                      ></vue-numeric>
                    </span>
                  </div>
                </div>
              </div>
              <!-- ./No. Absent (Days) -->

              <!-- No. Hours Late -->
              <div>
                <label class="uk-form-label uk-text-right@m">Tardiness (Minutes)</label>
                <div class="uk-form-controls uk-text-left">
                  <input 
                    type="text"
                    name="late1"
                    :data-vv-as="'Tardiness'"
                    :data-vv-message="{ max_value: 'Test message' }"
                    :class="['uk-input uk-text-danger', { 'uk-form-danger': errors.has('late1') }]"
                    v-validate="`numeric|min_value:0|max_value:${this.cutOffs[0].workingDays * 24}`" 
                    v-model="cutOffs[0].late" 
                    @blur="computeDeduction(0, 'lateDeduction', 'late1')"
                  />
                  <span class="uk-text-danger" v-if="errors.has('late1')">{{ errors.first('late1') }}</span>
                  <div>
                    Deduction: 
                    <span class="uk-text-danger">
                      <vue-numeric 
                        :currency="config.currency" 
                        :precision="config.precision" 
                        :value="cutOffs[0].lateDeduction" 
                        read-only
                      ></vue-numeric>
                    </span>
                  </div>
                </div>
              </div>  
              <!-- ./No. Hours Late -->

            </div>

          </div>
        </div>
        <!-- ./1st Cutoff -->

        <!-- 2nd Cutoff -->
        <div class="uk-text-center@m" v-show="!isSimpleCalculator">
          <div class="uk-margin uk-tile uk-tile-muted">
            <h5 class="uk-text-center@s">2nd Cutoff</h5>
            <hr>

            {{ currentCalendar.monthLabel }} 16 - {{ this.lastDayOfCurrentMonth }}
            <br/> Working Days: {{ this.cutOffs[1].workingDays }}
            <ul class="uk-list">
              <li v-for="(item, key) in filteredContributions" :key="key">
                <strong>{{ key.toUpperCase() }}</strong> {{  `(${100 - item.percent}%)` }}: 
                {{ ( item.value * ((100 - item.percent) / 100) ).toFixed(2) }}
              </li>
            </ul>

            <hr>

            <div class="uk-form-horizontal">
              
              <!-- Other Income -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m">Other Income</label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input uk-text-success" 
                    :currency="config.currency" 
                    :precision="config.precision" 
                    v-model="cutOffs[1].otherIncome"
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Other Income -->

              <!-- Other Deduction -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m ">Other Deduction</label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input uk-text-danger" 
                    :currency="config.currency" 
                    :precision="config.precision"
                    v-model="cutOffs[1].otherDeduction" 
                  ></vue-numeric>
                </div>
              </div>
              <!-- ./Other Deduction -->

              <!-- No. Absent (Days) -->
              <div class="uk-margin">
                <label class="uk-form-label uk-text-right@m">No. of Absent (Days)</label>
                <div class="uk-form-controls uk-text-left">
                  <input 
                    type="text"
                    name="absent2"
                    :data-vv-as="'No. Absent'"
                    :class="['uk-input uk-text-danger', { 'uk-form-danger': errors.has('absent2') }]"
                    v-validate="`numeric|min_value:0|max_value:${this.cutOffs[1].workingDays}`" 
                    v-model="cutOffs[1].absent"
                    @blur="computeDeduction(1, 'absentDeduction', 'absent2')" 
                  />
                  <span class="uk-text-danger" v-if="errors.has('absent2')">{{ errors.first('absent2') }}</span>
                  <div>
                    Deduction: 
                    <span class="uk-text-danger">
                      <vue-numeric 
                        :currency="config.currency" 
                        :precision="config.precision" 
                        :value="cutOffs[1].absentDeduction" 
                        read-only
                      ></vue-numeric>
                    </span>
                  </div>
                </div>
              </div>
              <!-- ./No. Absent (Days) -->

              <!-- No. Hours Late -->
              <div>
                <label class="uk-form-label uk-text-right@m">Tardiness (Minutes)</label>
                <div class="uk-form-controls uk-text-left">
                  <input 
                    type="text"
                    name="late2"
                    :data-vv-as="'Tardiness'"
                    :data-vv-message="{ max_value: 'Test message' }"
                    :class="['uk-input uk-text-danger', { 'uk-form-danger': errors.has('late2') }]"
                    v-validate="`numeric|min_value:0|max_value:${this.cutOffs[1].workingDays * 24}`" 
                    v-model="cutOffs[1].late" 
                    @blur="computeDeduction(1, 'lateDeduction', 'late2')"
                  />
                  <span class="uk-text-danger" v-if="errors.has('late2')">{{ errors.first('late2') }}</span>
                  <div>
                    Deduction: 
                    <span class="uk-text-danger">
                      <vue-numeric 
                        :currency="config.currency" 
                        :precision="config.precision" 
                        :value="cutOffs[1].lateDeduction" 
                        read-only
                      ></vue-numeric>
                    </span>
                  </div>
                </div>
              </div>  
              <!-- ./No. Hours Late -->

            </div>
          </div>
        </div>
        <!-- ./2nd Cutoff -->

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

      <!-- Result -->
      <result id="result" />
      <!-- ./Result -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertPeriodically, toStartCase } from '@/utils/common'
import taxCalculator from '@/utils/tax-calculator'
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
      cutOffs: [
        {
          salary: 0,
          workingDays: 0,
          otherIncome: 0,
          otherDeduction: 0,
          absent: 0,
          absentDeduction: 0,
          late: 0,
          lateDeduction: 0,
        },
        {
          salary: 0,
          workingDays: 0,
          otherIncome: 0,
          otherDeduction: 0,
          absent: 0,
          absentDeduction: 0,
          late: 0,
          lateDeduction: 0,
        }
      ]
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek', 'type', 'types', 'totalContribution', 'contributions', 'isSimpleCalculator']),

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

      const semiMonthlySalary = (this.salary.monthly / 2).toFixedFloat(2)
      this.cutOffs[0].salary = semiMonthlySalary
      this.cutOffs[1].salary = semiMonthlySalary

      this.recomputeDeductions()
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

      if(this.isSimpleCalculator) {
        const { monthly } = this.salary
        taxCalculator({ periodType: 'monthly', value: { monthly } })
      } else {
        taxCalculator({ value: { semiMonthly: [this.cutOffs[0].salary, this.cutOffs[1].salary] } })
      }

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
      
      // Recompute deductions after clicking day in calendar
      this.recomputeDeductions()
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

      this.cutOffs[0].workingDays = firstCutoff
      this.cutOffs[1].workingDays = secondCutOff
    },

    resetSalary () {
      this.salary = {
        annual: 0,
        monthly: 0,
        semiMonthly: 0,
        weekly: 0,
        daily: 0,
      }
    },

    onInputEnter () {
      document.activeElement.blur()
    },

    // Computes the absent field if the validation passed
    computeDeduction (index, key, inputName) {
      this.$validator.validate(inputName).then(() => {

        const netPay = this.cutOffs[index].salary
        let result = 0,
            perDay = netPay / this.cutOffs[index].workingDays,
            perHour = perDay / 24,
            perMinute = perHour / 60

        switch (key) {
          case 'absentDeduction':
            let absent = parseInt(this.cutOffs[index].absent)
            absent = isNaN(absent) ? 0 : absent

            result = perDay * absent
            break;

          case 'lateDeduction':
            let late = parseInt(this.cutOffs[index].late)
            late = isNaN(late) ? 0 : late

            result = perMinute * late
            break;

          default:
            break;
        }

        if (this.errors.has(inputName)) result = 0
        this.cutOffs[index][key] = result
      })
    },

    recomputeDeductions () {
      this.computeDeduction(0, 'absentDeduction', 'absent1')
      this.computeDeduction(0, 'lateDeduction', 'late1')

      this.computeDeduction(1, 'absentDeduction', 'absent2')
      this.computeDeduction(1, 'lateDeduction', 'late2')
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
    },

    // Resets value when changing app settings
    isSimpleCalculator () {
      this.resetSalary()
    },
  },

  mounted () {
    this.configureMomentBusiness()
  },
}
</script>