/* ============================================
   i18n.js - 辛巳学习日志网 国际化管理
   语言管理文件，通过 content/*.json 获取内容
   ============================================ */

var I18n = (function() {
  'use strict';

  // 当前语言
  var currentLang = 'zh';

  // 内容数据缓存
  var data = { zh: null, en: null };

  // UI 文本（不在 content JSON 中管理的文本）
  var ui = {
    zh: {
      scrollDown: '了解更多',
      nav: { home: '首页', about: '关于我', friends: '友联', sites: '网站导航', contact: '联系方式' }
    },
    en: {
      scrollDown: 'Learn More',
      nav: { home: 'Home', about: 'About', friends: 'Links', sites: 'Sites', contact: 'Contact' }
    }
  };

  // 初始化
  function init() {
    var saved = localStorage.getItem('lang');
    if (saved) {
      currentLang = saved;
    } else {
      var navLang = navigator.language || navigator.userLanguage;
      currentLang = navLang.startsWith('zh') ? 'zh' : 'en';
    }
  }

  // 加载内容 JSON
  function load(callback) {
    Promise.all([
      fetch('content/zh.json').then(function(r) { return r.json(); }),
      fetch('content/en.json').then(function(r) { return r.json(); })
    ]).then(function(res) {
      data.zh = res[0];
      data.en = res[1];
      if (callback) callback();
    }).catch(function(e) {
      console.error('Content load failed:', e);
    });
  }

  // 获取内容（支持路径如 'profile.name'）
  function t(path) {
    var en = _get(data.en, path);
    var zh = _get(data.zh, path);
    if (currentLang === 'zh') return zh != null ? zh : en;
    return en != null ? en : zh;
  }

  // 获取 UI 文本
  function uiText(path) {
    var parts = path.split('.');
    var result = ui[currentLang];
    for (var i = 0; i < parts.length; i++) {
      if (result && result[parts[i]] != null) {
        result = result[parts[i]];
      } else {
        return null;
      }
    }
    return result;
  }

  // 对象属性访问
  function _get(obj, path) {
    if (!obj) return null;
    return path.split('.').reduce(function(o, k) {
      return o && o[k] != null ? o[k] : null;
    }, obj);
  }

  // 切换语言
  function toggle() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    localStorage.setItem('lang', currentLang);
    return currentLang;
  }

  // 设置语言
  function set(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  // 获取当前语言
  function get() {
    return currentLang;
  }

  // 更新 HTML lang 属性
  function updateHtmlLang() {
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  }

  // 公开接口
  return {
    init: init,
    load: load,
    t: t,
    uiText: uiText,
    toggle: toggle,
    set: set,
    get: get,
    updateHtmlLang: updateHtmlLang,
    get data() { return data; }
  };

})();
