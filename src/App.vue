<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      title: `${new Date().getFullYear()} Philippines Tax Calculator`,
      description: '',
      pageUrl: 'https://www.tax-ph.com',
      imageUrl: 'https://www.tax-ph.com/img/logo-200x200.png',
      imageType: 'image/png',
      imageWidth: '200',
      imageHeight: '200',
      imageAlt: 'Jio',
      twiiterCardType: 'summary',
    };
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
    };
  }
};
</script>