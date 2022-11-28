
let steps = {
  currentStep: "",
  allSteps: "",
  init: function(){
    setTimeout(function(){
      steps.currentStep = location.hash.split('/')[1];
      steps.currentStep = (steps.currentStep === "email") ? "profile" : steps.currentStep;
      steps.allSteps = document.querySelectorAll('.buySteps ul li');
      steps.setEvent();
      steps.setClasses();
    },500);
  },
  setEvent: function(){
    addEventListener('hashchange',(ev) => {
      steps.currentStep = ev.newURL.split('#/')[1];
      steps.currentStep = (steps.currentStep === "email") ? "profile" : steps.currentStep;
      steps.setClasses();
    })
  },
  setClasses: function(){
    let setCurrentClass = false;
    for(let i = this.allSteps.length -1 ; i >= 0; i--){
      if(!setCurrentClass){
        if(this.allSteps[i].classList.contains(this.currentStep+'Step')){
          setCurrentClass = true;
          i++;
        }else{
          this.allSteps[i].classList.remove('current');
        }
      }else{
        this.allSteps[i].classList.add('current');
      }
    }
  }
}

//-----------Observer Config to floatign button----------//
let setMutationObrserver = () => {
  let target = document.querySelector('td.monetary[data-bind="text: totalLabel"]');
  let floatingPrice = document.querySelector('.floatingButton .priceContainer')
  floatingPrice.innerHTML = target.innerHTML;

  const changePrice = (mutationList, observer) => {
    floatingPrice.innerHTML = target.innerHTML;
  }

  const config = { attributes: false, childList: true, subtree: true };

  const observer = new MutationObserver(changePrice);

  observer.observe(target,config);

}

let setIntersectionObrserver = () => {
  let target = document.querySelector('.cart-links.cart-links-bottom');
  let floatingPrice = document.querySelector('.floatingButton')

  let options = {
    root: null,
    rootMargin: `-${100}px`,
    threshold: [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1]
  }

  const showPrice = (entries, observer) => {
    if(entries[0].intersectionRatio > 0 && entries[0].intersectionRatio <= 0.25){
      floatingPrice.style.opacity = "1";
    }
    if(entries[0].intersectionRatio > 0.25 && entries[0].intersectionRatio <= 1){
      floatingPrice.style.opacity = "0";
    }
  }
  console.log(target)
  let intersection = new IntersectionObserver(showPrice, options);

  intersection.observe(target);
}

let interval = setInterval(function(){
  if(document.querySelector('.loading.loading-bg').style.display === "none"){
    clearInterval(interval);
    setMutationObrserver();
    setIntersectionObrserver();
    document.querySelector('footer').style.paddingBottom = document.querySelector('.floatingButton').clientHeight+32+"px";
  }
},500);

//-----------END----------//

let couponsHandler = () => {
  let wrapper = document.createElement('details');
  let title = document.createElement('summary');
  let parent = document.querySelector('.totalizers.summary-totalizers.cart-totalizers');
  let couponsForm = parent.querySelector('.coupon-column.summary-coupon-wrap');

  wrapper.classList.add("couponsWrapper");
  title.classList.add("couponsTitle");
  title.innerHTML = "Do you have a promotional code?";

  wrapper.append(title);
  wrapper.append(couponsForm);

  parent.insertBefore(wrapper, parent.querySelector('div'));

  couponsForm.style.display = "block";
  document.querySelector('.coupon-column.summary-coupon-wrap').style.display = "none";

}

let addPaymentsIcons = () => {
  let reference = document.querySelector('.cart-links.cart-links-bottom');
  let p = document.createElement('p');
  p.classList.add('payments-availables');
  let toInsert =''
  toInsert += '<span><i class="icon icon-cc-visa"></i></span>'
  toInsert += '<span><i class="icon icon-cc-mastercard"></i></span>'
  toInsert += '<span><i class="icon icon-cc-paypal"></i></span>'
  toInsert += '<span><i class="icon icon-cc-paypal"></i></span>'
  toInsert += '<span><i class="icon icon-bank"></i></span>'
  toInsert += '<span><i class="icon icon-aplazame"></i></span>'

  p.innerHTML = toInsert;

  reference.append(p);

}

let changeProductsheader = () => {
  let header = document.querySelector('.table.cart-items thead tr');
  let items = document.querySelectorAll('.table.cart-items tbody .product-item');
  header.innerHTML = "";
  let toInsert = '<div>'
  toInsert += ' <div class="textContainer">';
  toInsert += '  <h2>CART</h2>';
  toInsert += `  <p>${items.length} ARTICLES</p>`;
  toInsert += ' </div>';
  toInsert += ' <a class="send-cart-link" href="#">';
  toInsert += '  <i class="icon icon-mail icon-15d"></i>';
  toInsert += '  <span class="visible-xs-inline">Send you the basket</span>';
  toInsert += ' </a>';
  toInsert += '</div>'

  header.innerHTML = toInsert;
}

let moveTrustValues = () => {
  let seals = document.querySelector('.trust-seals');
  let reference = document.querySelector('.cart-links.cart-links-bottom');

  reference.append(seals);
  seals.style.display = "block";
}

setTimeout(function(){
  couponsHandler();
  addPaymentsIcons();
  changeProductsheader();
  moveTrustValues();
},1000)

steps.init();
