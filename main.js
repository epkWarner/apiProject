const earlList = 'https://api.openaq.org/v1/cities'
const earlLate = 'https://api.openaq.org/v1/latest'
const earlPais = 'https://api.openaq.org/v1/countries'
//
const input = document.getElementById('cities')
const slct = document.getElementById('countries')
const frm1 = document.getElementById('frm1')
const frm2 = document.getElementById('frm2')
const inpt1 = document.getElementById('inpt1')
const inpt2 = document.getElementById('inpt2')
//
let jResults;
let cities;
//
frm1.addEventListener('submit', popCity)
frm2.addEventListener('submit',showRes)
//
function popPais(e){
    // e.preventDefault()
    fetch(earlPais).then(function(result){
        let ret = result.json()
        return ret
    }).then(function(json){
        jResults = json.results
        let pais = json.results
        for (loc in pais){
            let listy = document.createElement('option')
            let cur = pais[loc]
            listy.value = cur.name
            slct.appendChild(listy)
        }
    }).catch(function(err){
        console.log(err)
    })
}
popPais()
//
function popCity(e){
    e.preventDefault()
    let paisCode= getCode(jResults,inpt1.value)
    let newEarl = `${earlList}?country=${paisCode}`
    fetch(newEarl).then(function(result){
        let ret = result.json()
        return ret
    }).then(function(json){
        console.log(json)
        cities = json.results
        for (loc in cities){
            let listy = document.createElement('option')
            let cur = cities[loc]
            listy.value = cur.city
            input.appendChild(listy)
        }
        inpt2.setAttribute('placeholder',`Pick a city in ${inpt1.value}`)
        frm2.style.display ='block'
    }).catch(function(err){
        console.log(err)
    })
}

// popCity()
//
function getCode(arrMatey, val){
    for (let key in arrMatey) {
        if (arrMatey[key].name == val) {
            return arrMatey[key].code}
    }
    console.log('no match')
}
//
function showRes(e){
    e.preventDefault()
    cities.forEach(name => name === inpt2.value {
        
    });
}
//