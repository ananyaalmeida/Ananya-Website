const book = document.getElementById('myBook');
const layerCover = document.getElementById('layerCover');
const indicator = document.getElementById('clickMeIndicator');

// Sequence mapping array - updated to cleanly account for the new video page step
const pageOrder = [
    { name: 'about', id: 'layerAbout' },
    { name: 'wherefrom', id: 'layerWhereFrom' },
    { name: 'education', id: 'layerEducation' },
    { name: 'experience', id: 'layerExperience' },
    { name: 'projects', id: 'layerProjects' },
    { name: 'leadership', id: 'layerLeadership' },
    { name: 'hobbies', id: 'layerHobbies' },        // Shows Journaling & Reading on Left
    { name: 'videomaking', id: 'layerBase' },       // Front face shows Video Making on Right
    { name: 'contact', id: 'layerBase' }          // Flipping over layerBase displays Back Cover
];

book.addEventListener('click', (e) => {
    
    // 1. Handling Main Navigation Clicks
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
    
    // 2. Handling specific "Back to About Me" step-back click inside the sub-flow
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

    // 3. Smooth Staggered "Back to Main Menu" Page Turns
    if (e.target.classList.contains('back-to-menu-btn')) {
        // Find which physical layer panels are flipped open
        const uniqueFlippedIds = new Set();
        pageOrder.forEach(page => {
            if (document.getElementById(page.id).classList.contains('flipped')) {
                uniqueFlippedIds.add(page.id);
            }
        });

        // Convert the unique sheet IDs to an ordered array and reverse it
        const panelsToClose = Array.from(uniqueFlippedIds).reverse();

        panelsToClose.forEach((panelId, index) => {
            setTimeout(() => {
                const el = document.getElementById(panelId);
                el.classList.remove('flipped');
                
                // Return sheet depth profile smoothly
                const originalIndex = pageOrder.findIndex(p => p.id === panelId);
                el.style.zIndex = 20 - originalIndex; 
            }, index * 90); 
        });
        return;
    }
    
    // 4. Handling Core Cover Opening
    const activeInnerTabs = document.querySelectorAll('.page-panel.flipped:not(#layerCover)');
    if (activeInnerTabs.length === 0) {
        if (book.classList.contains('open') && !e.target.closest('#layerCover')) return;

        // CRITICAL CHECK: If the user clicked the image or its frame, do absolutely nothing here!
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

// --- DEDICATED EXTRACTED CLICK TO PREVENT OVERLAPPING BLOCKERS ---
document.addEventListener("DOMContentLoaded", () => {
    // FIXED: Corrected selector targeting #layerHobbies instead of #layerLeadership
    const hcPhotoFrame = document.querySelector("#layerHobbies .photo-placeholder.large-frame");
    
    if (hcPhotoFrame) {
        hcPhotoFrame.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open("https://www.instagram.com/hcrutgers/", "_blank");
        });
    }
});