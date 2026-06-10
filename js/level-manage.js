function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

    function addLevel() {
        document.getElementById('levelModal').classList.add('show');
        document.getElementById('lv-name').focus();
    }
    function closeLevelModal() {
        document.getElementById('levelModal').classList.remove('show');
    }
    function submitLevel() {
        var name = document.getElementById('lv-name').value.trim();
        var level = document.getElementById('lv-level').value;
        var exp = document.getElementById('lv-exp').value;
        if (!name) { showToast('请输入等级名称'); return; }
        if (!level) { showToast('请输入等级编号'); return; }
        if (!exp || parseFloat(exp) < 0) { showToast('请输入有效经验值'); return; }
        showToast('等级 "' + name + '" 添加成功');
        closeLevelModal();
        document.getElementById('lv-name').value = '';
        document.getElementById('lv-level').value = '';
        document.getElementById('lv-exp').value = '';
        document.getElementById('lv-privilege').value = '';
    }
    document.getElementById('levelModal').addEventListener('click', function(e){
        if (e.target === this) closeLevelModal();
    });
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;transition:all 0.3s;opacity:0;transform:translateX(-50%) translateY(-20px);';
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 10);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(-50%) translateY(-20px)';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    function navigateTo(page) {
        const pageMap = {
            dashboard: 'dashboard.html',
            'host-manage': 'host-manage.html',
            'video-audit': 'video-audit.html',
            certification: 'certification.html',
            'gift-manage': 'gift-manage.html',
            'level-manage': 'level-manage.html',
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