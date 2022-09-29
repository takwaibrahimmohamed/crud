//define variable
let title = document.querySelector("#title")
let price = document.querySelector("#price")
let taxes = document.querySelector("#taxes")
let ads = document.querySelector("#ads")
let discount = document.querySelector("#discount")
let totle = document.querySelector("#totle")
let count = document.querySelector("#count")
let category = document.querySelector("#category")
let create = document.querySelector("#create")
let tbody=document.querySelector("#tbody")
let deleteAll = document.querySelector("#deleteAll")
let searchinput = document.querySelector("#search")
let mood = "create"
let tmp;

function getTotal(){
   if(price.value !==''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value
    totle.innerHTML = result
    totle.style.backgroundColor = "green"
   }
   else{
    totle.innerHTML = ""
    totle.style.backgroundColor = "red"
   }
}



// create


let creatArr
if(localStorage.getItem("product") !=null){
   creatArr = JSON.parse(localStorage.getItem("product"))
}
else{
    creatArr=[]
}


create.onclick =function(){
dataCreate ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    price:price.value,
    totle:totle.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
}

if(title.value !="" && price.value !="" && category.value !="" && count.value <=100){
    if(mood === 'create'){
        if(dataCreate.count > 1){
            for(let i = 0;i<dataCreate.count;i++){
                creatArr.push(dataCreate)
            }
        }
        else{
            creatArr.push(dataCreate)
        }
    }
    else{
        creatArr[tmp] = dataCreate
        mood =  'create'
        create.innerHTML = "create"
        count.style.display = "block"
    }
    clearData()
}

localStorage.setItem("product",JSON.stringify(creatArr))
read()
}


// clear--
function clearData(){
    title.value = ""
    price.value=''
    taxes.value=''
    ads.value=''
    discount.value=''
    totle.innerHTML=''
    count.value=''
    category.value=''
}



// read--

function read(){
    getTotal()
let table = ''
for(let i=0;i<creatArr.length;i++){

    
   table +=`
   <tr>
                <td>${i+1}</td>
                <td>${creatArr[i].title}</td>
                <td>${creatArr[i].price}</td>
                <td>${creatArr[i].taxes}</td>
                <td>${creatArr[i].ads}</td>
                <td>${creatArr[i].discount}</td>
                <td>${creatArr[i].totle}</td>
                <td>${creatArr[i].category}</td>
                <td><button id="update" onclick = "UpdateDate(${i})">update</button></td>
                <td><button id="delete" onclick = "Delete(${i})">delete</button></td>
    </tr>

   
   `
   
 
}

tbody.innerHTML = table
   if(creatArr.length > 0){
    deleteAll.innerHTML =  `<button onclick= deleteAllthing()>deleteAll (${creatArr.length})</button>`
   }
   else{
    deleteAll.innerHTML=' '
   
   }

}
read()


///



// delete--


function Delete(i){
creatArr.splice(i,1)
localStorage.product = JSON.stringify(creatArr)
read()
}



// deleteAll--
function deleteAllthing(){
    localStorage.clear()
    creatArr.splice(0)
    read()

}


// UpdateDate--
function UpdateDate(i){
    title.value = creatArr[i].title
    price.value = creatArr[i].price
    ads.value = creatArr[i].ads
    taxes.value = creatArr[i].taxes
    discount.value = creatArr[i].discount
    category.value = creatArr[i].category
    getTotal()
    count.style.display = "none"
    create.innerHTML = "Update"
   
    mood = "update"

    tmp = i
scroll({
    top:0,
    behavior:"smooth"
})


}


let serachMode = "title"

function search(id){
if(id ==='btn-title'){
serachMode  = "title"

}
else{
serachMode = "category"

}
searchinput.placeholder = "Search By "+serachMode
searchinput.focus()
searchinput.value = ''
read()
}

function searchDate(value){
    table = ''
    for(let i=0;i<creatArr.length;i++){
        if(serachMode == 'title'){
               if(creatArr[i].title.includes(value.toLowerCase())){
                   table +=`
                   <tr>
                                <td>${i}</td>
                                <td>${creatArr[i].title}</td>
                                <td>${creatArr[i].price}</td>
                                <td>${creatArr[i].taxes}</td>
                                <td>${creatArr[i].ads}</td>
                                <td>${creatArr[i].discount}</td>
                                <td>${creatArr[i].totle}</td>
                                <td>${creatArr[i].category}</td>
                                <td><button id="update" onclick = "UpdateDate(${i})">update</button></td>
                                <td><button id="delete" onclick = "Delete(${i})">delete</button></td>
                    </tr>
                
                   
                   `
                   
               }
           
       }
   
   
       else{
               if(creatArr[i].category.includes(value.toLowerCase())){
                   table +=`
                   <tr>
                                <td>${i}</td>
                                <td>${creatArr[i].title}</td>
                                <td>${creatArr[i].price}</td>
                                <td>${creatArr[i].taxes}</td>
                                <td>${creatArr[i].ads}</td>
                                <td>${creatArr[i].discount}</td>
                                <td>${creatArr[i].totle}</td>
                                <td>${creatArr[i].category}</td>
                                <td><button id="update" onclick = "UpdateDate(${i})">update</button></td>
                                <td><button id="delete" onclick = "Delete(${i})">delete</button></td>
                    </tr>
                
                   
                   `
                   
               }
       }
    }

   
    tbody.innerHTML = table
 
}