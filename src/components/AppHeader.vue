<template>
  <div>
    <header class="header-style" data-uk-sticky="show-on-up: true; animation: uk-animation-slide-top">
      <div class="uk-container">
        <nav id="navbar" data-uk-navbar>
          
          <div class="uk-navbar-left">
            <router-link class="uk-navbar-item uk-logo" :to="{ name: 'home' }" >
              <img class="uk-margin uk-margin-top" :data-src="require('@/assets/img/logo.png')" width="115" alt="Logo" uk-img>
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

                <li><a href="#" class="uk-visible@m">Share</a></li>

                <li><a class="uk-navbar-toggle uk-hidden@m" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav"></a></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <!-- Off Canvas -->
    <div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
      <div class="uk-offcanvas-bar uk-offcanvas-bar-animation uk-offcanvas-slide">
        <button class="uk-offcanvas-close uk-close" type="button" data-uk-close></button>
        <ul class="uk-nav uk-nav-default">

          <router-link class="uk-navbar-item uk-logo" :to="{ name: 'home' }" >
            <img class="uk-margin uk-margin-top uk-margin-left" :data-src="require('@/assets/img/logo.png')" alt="Logo" uk-img>
          </router-link>

          <router-link tag="li" to="/calculator">
            <a v-text="'Calculator'"></a>
          </router-link>

          <router-link tag="li" to="/faq">
            <a v-text="'FAQ'"></a>
          </router-link>

          <li><a href="#">Share</a></li>
        </ul>
      </div>
    </div>
    <!-- ./Off Canvas -->
  </div>
</template>