const btnRefresh = document.querySelector('.btn')
const placeNames = document.querySelectorAll('.place-name')
const placeInfos = document.querySelectorAll('.place-infos')
const visitors = document.querySelectorAll('.visitors')


btnRefresh.addEventListener('click', () => {
    // 1. On change l'état du bouton

    // 2. On récupère les données
    fetchData()
})

async function fetchData() {
    try {
        const response = await fetch("https://opendata.bordeaux-metropole.fr/api/explore/v2.1/catalog/datasets/bor_frequentation_piscine_tr/records?limit=20");

        if (!response.ok) {
            throw new Error('Erreur')
        }
        const data = await response.json()
        displayData(data)
    } catch (error) {
        console.log('Une erreur est survenue')
    }
}

function displayData(data) {
    // console.log(data)
    data.results.forEach((element, index) => {
        placeNames[index].textContent = element.etablissement_etalib
        placeInfos[index].textContent = `${element.fmicourante} / ${element.fmizonmax}`
        let ratio = element.fmicourante / element.fmizonmax

        visitors[index].style.transform = `scaleX(${ratio})`
    })
}








// const btnRefresh = document.querySelector('button');
// const errorMsg = document.querySelector('.errorMsg');
// const places = document.querySelectorAll('.place')
// const visitors = document.querySelectorAll('.visitors')

// const dataset = 'bor_frequentation_piscine_tr'

// btnRefresh.addEventListener('click', onRefresh)

// async function fetchData() {
//     try {
//         // const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=${dataset}`)
//         const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/explore/v2.1/catalog/datasets/bor_frequentation_piscine_tr/records?limit=20`)


//         if (!response.ok) {
//             throw new Error(`Erreur: ${response.status}`)
//         }

//         const data = await response.json()
//         btnChange()
//         displayData(data);
//     }
//     catch (error) {
//         btnChange()
//         errorMsg.textContent = `${error}`
//     }
// }

// function onRefresh(e) {
//     btnChange('search')
//     fetchData();
// }

// function btnChange(state) {
//     if (state === 'search') {
//         btnRefresh.classList.add("searching");
//         btnRefresh.textContent = '...'
//     } else {
//         btnRefresh.classList.remove("searching");
//         btnRefresh.textContent = 'Refresh'
//     }
// }

// function displayData(data) {
//     //let sortedRecords = [...data.records];
//     // data.results.sort((a, b) => {
//     //     let result = ((a.fmicourante / a.fmizonmax) - (b.fmicourante / b.fmizonmax)) * -1
//     //     return result
//     // })
//     data.results.forEach((result, index) => {
//         let current = 0;
//         if (result.fmicourante > 0) current = result.fmicourante;

//         const currentPlace = places[index];
//         const name = currentPlace.children[0];
//         name.textContent = `${result.etablissement_etalib} (${result.fmizonlib}) : `
//         const info = currentPlace.children[1];
//         info.textContent = `${current} / ${result.fmizonmax}`
//         result.datemiseajour

//         let ratio = (current / result.fmizonmax);

//         visitors[index].style.transform = `scaleX(${ratio})`
//     })
// }