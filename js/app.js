'use strict';

let allObjects=[];

function Store(sName,minimum,maximum,avgC){
  this.storeName=sName;
  this.minCust=minimum;
  this.maxCust=maximum;
  this.avgCookies=avgC;
  this.avgCustPerHr=[];
  this.cookPurchEachHr=[];
  allObjects.push(this);
}

let seattle=new Store('Seatle',23,65,6.3);
let tokyo=new Store('Tokyo',3,24,1.2);
let dubai=new Store('Dubai',11,38,3.7);
let paris=new Store('Paris',20,38,2.3);
let lima=new Store('Lima',11,38,3.7);


//random function from w3school
Store.prototype.rand= function(){
  return Math.random() * (this.maxCust - this.minCust) + this.minCust;
};

//calculating avg purches cookie per hr
Store.prototype.avgCust=function(){
  for(let i=0 ; i < 14 ; i++){
    this.avgCustPerHr[i]=this.rand();
    this.cookPurchEachHr[i]=Math.ceil(this.avgCustPerHr[i]*this.avgCookies);
  }
};

seattle.avgCust();
tokyo.avgCust();
dubai.avgCust();
paris.avgCust();
lima.avgCust();






// creating the tables

let container=document.getElementById('cont');
let table=document.createElement('table');
container.appendChild(table);



let tbEl='';
function tableHeaderRow(){
  let headerRow=document.createElement('tr');
  table.appendChild(headerRow);
  tbEl=document.createElement('td');
  headerRow.appendChild(tbEl);
  let amPm='';
  let clock=5;

  for(let i =0 ; i<15 ; i++){
    tbEl=document.createElement('td');
    headerRow.appendChild(tbEl);

    if (clock < 12 ){
      clock++;
    }else{
      clock=1;
    }if(clock < 12 && i<6){
      amPm='am';

    }
    if(i>=6){
      amPm='pm';
    }
    if(i<14){
      tbEl.textContent=` ${clock}${amPm}`+' ';
    }else{
      tbEl.textContent=' Daily total';
    }
  }
}
tableHeaderRow();


  let bigtotal=0;
  Store.prototype.render=function(){
  let tr1=document.createElement('tr');
  table.appendChild(tr1);

  tbEl=document.createElement('td');
  tr1.appendChild(tbEl);
  tbEl.textContent=`${this.storeName}`;

  let total=0;
  for(let i =0 ; i<=this.cookPurchEachHr.length ; i++){
  tbEl=document.createElement('td');
  tr1.appendChild(tbEl);
  if(i<14){
      tbEl.textContent=`${this.cookPurchEachHr[i]}`;
      total=total+this.cookPurchEachHr[i];
      bigtotal=bigtotal+this.cookPurchEachHr[i];
    }else{
      tbEl.textContent=`${total}`;
    }
  }
};

seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();




function tableFooterRow(){
  let footerRow=document.createElement('tr');
  table.appendChild(footerRow);
  tbEl=document.createElement('td');
  footerRow.appendChild(tbEl);
  tbEl.textContent='totals';
  let arr2=[];
  let arrStartPoint=0;
  for(let i=0;i<seattle.cookPurchEachHr.length;i++){
    for(let j=0; j<allObjects.length;j++){
      arrStartPoint+= allObjects[j].cookPurchEachHr[i];
    }
    arr2.push(arrStartPoint);
    arrStartPoint=0;
  }
  for(let i =0 ; i<=arr2.length ; i++){
    tbEl=document.createElement('td');
    footerRow.appendChild(tbEl);
    if(i<14){
      tbEl.textContent=`${arr2[i]}`;
    }else{
      tbEl.textContent=`${bigtotal}`;
    }
  }
}
tableFooterRow();