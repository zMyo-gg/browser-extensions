const extensions = [
    {
        id: 1,
        name: 'Devlens',
        description: 'Quickly inspect page layouts and visualize element boundaries',
        icon: './assets/images/logo-devlens.svg',
        isActive: true
    },
    {
        id: 2,
        name: 'StyleSpy',
        description: 'Instantly analyze and copy CSS from any webpage element.',
        icon: './assets/images/logo-style-spy.svg',
        isActive: true
    },
    {
        id: 3,
        name: 'SpeedBoost',
        description: 'Optimizes browser resource usage to accelerate page loading.',
        icon: './assets/images/logo-speed-boost.svg',
        isActive: false
    },
    {
        id: 4,
        name: 'JSONWizard',
        description: 'Formats, validates, and prettifies JSON responses in-browser.',
        icon: './assets/images/logo-json-wizard.svg',
        isActive: true
    },
    {
        id: 5,
        name: 'TabMaster Pro',
        description: 'Organizes browser tabs into groups and sessions.',
        icon: './assets/images/logo-tab-master-pro.svg',
        isActive: true
    },
    {
        id: 6,
        name: 'ViewportBuddy',
        description: 'Simulates various screen resolutions directly within the browser.',
        icon: './assets/images/logo-viewport-buddy.svg',
        isActive: false
    },
    {
        id: 7,
        name: 'Markup Notes',
        description: 'Enables annotation and notes directly onto webpages for collaborative debugging.',
        icon: './assets/images/logo-markup-notes.svg',
        isActive: true
    },
    {
        id: 8,
        name: 'GridGuides',
        description: 'Overlay customizable grids and alignment guides on any webpage.',
        icon: './assets/images/logo-grid-guides.svg',
        isActive: false
    },
    {
        id: 9,
        name: 'Palette Picker',
        description: 'Instantly extracts color palettes from any webpage.',
        icon: './assets/images/logo-palette-picker.svg',
        isActive: true
    },
    {
        id: 10,
        name: 'LinkChecker',
        description: 'Scans and highlights broken links on any page.',
        icon: './assets/images/logo-link-checker.svg',
        isActive: true
    },
    {
        id: 11,
        name: 'DOM Snapshot',
        description: 'Capture and export DOM structures quickly.',
        icon: './assets/images/logo-dom-snapshot.svg',
        isActive: false
    },
    {
        id: 12,
        name: 'ConsolePlus',
        description: 'Enhanced developer console with advanced filtering and logging.',
        icon: './assets/images/logo-console-plus.svg',
        isActive: true
    }
];

let currentFilter = 'all';


const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const filterBtns = document.querySelectorAll('.filter-btn');
const extensionsGrid = document.getElementById('extensionsGrid');


themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-mode');
    const iconSrc = isDark ? './assets/images/icon-sun.svg' : './assets/images/icon-moon.svg';
    const altText = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    
    themeIcon.src = iconSrc;
    themeIcon.alt = altText;
    themeToggle.setAttribute('aria-label', altText);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
    updateThemeIcon();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderExtensions();
    });
});

function renderExtensions() {
    const filtered = getFilteredExtensions();

    if (filtered.length === 0) {
        extensionsGrid.innerHTML = '<div class="empty-state">No extensions found</div>';
        return;
    }

    extensionsGrid.innerHTML = filtered.map(ext => `
        <div class="extension-card" data-id="${ext.id}">
            <div class="extension-header">
                <img src="${ext.icon}" alt="${ext.name}" class="extension-icon" />
                <div>
                    <h3 class="extension-title">${ext.name}</h3>
                    <p class="extension-description">${ext.description}</p>
                </div>
            </div>
            <div class="extension-footer">
                <button class="remove-btn" data-id="${ext.id}">Remove</button>
                <button class="toggle-switch ${ext.isActive ? 'active' : ''}" data-id="${ext.id}" aria-label="Toggle ${ext.name}"></buttom>
            </div>
        </div>
        `).join('');
    
    
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn,addEventListener('click', (e) => removeExtension(e.target.dataset.id));
    });

    document.querySelector('.toggle-switch').forEach(btn => {
        btn.addEventListener('click', (e) => toggleExtension(e.target.dataset.id));
    });
}

function getFilteredExtensions() {
    if (currentFilter === 'all') {
        return extensions;
    } else if (currentFilter === 'active') {
        return extensions.filter(ext => ext.isActive);
    } else{
        return extensions.filter(ext => !ext.isACtive);
    }
}

function removeExtension(id) {
    const index = extensions.findIndex(ext => ext.id === parseInt(id));
    if (index > -1) {
        extensions.splice(index, 1);
        renderExtensions();
    }
}

function toggleExtension(id) {
    const ext = extensions.find(e => e.id === parseInt(id));
    if (ext) {
        ext.isActive = !ext.isActive;
        renderExtensions();
    }
}

loadTheme();
renderExtensions();