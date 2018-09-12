//external
const earlList = 'https://api.openaq.org/v1/cities';
const earlLate = 'https://api.openaq.org/v1/latest';
const earlPais = 'https://api.openaq.org/v1/countries';
//doc vars
const input = document.getElementById('cities');
const slct = document.getElementById('countries');
const frm1 = document.getElementById('frm1');
const frm2 = document.getElementById('frm2');
const inpt1 = document.getElementById('inpt1');
const inpt2 = document.getElementById('inpt2');
const sect1 = document.getElementById('info');
const prsrv = document.getElementById('defaultCheck1')
const reset = document.getElementById('reset')
//other decs
let jResults;//holding in memory as is needed for additional ops - extract country code
let arrCities;//"           " - already holds AQ info
//events
frm1.addEventListener('submit', popCity);
frm2.addEventListener('submit', showRes);
reset.addEventListener('click',clear)
//run on enter
inpt1.addEventListener('keyup', function (event) {
        event.preventDefault()
            if (event.keyCode === 13) {
                popCity
                focNext()
            }
})
inpt2.addEventListener('keyup', function (event) {
    event.preventDefault()
    if (event.keyCode == 13) {
        showRes
    }
})
inpt2.addEventListener('mousedown', function (event) {
    inpt2.value=''
})
inpt1.addEventListener('mousedown', function (event) {
    inpt1.value = ''
    inpt2.value = ''
    inpt2.setAttribute('placeholder','')
})
//retrieve list of countries
function popPais(){
    fetch(earlPais).then(function(result){
        let ret = result.json();//convert to json
        return ret;
    }).then(function(json){
        jResults = json.results;//passing json to global variable
        for (loc in jResults){
            let listy = document.createElement('option');
            let cur = jResults[loc];//creating new object to drill down to next level
            listy.value = cur.name;
            slct.appendChild(listy);//slct is the datalist for inpt1
        }
    }).catch(function(err){
        console.log(err);
    })
};
popPais()
//retrieve list of cities from selected country
function popCity(e){



    //*************ADD PREVENT 0LENGTH ENTRY*******************/
        //validate matches entry from list
        //add clear old elements



    e.preventDefault();
    let paisCode= getCode(jResults,inpt1.value);//retrieving country code from country array (AU instead of Australia etc.)
    let newEarl = `${earlList}?country=${paisCode}`;//adding query to URL
    fetch(newEarl).then(function(result){
        let ret = result.json();//converting to json
        return ret;
    }).then(function(json){
        // console.log(json);
        arrCities = json.results;//passing json to global variable - already contains AQ info
        while (input.firstChild) {
            input.removeChild(input.firstChild)
        }
        for (loc in arrCities){
            let listy = document.createElement('option');
            let cur = arrCities[loc];
            listy.value = cur.city;
            input.appendChild(listy);//input is datalist for inpt2
        }
        inpt2.setAttribute('placeholder',`Pick a city in ${inpt1.value}`);//dynamic placeholder
        frm2.style.display ='block';//showing city selection box
    }).catch(function(err){
        console.log(err);
    })
};
//extract country code from array of countries (query to list cities requires code not name)
function getCode(arrMatey, val){
    for (let key in arrMatey) {
        if (arrMatey[key].name == val) {//if country name is equal to selected country then...
            return arrMatey[key].code};
    }
    console.log('no match');
};
//print results to section from arrCities
function showRes(e){
    e.preventDefault();
    if (prsrv.checked) { }else{
        while (sect1.firstChild) {
            sect1.removeChild(sect1.firstChild)
        }
    }
    for (let loc in arrCities) {
        switch (arrCities[loc].city === inpt2.value) {
            case true:
            let divi = document.createElement('div')
                divi.setAttribute('class', 'autoDiv')
                for (let key in arrCities[loc]) {
                    let para = document.createElement('p');
                    para.innerText = `${key}: ${arrCities[loc][key]}`;
                    divi.appendChild(para)
                }
                sect1.insertBefore(divi,sect1.firstChild)
                sect1.style.display ='block'
                reset.disabled = false;
                reset.style.display = 'inline-block'
                return
                break;
            case false:
                break;
            };
        };
    let par = document.createElement('p')
    let divi = document.createElement('div')
    divi.setAttribute('class','autoDiv')
    par.innerText = `Data for ${inpt2.value} was not found. Please select an option from the list provided.`
    divi.appendChild(par)
        sect1.appendChild(divi)
        inpt2.value = ''
        sect1.style.display = 'block'
        reset.disabled = false;
    };
//
function focNext(){
    inpt2.focus()
}
//
function clear() {
    inpt1.value=''
    inpt2.value = ''
    frm2.style.display = 'none'
    reset.style.display = 'none'
    while (inpt2.firstChild) {
        inpt2.removeChild(inpt2.firstChild)
    }
    while (sect1.firstChild) {
        sect1.removeChild(sect1.firstChild)
    }
}