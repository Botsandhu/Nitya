let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  touchEndX = 0;
  touchEndY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  tapTimeout = null;
  tapStartTime = 0;
  tapMoved = false;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;

      // Tap detection
      this.tapStartTime = Date.now();
      this.tapMoved = false;
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;
      e.preventDefault();
      this.tapMoved = true;

      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;

      this.velX = this.touchMoveX - this.prevTouchX;
      this.velY = this.touchMoveY - this.prevTouchY;

      if(!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    });

    paper.addEventListener('touchend', (e) => {
      if (!this.holdingPaper) return;
      this.holdingPaper = false;
      this.rotating = false;

      // Tap detection: if touch was short and didn't move
      const tapDuration = Date.now() - this.tapStartTime;
      if (!this.tapMoved && tapDuration < 200) {
        // Move paper sideways (e.g., 200px to the right)
        this.currentPaperX += 200;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    // For two-finger rotation on touch screens
    paper.addEventListener('gesturestart', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
    paper.addEventListener('gestureend', () => {
      this.rotating = false;
    });
  }
}
