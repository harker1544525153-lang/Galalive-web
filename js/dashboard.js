function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels() {
        if (activePanel) { document.getElementById(activePanel).classList.remove('show'); activePanel = null; }
    }
    function toggleNotify() {
        var panel = document.getElementById('notifyPanel');
        var isOpen = panel.classList.contains('show');
        closeAllPanels();
        if (!isOpen) { panel.classList.add('show'); activePanel = 'notifyPanel'; }
    }
    function toggleSecurity() {
        var panel = document.getElementById('securityPanel');
        var isOpen = panel.classList.contains('show');
        closeAllPanels();
        if (!isOpen) { panel.classList.add('show'); activePanel = 'securityPanel'; }
    }
    function toggleSettings() {
        var panel = document.getElementById('settingsPanel');
        var isOpen = panel.classList.contains('show');
        closeAllPanels();
        if (!isOpen) { panel.classList.add('show'); activePanel = 'settingsPanel'; }
    }
    function switchNotifyTab(tab, type) {
        var tabs = tab.parentElement.querySelectorAll('.hp-tab');
        tabs.forEach(function(t){t.classList.remove('active');});
        tab.classList.add('active');
    }
    document.addEventListener('click', function(e) {
        if (activePanel && !e.target.closest('.hdr-panel') && !e.target.closest('.act-btn')) {
            closeAllPanels();
        }
    });
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;transition:all 0.3s;opacity:0;transform:translateX(-50%) translateY(-20px);';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        },10);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(),300);
        },2000);
    }
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
            logs: 'logs.html'
        };
        const target = pageMap[page];
        if (target) {
            window.location.href = target;
        } else {
            showToast('页面开发中...');
        }
    }