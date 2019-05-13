<template>
  <div>
    <header class="header-style" uk-sticky="show-on-up: true; animation: uk-animation-slide-top">
      <div class="uk-container">
        <nav id="navbar" uk-navbar>
          
          <div class="uk-navbar-left">
            <router-link class="uk-navbar-item uk-logo" :to="{ name: 'home' }" >
              <img class="uk-margin uk-margin-top" :src="require('@/assets/img/logo.png')" width="115" alt="Logo" uk-img>
            </router-link>
          </div>

          <div class="uk-navbar-right nav-overlay">
            <div class="uk-navbar-item">
              <ul class="uk-navbar-nav">

                <router-link tag="li" to="/calculator">
                  <a class="uk-visible@m" v-text="'Calculator'"></a>
                </router-link>

                <router-link tag="li" to="/faq">
                  <a class="uk-visible@m" v-text="'FAQ'"></a>
                </router-link>

                <li><a class="uk-navbar-toggle uk-hidden@m" uk-toggle uk-navbar-toggle-icon href="#offcanvas-nav"></a></li>
              </ul>
            </div>
          </div>
          
        </nav>
      </div>
    </header>

    <!-- Off Canvas -->
    <div id="offcanvas-nav" ref="offcanvas-nav" uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide">
        <button class="uk-offcanvas-close uk-close" type="button" uk-close></button>
        <ul class="uk-nav uk-nav-default">

          <router-link class="uk-navbar-item uk-logo" :to="{ name: 'home' }" >
            <img class="uk-margin uk-margin-top uk-margin-left" :src="require('@/assets/img/logo.png')" alt="Logo" uk-img>
          </router-link>

          <router-link tag="li" to="/calculator">
            <a class="uk-text-medium" v-text="'Calculator'"></a>
          </router-link>

          <router-link tag="li" to="/faq">
            <a class="uk-text-medium" v-text="'FAQ'"></a>
          </router-link>
        </ul>
      </div>
    </div>
    <!-- ./Off Canvas -->
  </div>
</template>

<script>
export default {
  watch:{
    // close the off canvas nav when changing route
    $route (to, from){
      const canvas = this.$refs['offcanvas-nav']
      UIkit.offcanvas(canvas).hide();
    }
  } 
}
</script>

<style scoped>
  .uk-text-medium {
    font-size: 18px !important;
  }
</style>

