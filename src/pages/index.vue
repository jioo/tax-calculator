<template>
  <div>
    <div class="uk-light uk-background-norepeat uk-background-cover uk-background-center-center uk-cover-container uk-background-secondary">
      <img data-src="/img/bg.jpg" alt="" data-uk-cover data-uk-img>
      <div class="uk-container uk-container-small uk-flex-auto uk-text-center uk-margin-large" data-uk-scrollspy="target: > .animate; cls: uk-animation-slide-bottom-small uk-invisible; delay: 300">
        <h1 class="uk-heading-primary animate uk-invisible" style="font-weight: 600;" v-text="`${new Date().getFullYear()} Philippines Tax Calculator`"></h1>
      </div>
    </div>

    <div class="uk-section">
      <div class="uk-container uk-container-xsmall uk-text-center uk-padding-remove">
				<p class="uk-margin-remove uk-h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae dignissim massa. Vivamus consectetur tristique bibendum. 
          Donec sed libero neque. Morbi finibus massa quis faucibus fringilla. Nunc a mi sit amet risus commodo sagittis at vel metus. 
        </p>
			</div>
    </div>

    <div class="uk-section uk-section-muted">
      <div class="uk-container">
				<div class="uk-grid uk-grid-large uk-child-width-1-3@m" data-uk-grid data-uk-scrollspy="target: > div; delay: 150; cls: uk-animation-slide-bottom-medium">
					<div class="uk-text-center">
						<span uk-icon="icon: world; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Offline Mode</h4>
						<p>24/7 support. We’re always here for you no matter what time of day.</p>
					</div>
					<div class="uk-text-center">
						<span uk-icon="icon: bolt; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Fast &amp; Lightweight</h4>
						<p>24/7 support. We’re always here for you no matter what time of day.</p>
					</div>
					<div class="uk-text-center">
						<span uk-icon="icon: check; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Reliable</h4>
						<p>24/7 support. We’re always here for you no matter what time of day.</p>
					</div>
				</div>
			</div>

      <div class="uk-container uk-align-center uk-text-center" data-uk-scrollspy="target: > .animate; cls: uk-animation-slide-bottom-small uk-invisible; delay: 300">
        <div class="uk-margin-medium-top animate uk-invisible" data-uk-margin data-uk-scrollspy-class="uk-animation-fade uk-invisible">
          <router-link 
            :to="'/calculator'"
            class="uk-button uk-button-primary uk-button-large uk-width-2-3 uk-width-auto@s"
            title="Get Started"
          >
            Get Started
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>