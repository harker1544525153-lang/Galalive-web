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
    // 认证查看弹窗
    function viewCert(btn) {
        var card = btn.closest('.cert-card');
        var name = card.querySelector('.c-name').textContent;
        var id = card.querySelector('.c-id').textContent;
        var avatarEl = card.querySelector('.c-avatar');
        var avatarStyle = avatarEl.getAttribute('style');
        var avatarChar = avatarEl.textContent.trim();
        var rows = card.querySelectorAll('.cert-detail .row');
        var details = {};
        rows.forEach(function(r){
            var lbl = r.querySelector('.lbl').textContent;
            var val = r.querySelector('.val').textContent;
            details[lbl] = val;
        });
        document.getElementById('certModalBody').innerHTML = `
            <div class="cert-user-block">
                <div class="cu-avatar" style="${avatarStyle}">${avatarChar}</div>
                <div>
                    <div class="cu-name">${name}</div>
                    <div class="cu-id">${id}</div>
                </div>
                <span class="c-status pending" style="margin-left:auto;">待审核</span>
            </div>
            <div class="cert-form-row">
                <div class="cert-form-field"><div class="cf-label">真实姓名</div><div class="cf-value">${details['真实姓名']||'-'}</div></div>
                <div class="cert-form-field"><div class="cf-label">证件类型</div><div class="cf-value">${details['证件类型']||'-'}</div></div>
                <div class="cert-form-field"><div class="cf-label">证件号码</div><div class="cf-value">${'****'.repeat(4)}</div></div>
            </div>
            <div class="cert-form-row">
                <div class="cert-form-field"><div class="cf-label">申请时间</div><div class="cf-value">${details['申请时间']||'-'}</div></div>
                <div class="cert-form-field"><div class="cf-label">认证类型</div><div class="cf-value">${details['认证类型']||'-'}</div></div>
                <div class="cert-form-field"><div class="cf-label">审核状态</div><div class="cf-value" style="color:#FFD700;">待审核</div></div>
            </div>
            <div class="cert-form-row">
                <div class="cert-form-field"><div class="cf-label">身份证正面</div><div class="cert-img-placeholder">📄 身份证正面照片</div></div>
                <div class="cert-form-field"><div class="cf-label">身份证反面</div><div class="cert-img-placeholder">📄 身份证反面照片</div></div>
            </div>
            <div class="cert-form-row">
                <div class="cert-form-field"><div class="cf-label">手持证件照</div><div class="cert-img-placeholder">📸 手持证件照片</div></div>
            </div>
        `;
        document.getElementById('certModalFooter').innerHTML = `
            <button class="btn btn-secondary" onclick="closeCertModal()">关闭</button>
            <button class="btn btn-secondary" style="color:#FF4444;border-color:rgba(255,68,68,0.2);background:rgba(255,68,68,0.1);" onclick="showToast('已拒绝');closeCertModal();">✕ 拒绝</button>
            <button class="btn btn-primary" style="background:#00D9FF;" onclick="showToast('已通过');closeCertModal();">✓ 通过</button>
        `;
        document.getElementById('certModal').classList.add('show');
    }
    function closeCertModal() {
        document.getElementById('certModal').classList.remove('show');
    }
    document.getElementById('certModal').addEventListener('click', function(e){
        if (e.target === this) closeCertModal();
    });