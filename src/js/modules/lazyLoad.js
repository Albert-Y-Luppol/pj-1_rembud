module.exports = function (){
    'use strict'

    if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName) window.addEventListener('load', function() {

        // start
        let pItems = Array.from(document.querySelectorAll('img[data-src]')), timer;
    
        window.addEventListener('scroll', scroller, false);
        window.addEventListener('resize', scroller, false);
        inView();
    
    
        // throttled scroll/resize
        function scroller(e) {
    
        timer = timer || setTimeout(function() {
            timer = null;
            requestAnimationFrame(inView);
        }, 300);
    
        }
    
    
        // image in view?
        function inView() {
    
        var wT = window.pageYOffset, wB = wT + window.innerHeight, cRect, pT, pB, p = 0;
        while (p < pItems.length) {
    
            cRect = pItems[p].getBoundingClientRect();
            pT = wT + cRect.top;
            pB = pT + cRect.height;

            if (wT < pB && wB > pT) {
                loadFullImage(pItems[p]);
                pItems.splice(p, 1);
            } else p++;
    
        }
    
        }
    
    
        // replace with full image
        function loadFullImage(item) {
    
            if (!item || !(item.dataset.src || item.dataset.srcset)) return;
        
            // load image
            let img = new Image();
            if (item.dataset.srcset) {
                img.srcset = item.dataset.srcset;
            } else {
                img.src = item.dataset.src;
            }
            
            img.className = item.className;
            img.alt = item.alt;
            if (img.complete) addImg();
            else img.onload = addImg;
        
            // replace image
            function addImg() {
        
                // disable click
                item.addEventListener('click', function(e) { e.preventDefault(); }, false);
        
                // add full image
                item.before(img);

                //remove preload  
                item.remove();
            }
        
        }
  
    }, false);
}