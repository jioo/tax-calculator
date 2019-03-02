<template>
  <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
    <div class="uk-offcanvas-bar">
      <button class="uk-offcanvas-close uk-close uk-icon" type="button" data-uk-close></button>
      <div class="uk-form-stacked">
        <h4 class="uk-text-bold">Settings</h4>

        <div class="uk-margin-medium">
          <label>
            <input class="uk-checkbox" type="checkbox">  
            <span class="uk-text-bold"> Turn On Precise Calculator</span>(Beta)
          </label>

          <label class="uk-text-meta">
            <ul class="uk-list uk-list-bullet uk-margin-top">
              <li>Detect No. of Working Days</li>
              <li>Additional Fields: Other Income, Deductions</li>
              <li>Input Holidays / Non-Working Days</li>
              <li>Customize Working Days</li>
            </ul>
          </label>
        </div>

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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      settings: {
        workingDays: '',
      },
    }
  },

  computed: {
    ...mapGetters(['workingDaysPerWeek'])
  },

  methods: {
    applySettings () {
      this.$validator.validateAll().then(() => {
        // Check if all fields are valid
        if (this.errors.items.length === 0) {
          // Apply new settings
          this.$store.dispatch('updateWorkingDays', parseFloat(this.settings.workingDays))
          this.$UIkit.offcanvas('#offcanvas-nav').hide()
        }
      })
    },

    initSettings () {
      this.settings.workingDays = this.workingDaysPerWeek
    },
  },

  created () {
    this.initSettings()
  }
}
</script>