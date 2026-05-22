document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Switcher ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Restore user theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.replace('dark-theme', 'light-theme');
    }

    // --- Ambient Glows Cursor Tracking ---
    const glow1 = document.getElementById('glow-1');
    const glow2 = document.getElementById('glow-2');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Subtle parallax movement of background glows
        glow1.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        glow2.style.transform = `translate(${x * -0.03}px, ${y * -0.03}px)`;
    });

    // --- Interactive Checklist ---
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('checked');
            
            // Re-evaluating dashboard checklist states
            const checkedCount = document.querySelectorAll('.task-item.checked').length;
            const totalCount = taskItems.length;
            const commitCountEl = document.querySelector('#card-commits .stat-value');
            
            // Dynamic micro-animation effect
            if (item.classList.contains('checked')) {
                // Flash the checkmark
                const checkbox = item.querySelector('.checkbox');
                checkbox.style.transform = 'scale(1.2)';
                setTimeout(() => checkbox.style.transform = 'scale(1)', 200);
            }
        });
    });

    // --- Interactive Dashboard Sidebar Navigation ---
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove('active'));
            nav.classList.add('active');
            
            // Create nice ripple/pulse background glow
            const sidebar = document.getElementById('app-sidebar');
            sidebar.style.borderColor = 'rgba(99, 102, 241, 0.4)';
            setTimeout(() => {
                sidebar.style.borderColor = '';
            }, 500);
        });
    });

    // --- Dynamic Chart Bar Clicking Activity ---
    const chartBars = document.querySelectorAll('.bar');
    chartBars.forEach(bar => {
        bar.addEventListener('click', () => {
            chartBars.forEach(b => b.classList.remove('active'));
            bar.classList.add('active');
            
            // Update Repository Views randomly to simulate data load
            const viewsVal = document.querySelector('#card-views .stat-value');
            const randomIncrement = Math.floor(Math.random() * 120) + 30;
            const currentViews = parseInt(viewsVal.textContent.replace(',', ''));
            viewsVal.textContent = (currentViews + randomIncrement).toLocaleString();
            
            // Add flash effect to view count
            viewsVal.style.color = 'var(--accent-blue)';
            viewsVal.style.transform = 'scale(1.05)';
            setTimeout(() => {
                viewsVal.style.color = '';
                viewsVal.style.transform = 'scale(1)';
            }, 300);
        });
    });

    // --- Search Input Interaction ---
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim() !== '') {
            alert(`Searching for: "${searchInput.value}" across premium project space.`);
            searchInput.value = '';
        }
    });

    // --- Interactive Quickstart Button ---
    const btnQuickstart = document.getElementById('btn-quickstart');
    btnQuickstart.addEventListener('click', () => {
        alert('Welcome! Antigravity workspace is initialized. The project files have been created in C:\\Users\\mcy_\\.gemini\\antigravity\\scratch\\premium-app.');
    });

    // --- Notification Icon Click Activity ---
    const notifBadge = document.getElementById('notif-badge');
    notifBadge.addEventListener('click', () => {
        const pulse = notifBadge.querySelector('.pulse');
        if (pulse) {
            pulse.remove(); // Dismiss notifications
            alert('Notifications dismissed.');
        } else {
            // Recreate notification
            const newPulse = document.createElement('span');
            newPulse.className = 'pulse';
            notifBadge.appendChild(newPulse);
            alert('New workspace updates are available!');
        }
    });
});
