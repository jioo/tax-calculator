<template>
<div ref="modal" uk-modal>
  <div class="uk-modal-dialog">
    <button class="uk-modal-close-default" type="button" uk-close></button>

    <div class="uk-modal-header">
      <div class="uk-modal-title" uk-grid> 
        <div>
          <select class="uk-select adjust-dropdown" v-model="year">
            <option v-for="(year, index) in yearList" :key="index" :value="year">{{ year }}</option>
          </select>
        </div>

        <div>
          <span>Official Holidays</span>
        </div>

      </div>
    </div>

    <div class="uk-modal-body" uk-overflow-auto>
      <table class="uk-table uk-table-striped uk-text-center">
        <thead>
          <tr>
              <th class="uk-text-center">Date</th>
              <th class="uk-text-center">Day</th>
              <th class="uk-text-center">Holiday</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in holidays" :key="index">
              <td v-text="formatLongDate(item.date)"></td>
              <td v-text="formatToDay(item.date)"></td>
              <td v-text="item.label"></td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import holidays from '@/utils/official-holidays'
import moment from 'moment-business-days'

export default {
  data () {
    return {
      year: new Date().getFullYear(),
      yearList: [],
      holidays: { date: '', label: '' },
    }
  },

  methods: {
    openModal() {
      const element = this.$refs.modal
      this.$UIkit.modal(element).show()
    },

    formatLongDate (date) {
      return moment(date).format('MMMM D')
    },

    formatToDay (date) {
      return moment(date).format('dddd')
    },
  },

  watch: {
    year (val) {
      this.holidays = holidays[val]
    }
  },

  created () {
    this.yearList = Object.keys(holidays)
    this.holidays = holidays[this.year]
  }
}
</script>

<style scoped>
  .adjust-dropdown {
    margin: 0 0 8px 20px !important;
  }
</style>
