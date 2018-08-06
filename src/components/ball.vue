<template>
  <div style="position: fixed;z-index: 10000;">
    <div class="ball" v-bind:style="{ top: aTop + 'px', left: aLeft + 'px' }">
      <img class="ball_inside" :src="ballImg">
    </div>
  </div>
</template>

<script>
  import ElClassUtil from "@/util/ElClassUtil.js";
  import ValueAnimator from "@/util/ValueAnimator.js";

  export default {
    name: "ball",
    data() {
      return {
        aTop: 500,
        aLeft: 100,
        el: null,
        aOpacity: 0.9,
        ballImg: require('@/assets/ball/ball_ball_normal.png')
      };
    },
    mounted() {
      this.el = document.querySelector(".ball");
      this.aTop = window.innerHeight / 2;
      this.aLeft = (window.innerWidth - this.el.offsetWidth);
      this.bindTouchEvent();
    },
    methods: {
      /**
       * 绑定touch事件
       */
      bindTouchEvent() {
        this.el.addEventListener('touchstart', this._touchStart);

        this.el.addEventListener('touchmove', this._touchMove);

        this.el.addEventListener('touchend', this._touchEnd);

        this.el.addEventListener('click', this._click)
      },

      _touchStart(e) {
        let touch = e.changedTouches[0];
        this.aOpacity = 0.5;
        this.ballImg = require('@/assets/ball/ball_ball_select.png')
        ElClassUtil.addClass(this.el, 'animated pulse')
      },
      _touchMove(e) {
        e.preventDefault()
        let touch = e.changedTouches[0];
        this.aLeft = touch.clientX - this.el.offsetWidth / 2;
        this.aTop = touch.clientY - this.el.offsetHeight / 2;
        this.fixBallPos();
      },
      fixBallPos() {
        if (this.aLeft >= (window.innerWidth - this.el.offsetWidth)) {
          this.aLeft = (window.innerWidth - this.el.offsetWidth)
        }
        if (this.aLeft < 0) {
          this.aLeft = 0
        }
        if (this.aTop >= (window.innerHeight - this.el.offsetHeight)) {
          this.aTop = (window.innerHeight - this.el.offsetHeight)
        }
        if (this.aTop < 0) {
          this.aTop = 0
        }
      },
      _touchEnd(e) {
        let touch = e.changedTouches[0];
        this.aOpacity = 0.9;
        ElClassUtil.removeClass(this.el, 'animated pulse')
        this.ballImg = require('@/assets/ball/ball_ball_normal.png')

        let left = 0;
        if (this.aLeft + this.el.offsetWidth / 2 < window.innerWidth / 2) {
          left = 0;
        } else {
          left = window.innerWidth - this.el.offsetWidth;
        }

        let valueAnimator = ValueAnimator();
        valueAnimator.setDuration(50);
        valueAnimator.ofValue(this.aLeft, left, (value) => {
          this.aLeft = value;
        });
      },
      _click(e) {
        this.$router.go(-1)
      }
    }

  }


</script>

<style scoped>
  .ball {
    width: 11vw;
    height: 11vw;
    position: absolute;
    display: block;
  }

  .ball_inside {
    width: 100%;
    height: 100%;
    position: absolute;
  }

</style>
