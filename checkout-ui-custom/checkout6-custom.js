
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

let interval = setInterval(function(){
  if(document.querySelector('.loading.loading-bg').style.display === "none"){
    fixPrice();
  }
},500);

let adjustPrice = () => {
  let reference = document.querySelector('td.monetary[data-bind="text: totalLabel"]');
  let priceContainer = document.querySelector('.floatingButton .price .priceContainer');

  priceContainer.innerHTML = reference.innerHTML;
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

  reference.append(seals);
  seals.style.display = "block";
}
let isFirstTime = true;
let messageManufacturing = () => {
  if(document.querySelectorAll('.table.cart-items .product-item').length === 0 || isFirstTime){
    let reference = document.querySelector('.cart-template .cart');
    let container = document.createElement('div');
    container.classList.add('manufacturingContainer');
    let toInsert = '';
    toInsert += ' <div class="description">';
    toInsert += '   <div>'
    toInsert += '     <h3 class="description-title">24H Manufacturing</h3>';
    toInsert += '     <p class="description-content">';
    toInsert += '       Activate manufacturing in 24 hours and get priority on your order';
    toInsert += '       <b>just for</b> <span class="servicePrice">9.95</span> you can activate <b>manufacturing in 24h</b> for all compatible products <a href="/terms-of-use">Terms and conditions of service</a>';
    toInsert += '     </p>';
    toInsert += '   </div>'
    toInsert += ' </div>';
    toInsert += ' <div class="conditions">';
    toInsert += '   <p>';
    toInsert += '     Order before <b>12:00</b> and we will sending to you <b>tomorrow</b></br><a href="#">Activate</a>';
    toInsert += '   </p>';
    toInsert += ' </div>';
    toInsert += ' <div class="price">';
    toInsert += '   <p>';
    toInsert += '     9.95';
    toInsert += '   </p>';
    toInsert += ' </div>';
    container.innerHTML = toInsert;
    reference.append(container);
    isFirstTime = false;
  }else{
    let reference = document.querySelector('.cart-template .cart');
    let element = document.querySelector('.manufacturingContainer');
    let products = document.querySelectorAll('.table.cart-items .product-item').length
    if(element !== null && products === 0){
      reference.removeChild(element);
    }
  }
}

let summaryTitle = () => {
  let reference = document.querySelector('div.summary');
  let toInsert = document.createElement('h3');
  toInsert.classList.add("summaryTitle");
  toInsert.innerHTML = "Cart Summary"
  reference.insertBefore(toInsert, reference.querySelector('div.summary-totalizers'));
}

let fixPrice = () => {
  console.log("fixprice")
  let monetaries = document.querySelectorAll('.monetary');
  let productPrices = document.querySelectorAll('.new-product-price');
  let all = [...monetaries,...productPrices,document.querySelector('.floatingButton .priceContainer')]

  for(let i = 0; i < all.length; i++){
    if(all[i].innerHTML.toLocaleLowerCase().includes('free')) all[i].classList.add('free');
    all[i].innerHTML = all[i].innerHTML.replace('$ ','');
  }
}

$(window).on("orderFormUpdated.vtex", function(){
  console.log("actualice el checkout");
  setTimeout(function(){
    changeProductsheader();
    adjustPrice();
    messageManufacturing();
    fixPrice();
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
},500)


steps.init();
