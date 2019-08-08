<template>
  <div ref="adsElement"></div>
</template>

<script>
export default {
  props: ['src'],
  
  mounted () {
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', this.src);
    scriptEl.setAttribute('type', 'text/javascript');
    scriptEl.setAttribute('data-cfasync', 'false');

    this.$refs.adsElement.appendChild(scriptEl);
  }
}
</script>