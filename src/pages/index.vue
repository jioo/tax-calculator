<template>
  <div>
    <div class="uk-section">
      <div class="uk-container uk-container-xsmall uk-text-center">
        <h1 class="uk-heading-medium" style="font-weight: 600;" v-text="`${new Date().getFullYear()} Philippines Tax Calculator`"></h1>
				<p class="uk-margin-remove uk-h3">
          <span class="uk-text-primary">TAX PH</span> is designed to help Filipino employees understand the breakdown of their taxes and how it is calculated.
        </p>
        <router-link 
            :to="'/calculator'"
            class="uk-button uk-margin uk-button-primary uk-button-large uk-width-2-3 uk-width-auto@s"
            title="Get Started"
          >
          Get Started
        </router-link>
			</div>
    </div>

    <div class="uk-section uk-section-muted">
      <div class="uk-container">
				<div class="uk-grid uk-grid-large uk-child-width-1-3@m" data-uk-grid data-uk-scrollspy="target: > div; delay: 150; cls: uk-animation-slide-bottom-medium">
					<div class="uk-text-center">
						<span uk-icon="icon: world; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Offline Mode</h4>
						<p>No data is required after using the calculator once.</p>
					</div>
					<div class="uk-text-center">
						<span uk-icon="icon: bolt; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Fast &amp; Lightweight</h4>
						<p>Instant calculations. Less than 7MB of data is needed to use the Calculator.</p>
					</div>
					<div class="uk-text-center">
						<span uk-icon="icon: check; ratio: 3.5"></span>
						<h4 class="uk-margin-small-bottom uk-margin-top uk-margin-remove-adjacent">Reliable</h4>
						<p>The calculations are based on the latest goverment's official formula tables.</p>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

