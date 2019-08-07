<template>
  <div>
    <div ref="blockDetector">
      <div class="adBanner"></div>
    </div>

    <div ref="modalFull" class="uk-modal-container" uk-modal="bg-close: false">
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title uk-text-center">Ad Blocker Detected</h2>
        <h3 class="uk-text-center">Kindly turn off your adblocker and refresh the page.</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    const banner = this.$refs.blockDetector.clientHeight;

    if (banner <= 0) {
      let element = this.$refs.modalFull;
      this.$UIkit.modal(element).show();
    }
  } 
}
</script>

<style scoped>
.adBanner {
  background-color: transparent;
  height: 1px;
  width: 1px;
}
</style>