<template>
  <div>
    <!-- Header -->
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
		<!-- ./Header -->

    <!-- Off Canvas -->
		<div id="offcanvas-nav" data-uk-offcanvas="flip: true; overlay: true">
			<div class="uk-offcanvas-bar">
				<button class="uk-offcanvas-close uk-close uk-icon" type="button" data-uk-close></button>
				<h3>Settings</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
			</div>
		</div>
		<!-- ./Off Canvas -->
    
    <div class="uk-section uk-section-default">
        <div class="uk-container">
          <div class="uk-child-width-1-2@m " uk-grid="masonry: true">
            <div>
                <div class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle" style="height: 100px">Item</div>
            </div>
            <div>
                <div class="uk-card uk-card-default uk-flex uk-flex-center uk-flex-middle" style="height: 130px">Item</div>
            </div>
          </div>
        </div>
    </div>

    <!-- Footer -->
		<footer class="uk-section uk-section-small">
			<div class="uk-container">
				<p class="uk-text-small uk-text-center">
          <span data-uk-icon="code"></span>
          with
          <span data-uk-icon="heart"></span>
          by
          <a href="http://jioo.github.io" title="Justine Joshua Quiazon" target="_blank">
            Justine Joshua Quiazon
          </a>
          &copy;
          {{ new Date().getFullYear() }}
        </p>
			</div>
		</footer>
		<!-- ./Footer -->
  </div>
</template>

<script>
import taxCalculator from '@/utils/2018-to-2022-tax-calculator'
import contributionCalculator from '@/utils/contributions'

export default {
  created () {
    let salary = 30000

    const contributions = contributionCalculator(salary)
    const taxable = salary - contributions
    console.log('contributions: ',contributions)
    console.log('taxable: ',taxable)

    const tax = taxCalculator(taxable)
    
    console.log('withholding tax: ', tax.toFixedFloat(2))
    console.log( 'net pay: ', (salary - tax) )
  }
};
</script>

<style lang="scss">
.header-style {
  background-color: #fff;
  border-bottom: 1px solid #f2f2f2;
  overflow-y: hidden;
}
</style>
