function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

    function addGift() {
        document.getElementById('giftModal').classList.add('show');
        document.getElementById('gm-name').focus();
    }
    function closeGiftModal() {
        document.getElementById('giftModal').classList.remove('show');
    }
    function submitGift() {
        var name = document.getElementById('gm-name').value.trim();
        var cat = document.getElementById('gm-category').value;
        var price = document.getElementById('gm-price').value;
        if (!name) { showToast('请输入道具名称'); return; }
        if (!cat) { showToast('请选择道具分类'); return; }
        if (!price || parseFloat(price) <= 0) { showToast('请输入有效价格'); return; }
        showToast('道具 "' + name + '" 添加成功');
        closeGiftModal();
        document.getElementById('gm-name').value = '';
        document.getElementById('gm-price').value = '';
        document.getElementById('gm-sort').value = '0';
        document.getElementById('gm-desc').value = '';
    }
    var giftIcons = ['🌹','💎','🚀','👑','🎉','🏆','💝','🌟','🎵','🌈','⚡','🔥'];
    var giftIconIdx = 0;
    function changeGiftIcon() {
        giftIconIdx = (giftIconIdx + 1) % giftIcons.length;
        document.getElementById('gm-icon-preview').innerHTML = giftIcons[giftIconIdx] + '<br><span style="font-size:11px;color:rgba(255,255,255,0.3);margin-top:4px;">点击更换</span>';
    }
    document.getElementById('giftModal').addEventListener('click', function(e){
        if (e.target === this) closeGiftModal();
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