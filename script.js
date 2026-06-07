const book = document.getElementById('myBook');
const layerCover = document.getElementById('layerCover');
const indicator = document.getElementById('clickMeIndicator');

const pageOrder = [
    { name: 'about', id: 'layerAbout' },
    { name: 'wherefrom', id: 'layerWhereFrom' },
    { name: 'education', id: 'layerEducation' },
    { name: 'experience', id: 'layerExperience' },
    { name: 'projects', id: 'layerProjects' },
    { name: 'leadership', id: 'layerLeadership' },
    { name: 'hobbies', id: 'layerHobbies' },        
    { name: 'videomaking', id: 'layerBase' },       
    { name: 'contact', id: 'layerBase' }          
];

book.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('nav-btn')) {
        const targetSectionName = e.target.getAttribute('data-target');
        const targetIndex = pageOrder.findIndex(p => p.name === targetSectionName);
        
        if (targetIndex !== -1) {
            pageOrder.forEach((page, index) => {
                const el = document.getElementById(page.id);
                if (index <= targetIndex) {
                    el.classList.add('flipped');
                    el.style.zIndex = 25 + index; 
                } else {
                    el.classList.remove('flipped');
                    el.style.zIndex = 20 - index; 
                }
            });
        }
        return;
    }
    
    if (e.target.classList.contains('back-to-about-btn')) {
        const layerWhereFrom = document.getElementById('layerWhereFrom');
        const layerEducation = document.getElementById('layerEducation');
        
        layerWhereFrom.classList.remove('flipped');
        layerEducation.classList.remove('flipped');
        
        const whereFromIndex = pageOrder.findIndex(p => p.id === 'layerWhereFrom');
        const educationIndex = pageOrder.findIndex(p => p.id === 'layerEducation');
        
        layerWhereFrom.style.zIndex = 20 - whereFromIndex;
        layerEducation.style.zIndex = 20 - educationIndex;
        return;
    }

    if (e.target.classList.contains('back-to-menu-btn')) {
        const uniqueFlippedIds = new Set();
        pageOrder.forEach(page => {
            if (document.getElementById(page.id).classList.contains('flipped')) {
                uniqueFlippedIds.add(page.id);
            }
        });

        const panelsToClose = Array.from(uniqueFlippedIds).reverse();

        panelsToClose.forEach((panelId, index) => {
            setTimeout(() => {
                const el = document.getElementById(panelId);
                el.classList.remove('flipped');
                
                const originalIndex = pageOrder.findIndex(p => p.id === panelId);
                el.style.zIndex = 20 - originalIndex; 
            }, index * 90); 
        });
        return;
    }
    
    const activeInnerTabs = document.querySelectorAll('.page-panel.flipped:not(#layerCover)');
    if (activeInnerTabs.length === 0) {
        if (book.classList.contains('open') && !e.target.closest('#layerCover')) return;

        if (e.target.closest('.photo-placeholder.large-frame') || e.target.closest('#layerHobbies .face.front')) {
            return;
        }

        book.classList.toggle('open');
        layerCover.classList.toggle('flipped');
        
        if (book.classList.contains('open')) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const hcPhotoFrame = document.querySelector("#layerHobbies .photo-placeholder.large-frame");
    
    if (hcPhotoFrame) {
        hcPhotoFrame.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open("https://www.instagram.com/hcrutgers/", "_blank");
        });
    }
});
