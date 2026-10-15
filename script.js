// Per il desktop troviamo gli elementi e leggiamo la larghezza
const navigationButton = document.querySelector('.navigation-toggle');
const navigationLabel = document.querySelector('.navigation-label');
const navigationPanel = document.querySelector('.navigation-panel');
const desktopMedia = window.matchMedia('(min-width: 1000px)');
const supportsNavigation = 'popover' in HTMLElement.prototype &&
  CSS.supports('top', 'anchor(bottom)') &&
  CSS.supports('width', 'anchor-size(width)');

// Scegliamo la modalità di navigazione al caricamento (il popover funziona già in HTML)
function updateNavigationLabel() {
  const text = navigationPanel.matches(':popover-open') ? 'Chiudi menu' : 'Apri menu';
  navigationButton.setAttribute('aria-label', text);
  navigationLabel.textContent = text;
}
function updateNavigationLayout() {
  if (desktopMedia.matches) { // Siamo su desktop, disattiva il popover!
    navigationButton.removeAttribute('popovertarget');
    navigationPanel.removeAttribute('popover');
    navigationButton.hidden = true;
  } else { // Non siamo su desktop, riattiva il popover!
    navigationPanel.setAttribute('popover', 'auto');
    navigationButton.setAttribute('popovertarget', navigationPanel.id);
    navigationButton.hidden = false;
  }
  updateNavigationLabel();
}
if (supportsNavigation) {
  navigationPanel.addEventListener('toggle', updateNavigationLabel);
  updateNavigationLayout();
} else {
 
  navigationButton.removeAttribute('popovertarget');
  navigationPanel.removeAttribute('popover');
  navigationButton.hidden = true;
}


navigationPanel.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  if (supportsNavigation && navigationPanel.matches(':popover-open')) navigationPanel.hidePopover();

});
document.querySelector('.skip-link').addEventListener('click', function () {
  document.querySelector('#top').focus();
});

desktopMedia.addEventListener('change', function () {
  if (!supportsNavigation) return;
  const focused = document.activeElement;
  const focusInNavigation = navigationPanel.contains(focused);
  const focusOnButton = focused === navigationButton;
  updateNavigationLayout();
  if (desktopMedia.matches && focusInNavigation) focused.focus();
  else if (desktopMedia.matches && focusOnButton) navigationPanel.querySelector('a').focus();
  else if (!desktopMedia.matches && focusInNavigation) navigationButton.focus();
});
 document.addEventListener('DOMContentLoaded', () => {
  const tabItems = document.querySelectorAll('.breakdownTabs-item');
  const images = document.querySelectorAll('.breakdownTabs-image');
  

  const caseStudySection = document.querySelector('.casestudy-section');
  if (caseStudySection) {
    caseStudySection.classList.add('breakdownTabs-ready');
  }

  tabItems.forEach((item, index) => {
    const button = item.querySelector('.breakdownTabs-button');
    
    if (button) {
      button.addEventListener('click', () => {
    
        tabItems.forEach(el => el.classList.remove('is-selected'));
        images.forEach(img => img.setAttribute('hidden', 'true'));
        
    
        item.classList.add('is-selected');
   
        if (images[index]) {
          images[index].removeAttribute('hidden');
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {


  const tabItems = document.querySelectorAll('.breakdownTabs-item');
  const images = document.querySelectorAll('.breakdownTabs-image');
  
  const caseStudySection = document.querySelector('.casestudy-section');
  if (caseStudySection) {
    caseStudySection.classList.add('breakdownTabs-ready');
  }

  tabItems.forEach((item, index) => {
    const button = item.querySelector('.breakdownTabs-button');
    
    if (button) {
      button.addEventListener('click', () => {
        tabItems.forEach(el => el.classList.remove('is-selected'));
        images.forEach(img => img.setAttribute('hidden', 'true'));
        
        item.classList.add('is-selected');
        
        if (images[index]) {
          images[index].removeAttribute('hidden');
        }
      });
    }
  });


  const navLinks = document.querySelectorAll('.navigation-panel a');
  const navPanel = document.getElementById('navigation-panel');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      
      const targetId = link.getAttribute('href');
      
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        
       
        let targetElement = document.querySelector(targetId);
        
        
        if (!targetElement && targetId === '#case-study') {
          targetElement = document.querySelector('#casestudy');
        }

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
      if (navPanel && typeof navPanel.hidePopover === 'function' && navPanel.matches(':popover-open')) {
        navPanel.hidePopover();
      }
    });
  });
});