function showToast(msg) {
        const t=document.getElementById('toast');
        t.textContent=msg; t.classList.add('show');
        setTimeout(()=>t.classList.remove('show'),2000);
    }
    function login() {
        const user=document.getElementById('username').value.trim();
        const pwd=document.getElementById('password').value.trim();
        if(!user||!pwd) { showToast('请输入用户名和密码'); return; }
        showToast('登录成功，正在跳转...');
        setTimeout(()=>window.location.href='dashboard.html',800);
    }