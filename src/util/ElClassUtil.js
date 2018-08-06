/**
 * 元素样式修改工具
 * @author guhaibo
 * @date 2018/6/28
 */
let ElClassUtil = {

  /**
   * 判断元素是否有class
   * @param ele
   * @param cls
   * @returns {*}
   */
  hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  },

  /**
   * 元素增加class
   * @param ele
   * @param cls
   */
  addClass(ele, cls) {
    if (!this.hasClass(ele, cls)) ele.className += " " + cls;
  },

  /**
   * 元素移除class
   * @param ele
   * @param cls
   */
  removeClass(ele, cls) {
    if (this.hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, '');
    }
  }
};
export default ElClassUtil
