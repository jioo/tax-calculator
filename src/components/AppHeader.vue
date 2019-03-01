<template>
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
</template>

<style lang="scss">
  .header-style {
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    overflow-y: hidden;
  }
</style>