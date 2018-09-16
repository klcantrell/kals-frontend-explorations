export default function calculatorScripts(){

  function init(){
    buttonHandlers();
    calculator3DBehavior();
  }

  // CALCULATION LOGIC

  let calc = {
    currentNum: '0',
    memory: '',
    evalQueue: '',
    equalsPressed: false,
    opPressed: true,
    procInput: function(input){
                 if (input.classList.contains('clear')) {
                   view.clear();
                 } else if (input.classList.contains('number')) {
                   view.displayNumInput(input);
                 } else {
                   view.displayOpResult(input);
                 }
               },
    procNumInput: function(num){
                    if (this.equalsPressed) {
                      view.clear();
                    }
                    if (this.opPressed) {
                      this.opPressed = false;
                    }
                    if (this.currentNum === '0') {
                      this.currentNum = num;
                    } else {
                      this.currentNum = `${this.currentNum}${num}`;
                    }
                  },
    procOpInput: function(op){
                    if (op === '=') {
                      this.procEqualsPressed();
                    } else {
                      if (!calc.opPressed) {
                        if (op === 'X'){
                          this.procMultPressed(op);
                        } else {
                          this.procSumDiffDiv(op);
                       }
                     }
                   }
                 },
    procEqualsPressed: function(){
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = ``;
                        this.currentNum = this.memory;
                        this.equalsPressed = true;
                      },
    procMultPressed: function(op){
                        if (this.equalsPressed) {
                          this.equalsPressed = false;
                        }
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = `${this.evalQueue} ${this.currentNum}\*`;
                        this.currentNum = '0';
                        this.opPressed = true;
                     },
    procSumDiffDiv: function(op){
                        if (this.equalsPressed) {
                          this.equalsPressed = false;
                        }
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = `${this.evalQueue} ${this.currentNum} ${op}`;
                        this.currentNum = '0';
                        this.opPressed = true;
                     }
  };

  let view = {
    isMobile: (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1),
    calculator: document.querySelector(".object"),
    body: document.querySelector("body"),
    output: document.querySelector("#output"),
    clickables: document.querySelectorAll('.nums-ops p'),
    queue: document.querySelector("#queue"),
    adjustTextSize: function(el){
                      if (calc.memory.toString().length > 17 || calc.currentNum.length > 17) {
                        el.style['font-size'] = '1.2em';
                      } else if (calc.memory.toString().length > 10 || calc.currentNum.length > 10) {
                        el.style['font-size'] = '2em';
                      } else {
                        el.style['font-size'] = '3em';
                      }
                    },
    addCalcListeners: function(clickable){
                        if (this.isMobile) {
                          clickable.addEventListener('touchend', function(){
                            calc.procInput(clickable);
                          });
                        } else {
                          clickable.addEventListener('click', function(){
                            calc.procInput(clickable);
                          });
                        }
                      },
    displayNumInput: function(num){
                        calc.procNumInput(num.textContent);
                        this.adjustTextSize(this.output);
                        this.output.textContent = calc.currentNum;
                     },
    clear: function(){
                    calc.currentNum = '0';
                    this.output.textContent = calc.currentNum;
                    calc.evalQueue = '';
                    this.queue.textContent = calc.evalQueue;
                    calc.memory = '';
                    calc.equalsPressed = false;
                    calc.opPressed = true;
                    this.adjustTextSize(this.output);
           },
    displayOpResult: function(op) {
                        calc.procOpInput(op.textContent);
                        this.adjustTextSize(this.output);
                        calc.memory ? this.output.textContent = calc.memory : this.output.textContent = '0';
                        this.queue.textContent = calc.evalQueue;
                     }
  };



  // STYLE BEHAVIOR

  function calculator3DBehavior(){
    view.calculator.addEventListener('touchstart', function(e){
        e.target.style.transform = 'translateZ(50px) rotateY(0deg) rotateZ(0deg)';
        e.stopPropagation();
    });
    view.body.addEventListener('touchstart', function(e){
      view.calculator.style.transform = 'translateZ(50px) rotateY(45deg) rotateZ(20deg)';
    });
  }

       //includes handler that points to calc logic
  function buttonHandlers(){
    for (let i = 0; i < view.clickables.length; i++){
      buttonStyleBehavior(view.clickables[i]);
      view.addCalcListeners(view.clickables[i]);  
    }
  }

  function buttonStyleBehavior(clickable){
    clickable.addEventListener('mousedown', function(event){
      event.target.style.opacity = 0.3;
    });
    clickable.addEventListener('mouseup', function(event){
      event.target.style.opacity = 1;
    });
    clickable.addEventListener('mouseleave', function(event){
      event.target.style.opacity = 1;
    });
    clickable.addEventListener('touchstart', function(event){
      event.target.style.opacity = 0.3;
    });
    clickable.addEventListener('touchend', function(event){
      event.target.style.opacity = 1;
    });
  }

  init();

}