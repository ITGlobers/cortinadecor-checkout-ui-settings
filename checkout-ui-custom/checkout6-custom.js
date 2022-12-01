
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
  let mobileReference = document.querySelector('.summary-template-holder');

  if(innerWidth < 690){
    mobileReference.append(seals);
  }else{
    reference.append(seals);
  }
  seals.style.display = "block";
}

let messageManufacturing = () => {
    let reference = document.querySelector('.cart-template .cart .table.cart-items');
    let element = document.querySelector('.manufacturingContainer');
    reference.append(element);
}

let observerF = () => {
  const targetNode = document.querySelector('.empty-cart-content');

  const config = { attributes: true, childList: true, subtree: true };

  const callback = () => {
    let navContainer = document.querySelector('.cartButtons');
    let manufacturingMessage = document.querySelector('.manufacturingContainer');
    if(document.querySelector('.empty-cart-content').style.display === "none"){
      navContainer.style.display = "flex";
      manufacturingMessage.style.display = "flex";
    }else{
      navContainer.style.display = "none";
      manufacturingMessage.style.display = "none";
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
}


let navButtons = () => {
  let element = document.querySelector('.cartButtons');
  let reference = document.querySelector('.cart-template .cart');
  console.log({reference})
  reference.after(element);
}

let summaryTitle = () => {
  let reference = document.querySelector('div.summary');
  let toInsert = document.createElement('h3');
  toInsert.classList.add("summaryTitle");
  toInsert.innerHTML = "Cart Summary"
  reference.insertBefore(toInsert, reference.querySelector('div.summary-totalizers'));
}

let trustSealsFix = function(){
  let warrantyContainer = document.querySelector('#trust-seals-arrows-warranty');
  let ratesContainer = document.querySelector('#trust-seals-arrows-reviews');
  let warrantyArrow = warrantyContainer.querySelector("svg.mobileVersion path.path");
  let ratesArrow = ratesContainer.querySelector("svg.mobileVersion path.path");
  let warrantyDimension = warrantyContainer.clientWidth;
  let ratesDimension = ratesContainer.clientWidth;

  let warrantyPath = warrantyArrow.getAttribute('d').split(' ');
  let ratesPath = ratesArrow.getAttribute('d').split(' ');

  warrantyPath[4] = warrantyDimension - 40;
  warrantyPath[6] = warrantyDimension;
  warrantyPath[8] = warrantyDimension;
  warrantyPath[10] = warrantyDimension - 40;

  ratesPath[4] = ratesDimension - 40;
  ratesPath[6] = ratesDimension;
  ratesPath[8] = ratesDimension;
  ratesPath[10] = ratesDimension - 40;

  warrantyPath = warrantyPath.join(" ");
  ratesPath = ratesPath.join(" ");

  warrantyArrow.setAttribute('d', warrantyPath);
  ratesArrow.setAttribute('d', ratesPath);

}

window.addEventListener('resize', function(){
  trustSealsFix();
  moveTrustValues();
});

$(window).on("orderFormUpdated.vtex", function(){
  console.log("actualice el checkout");
  setTimeout(function(){
    changeProductsheader();
    messageManufacturing();
    navButtons();
    trustSealsFix();
  },500);
})

setTimeout(function(){
  couponsHandler();
  addPaymentsIcons();
  changeProductsheader();
  moveTrustValues();
  if(innerWidth > 1000){
    summaryTitle();
  }
  setTimeout(function(){
    navButtons()
  },500);
  setTimeout(function(){
    trustSealsFix();
  },1000)
  observerF();
},500)


steps.init();
