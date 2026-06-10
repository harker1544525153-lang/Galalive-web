function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

    function openUserModal() {
        document.getElementById('userModal').classList.add('show');
        document.getElementById('um-username').focus();
    }
    function closeUserModal() {
        document.getElementById('userModal').classList.remove('show');
    }
    function submitUser() {
        var username = document.getElementById('um-username').value.trim();
        var phone = document.getElementById('um-phone').value.trim();
        var password = document.getElementById('um-password').value;
        var password2 = document.getElementById('um-password2').value;
        var level = document.getElementById('um-level').value;
        if (!username) { showToast('请输入用户名'); return; }
        if (!phone) { showToast('请输入手机号'); return; }
        if (!password) { showToast('请输入密码'); return; }
        if (password !== password2) { showToast('两次密码不一致'); return; }
        if (!level) { showToast('请选择用户等级'); return; }
        showToast('用户 "' + username + '" 添加成功');
        closeUserModal();
        document.getElementById('um-username').value = '';
        document.getElementById('um-phone').value = '';
        document.getElementById('um-nickname').value = '';
        document.getElementById('um-email').value = '';
        document.getElementById('um-password').value = '';
        document.getElementById('um-password2').value = '';
    }
    document.getElementById('userModal').addEventListener('click', function(e) {
        if (e.target === this) closeUserModal();
    });
    function showToast(msg) {
        var toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:#fff;padding:12px 24px;border-radius:8px;font-size:14px;z-index:9999;transition:all .3s;opacity:0;';
        toast.textContent = msg;
        document.body.appendChild(toast);
        requestAnimationFrame(function() {
            toast.style.opacity = '1';
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });
        setTimeout(function() {
            toast.style.opacity = '0';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2000);
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