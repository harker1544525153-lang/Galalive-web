function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

    /**
     * 切换设置标签页
     * @param {HTMLElement} el - 当前点击的标签元素
     * @param {number} idx - 面板索引（0~4）
     */
    function switchTab(el, idx) {
        // 切换标签高亮
        document.querySelectorAll('.settings-tab').forEach(function(t) { t.classList.remove('active'); });
        el.classList.add('active');
        // 切换面板显示
        document.querySelectorAll('.settings-panel').forEach(function(p) { p.classList.add('hidden'); });
        document.getElementById('panel' + idx).classList.remove('hidden');
    }

    /**
     * 轻提示 Toast
     * @param {string} msg - 提示消息
     */
    function showToast(msg) {
        var t = document.getElementById('toast');
        t.textContent = msg + ' ✅';
        t.style.opacity = '1';
        setTimeout(function() { t.style.opacity = '0'; }, 2000);
    }

    /**
     * 导航到指定页面
     * @param {string} page - 页面名称
     */
    function navigateTo(page) {
        const pageMap = {
            dashboard: 'dashboard.html',
            'host-manage': 'host-manage.html',
            'video-audit': 'video-audit.html',
            certification: 'certification.html',
            'gift-manage': 'gift-manage.html',
            monitor: 'monitor.html',
            finance: 'finance.html',
            'data-report': 'data-report.html',
            'user-manage': 'user-manage.html',
            settings: 'settings.html',
            logs: 'logs.html',
            'level-manage': 'level-manage.html',
            'task-manage': 'task-manage.html'
        };
        const target = pageMap[page];
        if (target) {
            window.location.href = target;
        } else {
            showToast('页面开发中...');
        }
    }