<template>
  <div>

    <div class="uk-alert-primary" uk-alert v-show="isPayroll">
      <p>You can change the distribution by adjusting the input range at the contribution box.</p>
    </div>

    <div class="uk-align-right@m">
      <label>
        <input class="uk-checkbox" type="checkbox" v-model="withContribution"> With Monthly Contributions
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

          <vue-slider 
            :value="gsisPercent" 
            :lazy="true" @change="gsisPercentChange" 
            :interval="10"
            :disabled="!hasContribution"
            v-show="isPayroll"
          ></vue-slider>

          <div class="uk-child-width-1-2" uk-grid v-show="isPayroll">
            <div>{{ '1st Cutoff: ' + gsisPercent + '%' }}</div>
            <div>{{ '2nd Cutoff: ' + (100 - gsisPercent) + '%' }}</div>
          </div>

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

        <div class="uk-form-controls">

          <vue-slider 
            :value="sssPercent" 
            :lazy="true" @change="sssPercentChange" 
            :interval="10"
            :disabled="!hasContribution"
            v-show="isPayroll"
          ></vue-slider>

          <div class="uk-child-width-1-2" uk-grid v-show="isPayroll">
            <div>{{ '1st Cutoff: ' + sssPercent + '%' }}</div>
            <div>{{ '2nd Cutoff: ' + (100 - sssPercent) + '%' }}</div>
          </div>
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

        <div class="uk-form-controls">
          <vue-slider 
            :value="pagibigPercent" 
            :lazy="true" @change="pagibigPercentChange" 
            :interval="10"
            :disabled="!hasContribution"
             v-show="isPayroll"
          ></vue-slider>

          <div class="uk-child-width-1-2" uk-grid v-show="isPayroll">
            <div>{{ '1st Cutoff: ' + pagibigPercent + '%' }}</div>
            <div>{{ '2nd Cutoff: ' + (100 - pagibigPercent) + '%' }}</div>
          </div>
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

        <div class="uk-form-controls">
          <vue-slider 
            :value="philhealthPercent" 
            :lazy="true" @change="philhealthPercentChange" 
            :interval="10"
            :disabled="!hasContribution"
            v-show="isPayroll"
          ></vue-slider>

          <div class="uk-child-width-1-2" uk-grid v-show="isPayroll">
            <div>{{ '1st Cutoff: ' + philhealthPercent + '%' }}</div>
            <div>{{ '2nd Cutoff: ' + (100 - philhealthPercent) + '%' }}</div>
          </div>
        </div>
      </div>
      <!-- ./PHILHEALTH -->

      <div class="uk-margin">
        <div class="uk-form-controls">
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
      config: {
        currency: '₱',
        precision: 2,
      },
    }
  },

  computed: {
    ...mapGetters(['type', 'hasContribution', 'contributions', 'calculator', 'isPayroll']),

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
        return (this.hasContribution) ? this.contributions.sss.value : 0
      },
      set (val) {
        if (this.hasContribution) {
          this.$store.dispatch('updateSss', val)
        }
      }
    },

    sssPercent() {
      return this.contributions.sss.percent
    },

    gsis: {
      get () {
        return (this.hasContribution) ? this.contributions.gsis.value : 0
      },
      set (val) {
        if (this.hasContribution) { 
          this.$store.dispatch('updateGsis', val)
        }
      }
    },

    gsisPercent() {
      return this.contributions.gsis.percent
    },

    pagibig: {
      get () {
        return (this.hasContribution) ? this.contributions.pagibig.value : 0
      },
      set (val) {
        this.$store.dispatch('updatePagibig', val)
      }
    },

    pagibigPercent () {
      return this.contributions.pagibig.percent
    },

    philhealth: {
      get () {
        return (this.hasContribution) ? this.contributions.philhealth.value : 0
      },
      set (val) {
        this.$store.dispatch('updatePhilhealth', val)
      }
    },

    philhealthPercent () {
      return this.contributions.philhealth.percent
    },
  },

  methods: {
    sssPercentChange (value) {
      this.$store.dispatch('updateSssPercent', value)
    },

    gsisPercentChange (value) {
      this.$store.dispatch('updateGsisPercent', value)
    },

    pagibigPercentChange (value) {
      this.$store.dispatch('updatePagibigPercent', value)
    },

    philhealthPercentChange (value) {
      this.$store.dispatch('updatePhilhealthPercent', value)
    },

    resetContributions () {
      this.$store.dispatch('updateSss', 0)
      this.$store.dispatch('updateGsis', 0)
      this.$store.dispatch('updatePhilhealth', 0)
      this.$store.dispatch('updatePagibig', 0)

      this.sssPercentChange(50)
      this.gsisPercentChange(50)
      this.pagibigPercentChange(50)
      this.philhealthPercentChange(50)
    }
  },

  // Resets value when changing app settings
  watch: {
    calculator () {
      this.resetContributions()
    }
  }
}
</script>