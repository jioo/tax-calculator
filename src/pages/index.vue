<template>
  <div>
    <!-- Header -->
		<header class="header-style" data-uk-sticky="show-on-up: true; animation: uk-animation-slide-top">
			<div class="uk-container">
				<nav id="navbar" data-uk-navbar>
					<div class="uk-navbar-center">
            <img class="uk-margin uk-margin-top" :data-src="require('@/assets/img/jio.png')" width="25" height="25" alt="Jio" uk-img>
					</div>
					<div class="uk-navbar-right">
						<div class="uk-navbar-item">
              <ul class="uk-navbar-nav">
                <li><a class="uk-navbar-toggle" data-uk-toggle href="#offcanvas-nav" uk-icon="icon: settings"></a></li>
              </ul>
						</div>
					</div>
				</nav>
			</div>
		</header>
		<!-- ./Header -->

    <!-- Off Canvas -->
		<div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
			<div class="uk-offcanvas-bar">
				<button class="uk-offcanvas-close uk-close uk-icon" type="button" data-uk-close></button>
        <div class="uk-form-stacked">
          <h4 class="uk-text-bold">Settings</h4>

          <!-- Working Days -->
          <div class="uk-margin">
            <label class="uk-form-label" v-text="'No. Working Days per Week'"></label>
            <div class="uk-form-controls">
              <input  
                type="text"
                name="Working Days"
                :class="['uk-input', { 'uk-form-danger': errors.has('Working Days') }]"
                v-validate="'numeric|min_value:1|max_value:7'" 
                v-model="settings.workingDays"
              />
              <span class="uk-text-danger" v-if="errors.has('Working Days')">{{ errors.first('Working Days') }}</span>
            </div>
          </div>
          <!-- ./Working Days -->

          <div class="uk-margin">
            <button class="uk-button uk-button-primary uk-width-1-1" @click.prevent="applySettings">Apply</button>
          </div>

        </div>
			</div>
		</div>
		<!-- ./Off Canvas -->

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
            
            <!-- Grid -->
            <div>
              <div class="uk-margin uk-align-right">
                <label>
                  <input class="uk-checkbox" type="checkbox" v-model="withContribution"> With Contributions
                </label>
              </div>

              <div class="uk-clearfix"></div>
              <div class="uk-form-horizontal">

                <!-- GSIS -->
                <div class="uk-margin uk-animation-slide-right-medium" v-if="type === 'Government Employee'">
                  <label class="uk-form-label uk-text-right@m" v-text="'GSIS'"></label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="gsis" 
                      :disabled="!hasContribution"
                    ></vue-numeric>
                  </div>
                </div>
                <!-- ./GSIS -->

                <div class="uk-margin" v-if="type === 'Government Employee'"></div>

                <!-- SSS -->
                <div class="uk-margin uk-animation-slide-right-medium" v-if="type !== 'Government Employee'">
                  <label class="uk-form-label uk-text-right@m" v-text="'SSS'"></label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="sss" 
                      :disabled="!hasContribution"
                    ></vue-numeric>
                  </div>
                </div>
                <!-- ./SSS -->

                <!-- PAGIBIG -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m" v-text="'PAGIBIG'"></label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="pagibig" 
                      :disabled="!hasContribution"
                    ></vue-numeric>
                  </div>
                </div>
                <!-- ./PAGIBIG -->

                <!-- PHILHEALTH -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m" v-text="'PHILHEALTH'"></label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="philhealth" 
                      :disabled="!hasContribution"
                    ></vue-numeric>
                  </div>
                </div>
                <!-- ./PHILHEALTH -->

              </div>
            </div>
            <!-- ./Grid -->

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

        <!-- Card -->
        <div class="uk-card uk-card-default uk-card-body uk-margin-medium">
          <div class="uk-flex-center uk-child-width-1-2@m" uk-grid>
            <div>
              test
            </div>
            <div>
              test
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer -->
		<footer class="uk-section uk-section-small">
			<div class="uk-container">
				<p class="uk-text-small uk-text-center">
          <span data-uk-icon="code"></span>
          with
          <span data-uk-icon="heart"></span>
          by
          <a href="http://jioo.github.io" title="Justine Joshua Quiazon" target="_blank">
            Justine Joshua Quiazon
          </a>
          &copy;
          {{ new Date().getFullYear() }}
        </p>
			</div>
		</footer>
		<!-- ./Footer -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { convertPeriodically, toStartCase } from '@/utils/common'
import taxCalculator from '@/utils/2018-to-2022-tax-calculator'
import contributionCalculator from '@/utils/contributions'

export default {
  data () {
    return {
      config: {
        currency: '₱',
        precision: 2,
      },
      settings: {
        workingDays: '',
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

    withContribution: {
      get () {
        return this.hasContribution
      },
      set (val) {
        this.$store.dispatch('updateHasContribution', val)
      }
    },

    sss: {
      get () {
        return (this.hasContribution) ? this.contributions.sss : 0
      },
      set (val) {
        this.$store.dispatch('updateSss', val)
      }
    },

    gsis: {
      get () {
        return (this.hasContribution) ? this.contributions.gsis : 0
      },
      set (val) {
        this.$store.dispatch('updateGsis', val)
      }
    },

    pagibig: {
      get () {
        return (this.hasContribution) ? this.contributions.pagibig : 0
      },
      set (val) {
        this.$store.dispatch('updatePagibig', val)
      }
    },

    philhealth: {
      get () {
        return (this.hasContribution) ? this.contributions.philhealth : 0
      },
      set (val) {
        this.$store.dispatch('updatePhilhealth', val)
      }
    },
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
      }
    },

    toStartCase (str) {
      return toStartCase(str)
    },

    applySettings () {
      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          // Apply new settings
          this.$store.dispatch('updateWorkingDays', parseFloat(this.settings.workingDays))

          // Recalculate Salaries
          this.onSalaryInput('monthly')
          this.$UIkit.offcanvas('#offcanvas-nav').hide()
        }
      })
    },

    calculate () {
      if (!this.salary.monthly) return false
      
      console.log(taxCalculator(this.salary.monthly))
    },

    initSettings () {
      this.settings.workingDays = this.workingDaysPerWeek
    },
  },

  created () {
    this.initSettings()
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
