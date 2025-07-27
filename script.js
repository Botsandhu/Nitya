let highestZ = 1;

const audio = new Audio('music.mp3');
audio.loop = true;
audio.volume = 0.5;
window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(() => {
    // Autoplay might be blocked; wait for user interaction
    document.body.addEventListener('click', () => audio.play(), { once: true });
  });
});
class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if(!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX*dirX+dirY*dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if(this.rotating) {
        this.rotation = degrees;
      }

      if(this.holdingPaper) {
        if(!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    })

    paper.addEventListener('mousedown', (e) => {
      if(this.holdingPaper) return; 
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if(e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if(e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

const shadows = [
        '0 0 8px #FF3CAC, 0 0 16px #784BA0, 0 0 24px #2B86C5, 0 0 32px #42E695',
        '0 0 8px #F7971E, 0 0 16px #FFD200, 0 0 24px #21D4FD, 0 0 32px #B721FF',
        '0 0 8px #F953C6, 0 0 16px #B91D73, 0 0 24px #43E97B, 0 0 32px #38F9D7',
        '0 0 8px #FF6A00, 0 0 16px #EE0979, 0 0 24px #FF61A6, 0 0 32px #16A085',
        '0 0 8px #00F2FE, 0 0 16px #4FACFE, 0 0 24px #43E97B, 0 0 32px #38F9D7',
        '0 0 8px #F7971E, 0 0 16px #FFD200, 0 0 24px #21D4FD, 0 0 32px #B721FF',
        '0 0 8px #F953C6, 0 0 16px #B91D73, 0 0 24px #43E97B, 0 0 32px #38F9D7',
        '0 0 8px #FF6A00, 0 0 16px #EE0979, 0 0 24px #FF61A6, 0 0 32px #16A085'
      ];
      let idx = 0;
      setInterval(() => {
        document.querySelector('.rainbow-shadow').style.textShadow = shadows[idx];
        idx = (idx + 1) % shadows.length;
      }, 200);