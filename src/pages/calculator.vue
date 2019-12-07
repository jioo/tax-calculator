<template>
  <div id="top-section" class="uk-section uk-section-default">
    <div class="uk-container">
      
      <div class="uk-flex-center uk-child-width-1-2@m" uk-grid>

        <!-- Grid -->
        <div class="uk-width-1-1">
          <div class="uk-margin-large">
            <h3 class="uk-text-center" v-text="(isTax) ? 'Tax Calculator' : 'Payroll Calculator'"></h3>
          </div>
        </div>
        <!-- ./Grid -->
        
        <!-- Grid -->
        <div>
          <div class="uk-form-horizontal">
            <div class="uk-card uk-card-body uk-card-default uk-margin-medium">

              <!-- Settings -->
              <div class="uk-margin-medium uk-text-right">
                <a data-uk-toggle href="#settings-nav" uk-icon="icon: settings" uk-tooltip="Settings"></a>
              </div>
              
              <settings ref="settingsComponent" />
              <!-- Settings -->

              <!-- Employee Types -->
              <div class="uk-margin-medium">
                <label class="uk-form-label uk-text-right@m">Employee Type</label>
                <div class="uk-form-controls">
                  <select class="uk-select" v-model="employeeType" >
                    <option 
                      v-for="(item, key) in types" :key="key" 
                      :value="item"
                      v-text="` ${item}`"
                    ></option>
                  </select>
                </div>
              </div>
              <!-- ./Employee Types -->

              <!-- Monthly Salary -->
              <div class="uk-margin" v-show="isPayroll">
                <label class="uk-form-label uk-text-right@m" v-text="`Monthly Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input"
                    ref="payrollMonthly" 
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
              <div class="uk-margin" v-for="(item, key) in salary" :key="key" v-show="isTax">
                <label class="uk-form-label uk-text-right@m" v-text="`${toStartCase(key)} Salary`"></label>
                <div class="uk-form-controls">
                  <vue-numeric 
                    class="uk-input" 
                    :ref="key"
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
            <div class="uk-card uk-card-default uk-card-body" v-show="isPayroll">
              <contributions />
            </div>
            <!-- ./Contributions -->

          </div>
        </div>
        <!-- ./Grid -->

        <!-- Grid -->
        <div class="uk-align-center uk-text-center" uk-grid>

          <!-- Contributions (Simple Calculator) -->
          <div class="uk-card uk-card-default uk-card-body uk-text-left" v-show="isTax">
            <contributions />
          </div>
          <!-- ./Contributions (Simple Calculator) -->

          <!-- Working Days -->
          <div class="uk-card uk-card-default uk-card-body" v-show="isPayroll">
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
          <div class="uk-card uk-card-default uk-card-body" v-show="isPayroll">
            <div class="uk-text-center@m">
              <h5>Total Working Days: <b>{{ workingDays }}</b></h5> 
              <div class="uk-alert-primary" uk-alert>
                <p>Toggle holidays by clicking any day in the calendar.</p>
              </div>

              <v-calendar 
                :attributes="calendarAttributes"
                @dayclick="dayClicked"
                :from-page.sync="currentCalendar" 
              ></v-calendar>
              
              <!-- Official Holidays -->
              <br/><br/>
              <button type="button" class="uk-button uk-button-primary" @click="openModal()">See All Official Holidays</button>
              <holiday-modal ref="holidayModal"></holiday-modal>
              <!-- ./Official Holidays -->
            </div>
          </div>
          <!-- ./Calendar -->

        </div>
        <!-- ./Grid -->

        <!-- 1st Cutoff -->
        <div class="uk-text-center@m" v-show="isPayroll">
          <div class="uk-card uk-card-body uk-card-default uk-margin-medium">
            <h5 class="uk-text-center@s">1st Cutoff</h5>
            <hr>

            {{ currentCalendar.monthLabel }} 01 - 15 
            <br/> Basic Pay:
            <vue-numeric 
              :currency="config.currency" 
              :precision="config.precision" 
              :value="cutOffs[0].salary" 
              read-only
            ></vue-numeric>

            <br/> Working Days: {{ this.cutOffs[0].workingDays }}

            <ul class="uk-list">
              <li v-for="(item, key) in filteredContributions" :key="key">
                <strong>{{ key.toUpperCase() }}</strong> {{  `(${item.percent}%)` }}: 
                {{ ( item.value * (item.percent / 100) ).toFixed(2) }}
              </li>
            </ul>

            <hr>
            
            <transition 
              ref="transition1"
              enter-active-class="uk-animation-slide-top-small"
              leave-active-class="uk-animation-slide-top-small uk-animation-fast uk-animation-reverse"
            >
              <div class="uk-form-horizontal" v-show="advanceOptions.firstCutoff">
                
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
            </transition>

            <button 
              type="button" 
              class="uk-button uk-align-right uk-margin uk-button-primary" 
              @click="toggleAdvanceOptions('firstCutoff')"
              v-text="(advanceOptions.firstCutoff) ? 'Hide Options': 'Advance Options'"
            >
            </button>
          </div>
        </div>
        <!-- ./1st Cutoff -->

        <!-- 2nd Cutoff -->
        <div class="uk-text-center@m" v-show="isPayroll">
          <div class="uk-card uk-card-body uk-card-default uk-margin-medium">
            <h5 class="uk-text-center@s">2nd Cutoff</h5>
            <hr>

            {{ currentCalendar.monthLabel }} 16 - {{ this.lastDayOfCurrentMonth }}
            <br/> Basic Pay:
            <vue-numeric 
              :currency="config.currency" 
              :precision="config.precision" 
              :value="cutOffs[1].salary" 
              read-only
            ></vue-numeric>

            <br/> Working Days: {{ this.cutOffs[1].workingDays }}
            <ul class="uk-list">
              <li v-for="(item, key) in filteredContributions" :key="key">
                <strong>{{ key.toUpperCase() }}</strong> {{  `(${100 - item.percent}%)` }}: 
                {{ ( item.value * ((100 - item.percent) / 100) ).toFixed(2) }}
              </li>
            </ul>

            <hr>

            <transition 
              enter-active-class="uk-animation-slide-top-small"
              leave-active-class="uk-animation-slide-top-small uk-animation-fast uk-animation-reverse"
            >
              <div class="uk-form-horizontal" v-show="advanceOptions.secondCutoff">
                
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
            </transition>  

            <button 
              type="button" 
              class="uk-button uk-align-right uk-margin uk-button-primary" 
              @click="toggleAdvanceOptions('secondCutoff')"
              v-text="(advanceOptions.secondCutoff) ? 'Hide Options': 'Advance Options'"
            >
            </button>
          </div>
        </div>
        <!-- ./2nd Cutoff -->

        <!-- Grid -->
        <div class="uk-width-1-1 uk-margin-medium uk-visible@m">
          <div class="uk-flex-center" uk-grid>
            <!-- Calculate Button -->
            <div class="uk-width-1-2@m">
              <button class="uk-button uk-button-primary uk-button-large uk-width-1-1 " @click.prevent="calculate">Calculate</button>
            </div>
            <!-- ./Calculate Button -->
          </div>
        </div>
        <!-- ./Grid -->
      </div>

      <!-- Result -->
      <result id="result" />
      <!-- ./Result -->

      <!-- Grid -->
      <div class="uk-width-1-1 uk-margin-large" v-show="isTax">
        <div class="uk-flex-center" uk-grid>

          <div  class="uk-width-1-2@m uk-margin-small">
            <div class="uk-card uk-card-default uk-card-body">
              <h4 class="uk-text-center@m">Payroll Calculator</h4>
              <ul class="uk-list uk-list-bullet">
                <li>Detect No. of Working Days</li>
                <li>Customize Working Days</li>
                <li>Additional Fields: Income, Deductions, No. of Absent, Tardiness</li>
                <li>Input Holidays / Non-Working Days</li>
              </ul>
              <a class="uk-button uk-button-primary uk-align-center uk-width-1-1 uk-width-auto@s" @click.prevent="switchToPayroll">Try It!</a>
            </div>
          </div>

        </div>
      </div>
      <!-- ./Grid -->
    </div>

    <!-- Floating Calculate Button -->
    <div class="uk-position-fixed uk-position-bottom-right uk-padding-small uk-hidden@m">
      <button type="button" class="uk-button uk-button-primary uk-border-rounded" @click.prevent="calculate">Calculate</button>
    </div>
    <!-- ./Floating Calculate Button -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertPeriodically, toStartCase } from '@/utils/common'
