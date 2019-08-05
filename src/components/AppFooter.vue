<template>
  <footer class="uk-section uk-section-small">
    <div class="uk-container">
      <div class="uk-text-center">
        Share it on:
      </div>
      <div class="uk-text-center uk-margin-small-top">
        <social-sharing url="https://tax-ph.com" inline-template>
          <div>
            <network network="facebook">
            <i class="fab fa-facebook-square fa-2x"></i>&nbsp;&nbsp;
            </network>
            <network network="twitter">
              <i class="fab fa-twitter-square fa-2x"></i>&nbsp;&nbsp;
            </network>
            <network network="pinterest">
              <i class="fab fa-pinterest-square fa-2x"></i>&nbsp;&nbsp;
            </network>
            <network network="linkedin">
              <i class="fab fa-linkedin fa-2x"></i>&nbsp;&nbsp;
            </network>
          </div>
        </social-sharing>
      </div>

      <p class="uk-text-small uk-text-center">
        <span uk-icon="code"></span>
        with
        <span uk-icon="heart"></span>
        by
        <a href="http://jioo.github.io" rel="noreferrer" title="Justine Joshua Quiazon" target="_blank">
          Justine Joshua Quiazon
        </a>
        &copy;
        {{ new Date().getFullYear() }}
      </p>
    </div>
  </footer>
</template>

<style>
  .fab {
    cursor: pointer;
  }

  .fa-facebook-square {
    color: #3b5998;
  }

  .fa-twitter-square {
    color: #1da1f2;  
  }

  .fa-pinterest-square {
    color: #bd081c;  
  }

  .fa-linkedin {
    color: #0077B5;  
  }
</style>
