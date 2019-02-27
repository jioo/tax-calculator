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
				<h3>Settings</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			</div>
		</div>
		<!-- ./Off Canvas -->

    <div class="uk-section uk-section-default">
      <div class="uk-container">

        <div class="uk-margin-large">
          <h3 class="uk-text-center@m" v-text="`${new Date().getFullYear()} Philippines Tax Calculator`"></h3>
        </div>
        
        <!-- Card -->
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-flex-center uk-child-width-1-2@m" uk-grid>
            
            <!-- Grid -->
            <div>
              <h4 class="uk-heading-line uk-text-bold uk-text-center@m"><span>Salary</span></h4>

              <div class="uk-form-horizontal">
                <!-- Annualy Salary -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m">Annual Salary</label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="salary.annually" 
                      @input="onSalaryInput('Annual')"
                    ></vue-numeric>
                  </div>
                </div>

                <!-- Monthly Salary -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m">Monthly Salary</label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="salary.monthly" 
                      @input="onSalaryInput('Month')"
                      @blur="onSalaryBlur"
                    ></vue-numeric>
                  </div>
                </div>

                <!-- Semi Monthly Salary -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m">Semi Monthly Salary</label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="salary.semiMonthly" 
                      @input="onSalaryInput('Semi Month')"
                    ></vue-numeric>
                  </div>
                </div>

                <!-- Weekly Salary -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m">Weekly Salary</label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="salary.weekly" 
                      @input="onSalaryInput('Week')"
                    ></vue-numeric>
                  </div>
                </div>

                <!-- Daily Salary -->
                <div class="uk-margin">
                  <label class="uk-form-label uk-text-right@m">Daily Salary</label>
                  <div class="uk-form-controls">
                    <vue-numeric 
                      class="uk-input" 
                      :currency="config.currency" 
                      :precision="config.precision" 
                      v-model="salary.daily" 
                      @input="onSalaryInput('Day')"
                    ></vue-numeric>
                  </div>
                </div>

              </div>
            </div>
            <!-- ./Grid -->
            
            <!-- Grid -->
            <div>
              <h4 class="uk-heading-line uk-text-bold uk-text-center@m"><span>Monthly Contributions</span></h4>
              
            </div>
            <!-- ./Grid -->

          </div>
        </div>
        <!-- ./Card -->

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
import taxCalculator from '@/utils/2018-to-2022-tax-calculator'
import contributionCalculator from '@/utils/contributions'
import { convertSalary } from '@/utils/common'

export default {
  data () {
    return {
      salary: {
        annually: 0,
        monthly: 0,
        semiMonthly: 0,
        weekly: 0,
        daily: 0,
      },
      config: {
        currency: '₱',
        precision: 2,
      },
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek', 'type'])
  },

  methods: {
    onSalaryInput (salaryPeriod) {
      this.salary = convertSalary(salaryPeriod, this.salary)
    },

    calculateTotalContrubutions (contributions) {
      let employeeType = this.type // Private Employee, Government Employee, Self Employed
      const result = Object.keys(contributions)
        .filter(key => (employeeType === 'Government Employee') ? key !== 'sss' : key !== 'gsis')
        .reduce((previous, key) => {
          return previous + contributions[key];
        }, 0);

      return result
    },

    onSalaryBlur () {
      const monthlySalary = this.salary.monthly,
            contributions = contributionCalculator(monthlySalary),
            totalContributions = this.calculateTotalContrubutions(contributions)

      this.$store.dispatch('updateState', {
        type: this.type,
        salary: monthlySalary,
        contributions,
        totalContributions,
      })
    }
  },

  // watch: {
  //   'salary.monthly' (monthlySalary) {
  //     const contributions = contributionCalculator(monthlySalary),
  //           totalContributions = this.calculateTotalContrubutions(contributions)

  //     this.$store.dispatch('updateState', {
  //       type: this.type,
  //       salary: monthlySalary,
  //       contributions,
  //       totalContributions,
  //     })
  //   }
  // },

  created () {
    let salary = 30000

    // let contributions = contributionCalculator(salary)
    // contributions = this.calculateContrubutions(contributions)
    
    // const taxable = salary - contributions
    // console.log('contributions: ', contributions) // 1093.8
    // console.log('taxable: ', taxable) // 28906.2

    // const tax = taxCalculator(taxable) 
    
    // console.log('withholding tax: ', tax.toFixedFloat(2)) // 1614.64
    // console.log( 'net pay: ', (salary - tax) ) // 28385.36


    // const data = { from: 166667, to: 666666, adjustement: 500, computation: function () { return this.adjustement } }
    // console.log(data.computation())

    // let contributions = contributionCalculator(salary)
    // console.log(contributions)
    // console.log('total: ',  contributions)
    // console.log(this.calculateContrubutions(contributions))

    // console.log(taxCalculator)
  }
};
</script>

<style lang="scss">
.header-style {
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  overflow-y: hidden;
}
</style>
