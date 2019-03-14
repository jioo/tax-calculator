<template>
  <div>
    <div class="uk-margin uk-align-right@m">
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

          <vue-slider :value="value" :lazy="true" @change="sssRange"></vue-slider>
          <div class="uk-child-width-1-2" uk-grid>
            <div>{{ '1st Cutoff: ' + value + '%' }}</div>
            <div>{{ '2nd Cutoff: ' + (100 - value) + '%' }}</div>
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
      value: 50,
    }
  },

  computed: {
    ...mapGetters(['type', 'hasContribution', 'contributions']),

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
        if (this.hasContribution) {
          this.$store.dispatch('updateSss', val)
        }
      }
    },

    gsis: {
      get () {
        return (this.hasContribution) ? this.contributions.gsis : 0
      },
      set (val) {
        if (this.hasContribution) { 
          this.$store.dispatch('updateGsis', val)
        }
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
    sssRange (value) {
      console.log(value)
      this.value = value
    }
  }
}
</script>