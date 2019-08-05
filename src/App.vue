<template>
  <!-- https://github.com/chrisvfritz/prerender-spa-plugin#caveats -->
  <router-view id="app"/>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      title: `TAX PH | Philippines Tax Calculator`,
      description: 'TAX PH is designed to help Filipino employees understand the breakdown of their taxes and how it is calculated.',
      pageUrl: 'https://tax-ph.com',
      imageUrl: 'https://tax-ph.com/logo.png',
      imageType: 'image/png',
      imageWidth: '200',
      imageHeight: '200',
      imageAlt: 'TAX PH',
      twiiterCardType: 'summary',
    }
  },

  metaInfo() {
    return {
      title: `${this.title}`,
      meta: [
        // Regular Meta Info
        { name: 'description', content: `${this.description}` },

        // OpenGraph Meta Info (Most widely used, e.g. Facebook)
        { property: 'og:title', content: `${this.title}` },
        { property: 'og:url', content: `${this.pageUrl}` },
        { property: 'og:description', content: `${this.description}` },
        { property: 'og:image', content: `${this.imageUrl}` },
        { property: 'og:image:type', content: `${this.imageType}` },
        { property: 'og:image:width', content: `${this.imageWidth}` },
        { property: 'og:image:height', content: `${this.imageHeight}` },
        { property: 'og:image:alt', content: `${this.imageAlt}` },

        // Google+ Meta Info
        { itemprop: 'name', content: `${this.title}` },
        { itemprop: 'description', content: `${this.description}` },
        { itemprop: 'image', content: `${this.imageUrl}` },

        // Twitter Meta Info
        { name: 'twitter:title', content: `${this.title}` },
        { name: 'twitter:description', content: `${this.description}` },
        { name: 'twitter:url', content: `${this.pageUrl}` },
        { name: 'twitter:card', content: `${this.twiiterCardType}` },
        { name: 'twitter:image', content: `${this.imageUrl}` },
        { name: 'twitter:image:alt', content: `${this.imageAlt}` },
      ],
      link: [{ rel: 'canonical', href: `${this.pageUrl}` }],
    }
  }
}
</script>