import taxCalculator from '@/utils/tax-calculator'
import contributionCalculator from '@/utils/contributions'
import Contributions from '@/components/Contributions'
import Settings from '@/components/Settings'
import Result from '@/components/Result'
import HolidayModal from '@/components/HolidayListModal'
import moment from 'moment-business-days'

export default {
  components: {
    Contributions,
    Result,
    Settings,
    HolidayModal,
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
      workingDays: 0,
      workingWeekdays: [
        { key: 1, label: 'Monday', value: true },
        { key: 2, label: 'Tuesday', value: true },
        { key: 3, label: 'Wednesday', value: true },
        { key: 4, label: 'Thursday', value: true },
        { key: 5, label: 'Friday', value: true },
        { key: 6, label: 'Saturday', value: false },
        { key: 0, label: 'Sunday', value: false },
      ],
      advanceOptions: {
        firstCutoff: false,
        secondCutoff: false,
      },
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
    ...mapGetters([
      'workingDaysPerWeek', 
      'type', 
      'types', 
      'totalContribution', 
      'contributions', 
      'calculator', 
      'isPayroll', 
      'isTax', 
      'calendarAttributes', 
      'holidays'
    ]),

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

      // Payroll Calculator
      if (this.isPayroll) {
        this.computeSemiMonthlySalary()
        this.recomputeDeductions()
      }

      // Tax Calcualtor
      else {
        this.salary = convertPeriodically(salaryPeriod, { [salaryPeriod]: this.salary[salaryPeriod] })
      } 
    },

    computeSemiMonthlySalary() {
      const salaryPerDay = (this.salary.monthly / this.workingDays).toFixedFloat(2)
      if (isNaN(salaryPerDay)) return false 

      this.cutOffs[0].salary = (salaryPerDay * this.cutOffs[0].workingDays).toFixedFloat(2)
      this.cutOffs[1].salary = (salaryPerDay * this.cutOffs[1].workingDays).toFixedFloat(2)
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

    // Calculate Withholding Tax and other computations
    calculate () {
      if (!this.salary.monthly) {
        this.$UIkit.notification.closeAll()
        this.$UIkit.notification({
          status: 'danger',
          message: 'Please enter your Salary..',
          pos: 'bottom-left',
        })
        this.$refs.payrollMonthly.$el.focus();
        this.$refs.monthly[0].$el.focus()
        return false
      }

      if(this.isTax) {
        const { monthly } = this.salary
        taxCalculator({ periodType: 'monthly', value: { monthly } })
      } else {
        taxCalculator({ value: this.cutOffs })
      }

      document.querySelector('#result')
        .scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
    },

    // Click event in Calendar
    dayClicked (date) {
      const dayClicked = new Date(date.year, date.month - 1, date.day),
            currentHighlights = this.calendarAttributes[0].dates

      /**
       * Check if `dayClicked` already exists in `currentHighlights`
       * 
       * https://stackoverflow.com/questions/27450867/how-to-correctly-use-javascript-indexof-in-a-date-array
       */
      const validateDay = currentHighlights.map(Number).indexOf(+dayClicked)

      // Add the `dayClicked` in `currentHighlights`
      if (validateDay === -1)
        this.$store.dispatch('addHoliday', dayClicked)

      // Remove the selected day in `currentHighlights`
      else
        this.$store.dispatch('removeHoliday', validateDay)
      
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

      this.computeSemiMonthlySalary()
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

    resetData () {
      Object.assign(this.$data, this.$options.data())
    },

    switchToPayroll () {
      // Update the state in vuex
      this.$store.dispatch('updateCalculator', 'payroll')

      /**
       * Update the local data in `settings`
       * by calling the function in child component
       */
      this.$refs.settingsComponent.updateCalculator('payroll')

      // Scoll to top
      document.querySelector('#top-section')
        .scrollIntoView({behavior: "smooth"})
    },

    openModal () {
      this.$refs.holidayModal.openModal()
    },

    toggleAdvanceOptions (val) {
      this.advanceOptions[val] = !this.advanceOptions[val]
    }
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
        this.computeSemiMonthlySalary()
      },
      deep: true,
    },

    currentCalendar () {
      this.computeWorkingDays()
    },

    // Resets all value when changing settings
    calculator () {
      this.resetData()
      this.computeWorkingDays()
    },
  },

  mounted () {
    this.configureMomentBusiness()
    this.$store.dispatch('resetResults')
  },
}
</script>