function toggleSidebar(){document.querySelector('.sidebar').classList.toggle('open');}
    var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

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
    // 新增弹窗
    function openAddModal() {
        document.getElementById('addModal').classList.add('show');
        document.getElementById('add-nickname').focus();
    }
    function closeAddModal() {
        document.getElementById('addModal').classList.remove('show');
    }
    function submitAdd() {
        var name = document.getElementById('add-nickname').value.trim();
        var cat = document.getElementById('add-category').value;
        var contact = document.getElementById('add-contact').value.trim();
        if (!name) { showToast('请输入主播昵称'); return; }
        if (!cat) { showToast('请选择主播分类'); return; }
        showToast('主播 "' + name + '" 添加成功');
        closeAddModal();
        // 清空表单
        document.getElementById('add-nickname').value = '';
        document.getElementById('add-contact').value = '';
        document.getElementById('add-fans').value = '0';
        document.getElementById('add-intro').value = '';
    }
    // 查看面板
    function viewHost(btn) {
        var row = btn.closest('tr');
        var hostCell = row.querySelector('.host-cell');
        var name = hostCell.querySelector('.h-name').textContent;
        var id = hostCell.querySelector('.h-id').textContent;
        var avatarEl = hostCell.querySelector('.h-avatar');
        var avatarStyle = avatarEl.getAttribute('style');
        var avatarChar = avatarEl.textContent.trim();
        var cells = row.querySelectorAll('td');
        var category = cells[2].textContent.trim();
        var fans = cells[3].textContent.trim();
        var income = cells[4].textContent.trim();
        var duration = cells[5].textContent.trim();
        var statusHtml = cells[6].querySelector('.status-tag').textContent.trim();
        var statusClass = cells[6].querySelector('.status-tag').classList.contains('live') ? 'live' :
                         cells[6].querySelector('.status-tag').classList.contains('online') ? 'online' :
                         cells[6].querySelector('.status-tag').classList.contains('banned') ? 'banned' : 'offline';
        var statusMap = {live:{lbl:'直播中',color:'#FF4D6D'},online:{lbl:'在线',color:'#00D9FF'},offline:{lbl:'离线',color:'rgba(255,255,255,0.4)'},banned:{lbl:'已封禁',color:'#FF4444'}};
        var st = statusMap[statusClass] || statusMap['offline'];
        var pct = duration.replace('h',''); if (pct > 200) pct = 200;
        var barW = Math.min(100, (pct / 200) * 100);
        document.getElementById('viewOverlay').classList.add('show');
        document.getElementById('view-body').innerHTML = `
            <div class="vp-avatar-block">
                <div class="vp-avatar" style="${avatarStyle}">${avatarChar}</div>
                <div class="vp-name">${name}</div>
                <div class="vp-id">${id}</div>
                <span class="status-tag ${statusClass}" style="margin-top:8px;display:inline-flex;">● ${st.lbl}</span>
            </div>
            <div class="info-grid">
                <div class="info-item"><div class="info-lbl">分类</div><div class="info-val blue">${category}</div></div>
                <div class="info-item"><div class="info-lbl">粉丝数</div><div class="info-val">${fans}</div></div>
                <div class="info-item"><div class="info-lbl">本月收益</div><div class="info-val gold">${income}</div></div>
                <div class="info-item"><div class="info-lbl">本月直播时长</div><div class="info-val">${duration}</div></div>
            </div>
            <div class="vp-section">
                <div class="vp-section-title">直播时长统计</div>
                <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.3);margin-bottom:4px;"><span>本月 ${barW}%</span><span>上限 200h</span></div>
                <div class="vp-chart-bar"><div class="fill" style="width:${barW}%;"></div></div>
            </div>
            <div class="vp-actions">
                <button class="btn btn-primary" style="flex:1;" onclick="showToast('已发送站内消息');closeViewPanel();">✉ 发送消息</button>
                <button class="btn btn-secondary" style="flex:1;" onclick="closeViewPanel();editHost(null);">✎ 编辑信息</button>
            </div>
        `;
    }
    function closeViewPanel() {
        document.getElementById('viewOverlay').classList.remove('show');
    }
    function editHost(btn) {
        if (btn && btn.closest('tr')) {
            var hostCell = btn.closest('tr').querySelector('.h-name');
            if (hostCell) {
                document.getElementById('add-nickname').value = hostCell.textContent.replace(/[🎵🎮🌺🌟👑🎸⚠]/g,'').trim();
            }
        }
        document.getElementById('addModal').classList.add('show');
    }
    // 点击模态背景关闭弹窗
    document.getElementById('addModal').addEventListener('click', function(e){
        if (e.target === this) closeAddModal();
    });