// assets/js/i18n.js

const i18nData = {
    zh: {
        title: "辛巳学习日志网",
        subtitle: "记录每一天的学习历程",
        menu: "目录",
        menuCollapse: "收起目录",
        studyLogHttps: "学习日志网（https，待完善）",
        studyLogHttp: "学习日志网（http）",
        resourceHttps: "资源镜像站（https，待完善）",
        resourceHttp: "资源镜像站（http）",
        birthdayHttps: "生日特别页（https）",
        birthdayHttp: "生日特别页（http）",
        studyPlan: "学习计划",
        studyTip: "每天进步一点点",
        icp: "陇ICP备2024015550号-1",
        footer: "又拍云",
        langSwitch: "English",
    },
    en: {
        title: "Xinsi Study Log",
        subtitle: "Record your daily learning journey",
        menu: "Menu",
        menuCollapse: "Collapse Menu",
        studyLogHttps: "Study Log (https, to be improved)",
        studyLogHttp: "Study Log (http)",
        resourceHttps: "Resource Mirror (https, to be improved)",
        resourceHttp: "Resource Mirror (http)",
        birthdayHttps: "Birthday Special (https)",
        birthdayHttp: "Birthday Special (http)",
        studyPlan: "Study Plan",
        studyTip: "Make a little progress every day",
        icp: "ICP 2024015550-1",
        footer: "UPYUN Cloud",
        langSwitch: "中文",
    }
};

function getLang() {
    const saved = localStorage.getItem('lang');
    if (saved) return saved;
    const lang = navigator.language || navigator.userLanguage;
    return lang.startsWith('zh') ? 'zh' : 'en';
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    renderLang(lang);
}

function renderLang(lang) {
    const d = i18nData[lang];
    // 同步修改 <title> 和 <h1>
    document.title = d.title;
    document.getElementById('i18n-title').textContent = d.title;
    document.getElementById('i18n-subtitle').textContent = d.subtitle;
    document.getElementById('menu-toggle').textContent = '📂 ' + d.menu;
    document.getElementById('i18n-study-plan').textContent = d.studyPlan;
    document.getElementById('i18n-study-tip').textContent = d.studyTip;
    document.getElementById('i18n-icp').textContent = d.icp;
    document.getElementById('i18n-lang-switch').textContent = d.langSwitch;
    // 菜单链接
    document.getElementById('i18n-studylog-https').textContent = d.studyLogHttps;
    document.getElementById('i18n-studylog-http').textContent = d.studyLogHttp;
    document.getElementById('i18n-resource-https').textContent = d.resourceHttps;
    document.getElementById('i18n-resource-http').textContent = d.resourceHttp;
    document.getElementById('i18n-birthday-https').textContent = d.birthdayHttps;
    document.getElementById('i18n-birthday-http').textContent = d.birthdayHttp;
    // footer logo alt
    document.getElementById('footer-logo').alt = d.footer;
}

window.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    renderLang(lang);
    document.getElementById('i18n-lang-switch').onclick = function() {
        const newLang = getLang() === 'zh' ? 'en' : 'zh';
        setLang(newLang);
    };
    // 菜单展开/收起切换
    const menuBtn = document.getElementById('menu-toggle');
    const menuList = document.getElementById('menu-list');
    let menuOpen = false;
    menuBtn.onclick = function() {
        menuOpen = !menuOpen;
        menuList.style.display = menuOpen ? 'flex' : 'none';
        menuBtn.textContent = menuOpen ? '📂 ' + i18nData[getLang()].menuCollapse : '📂 ' + i18nData[getLang()].menu;
    };
    menuList.style.display = 'none';
});
