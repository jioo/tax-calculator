<template>
  <div id="settings-nav" data-uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close uk-close uk-icon" type="button" data-uk-close></button>
      <div class="uk-form-stacked">
        <h4 class="uk-text-bold">Settings</h4>

        <!-- Calculator Type -->
        <div class="uk-margin-small">
          <label class="uk-form-label">Calculator Type:</label>
          <select class="uk-select" v-model="settings.calculatorType">
            <option value="tax">Tax Calculator</option>
            <option value="payroll">Payroll Calculator</option>
          </select>
        </div>
        <!-- ./Calculator Type -->

        <!-- Working Days -->
        <div class="uk-margin" v-show="settings.calculatorType === 'tax'">
          <label class="uk-form-label" v-text="'No. Working Days per Week'"></label>
          <div class="uk-form-controls">
            <input  
              type="text"
              name="Working Days"
              :class="['uk-input', { 'uk-form-danger': errors.has('Working Days') }]"
              v-validate="'numeric|min_value:1|max_value:7'" 
              :disabled="settings.calculatorType !== 'tax'" 
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      settings: {
        workingDays: '',
        calculatorType: 'tax',
      },
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek', 'calculator']),
  },

  watch: {
    // Reset value when calculator type setting is updated
    calculator (newValue, oldValue) {
      this.$store.dispatch('updateWorkingDays', 5)
      this.settings.workingDays = 5
    },
  },

  methods: {
    applySettings () {
      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          this.$UIkit.offcanvas('#settings-nav').hide()

          this.$store.dispatch('updateWorkingDays', parseFloat(this.settings.workingDays))
          this.$store.dispatch('updateCalculator', this.settings.calculatorType)
        }
      })
    },

    initSettings () {
      this.settings.workingDays = this.workingDaysPerWeek
      this.settings.calculatorType = this.calculator
    },

    updateCalculator (val) {
      this.settings.calculatorType = val
    }
  },

  created () {
    this.initSettings()
  },
}
</script>
