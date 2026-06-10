var activePanel = null;
    function closeAllPanels(){ if(activePanel){ document.getElementById(activePanel).classList.remove('show'); activePanel=null; } }
    function toggleNotify(){ var p=document.getElementById('notifyPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='notifyPanel'; } }
    function toggleSecurity(){ var p=document.getElementById('securityPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='securityPanel'; } }
    function toggleSettings(){ var p=document.getElementById('settingsPanel'); var o=p.classList.contains('show'); closeAllPanels(); if(!o){ p.classList.add('show'); activePanel='settingsPanel'; } }
    function switchNotifyTab(t){ var tabs=t.parentElement.querySelectorAll('.hp-tab'); tabs.forEach(function(x){x.classList.remove('active');}); t.classList.add('active'); }
    document.addEventListener('click',function(e){ if(activePanel&&!e.target.closest('.hdr-panel')&&!e.target.closest('.act-btn')){ closeAllPanels(); } });

    function navigateTo(page) {
        var map = {
            'dashboard':'dashboard.html','host-manage':'host-manage.html',
            'video-audit':'video-audit.html','certification':'certification.html',
            'gift-manage':'gift-manage.html','monitor':'monitor.html',
            'finance':'finance.html','data-report':'data-report.html',
            'user-manage':'user-manage.html','settings':'settings.html',
            'logs':'logs.html','task-manage':'task-manage.html',
            'level-manage':'level-manage.html'
        };
        var target = map[page];
        if (target) { window.location.href = target; }
    }
    function showToast(msg) {
        var t = document.getElementById('toast');
        t.textContent = msg; t.classList.add('show');
        setTimeout(function(){ t.classList.remove('show'); }, 2000);
    }