/**
 * @author guhaibo
 * @date 2018/6/30
 */

export default function () {
  let ValueAnimator = {
    duration: 50,
    /**
     * 设置延时
     * @param duration
     */
    setDuration(duration) {
      this.duration = duration;
    },
    /**
     * 执行动画
     * @param from
     * @param to
     * @param callBack
     */
    ofValue(from, to, callBack) {
      if (from < to) {
        let delta = (to - from) / this.duration
        let anim = setInterval(() => {
          if (from < to) {
            from += delta;
            callBack(from);
          } else {
            callBack(to);
            clearInterval(anim)
          }
        }, 1);
      } else {
        let delta = (from - to) / this.duration
        let anim = setInterval(() => {
          if (from > to) {
            from -= delta;
            callBack(from);
          } else {
            callBack(to);
            clearInterval(anim)
          }
        }, 1);
      }
    }
  };
  return ValueAnimator;
}
