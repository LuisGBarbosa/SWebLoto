let num = document.querySelector('input#fnum')
let lista = document.querySelector('select#flista')
let lista2 = document.querySelector('select#flista2')
let res = document.querySelector('div#res')
let valores = []
let valoresNot = []
let numImpar = 0
let numPar = 0
let qtdDezenas = document.querySelector('select#select-dezenas')
let res2 = document.querySelector('div#res2')
let qtdNumbersYes = document.querySelector('input#qtdNumbersYes')
let qtdNumbersNot = document.querySelector('input#qtdNumbersNot')
let qtdJogos = document.getElementById("qtdJogos")
let resultNumbersRandom = document.getElementById("resultNumbersRandom")

function isNumero(n) {
    if (Number(n) >= 1 && Number(n) <= 25) {
        return true
    } else {
        return false
    }
}

function inLista(n, l) {
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}

function parimp(n) {
    if (n % 2 == 0) {
        numPar++
        return 'Par'
    } else {
        numImpar++
        return 'Impar'
    }
}

//Adiciona com enter
document.addEventListener('keypress', function(e) {
    if (e.which == 13 && num.focus) {
        Adicionar();
    }
}, false)

//Adiciona na lista
const Adicionar = () => {
    if (isNumero(num.value) && !inLista(num.value, valores)) {
        if (valores.length >= 15) {
            alert('Limite de números atingido.')
        } else {
            parimp(num.value);
            valores.push(Number(num.value))
            let item = document.createElement('option')
            item.text = `Número: ${num.value} adicionado.`
            lista.appendChild(item)
            res.innerHTML = ''
        }
    } else {
        alert('Número maior ou menor que o permitido, ou já encontrado na lista.')
    }
    num.value = ''
    num.focus()
}

//Passa pro outra lista números não adicionados na primeira
const Finalizar = () => {
    if (valores.length == 0 && valores.length < 15) {
        alert('Aidicione os valores antes de finalizar.')
    } else {
        for (let j = 1; j <= 25; j++) {
            if (!valores.includes(j)) {
                var item2 = document.createElement('option')
                item2.text = `Número ${j} não adicionado.`
                lista2.appendChild(item2)
                valoresNot.push(Number(j))
            }
        }
        res.innerHTML = ''
        res.innerHTML += `<p>Quantidade de números Ímpares: <strong>${numImpar}</strong>.</p>`
        res.innerHTML += `<p>Quantidade de números Pares: <strong>${numPar}</strong>.</p>`
    }

}

const GerarJogos = () => {
    // for (let j = 1; j <= 25; j++) {
    //     if (!valores.includes(j)) {       
    //         valoresNot.push(Number(j))   
    //     } 
    // }
    if ((qtdNumbersYes + qtdNumbersNot) > 15 && Number(qtdNumbersNot) > 10 || Number(qtdNumbersYes) > 15) {
        Alert("A soma das quantidades de números é maior que a quantidade de dezenas ou os valores excedem o limite.");
    } else {
        let arrayRandomSelected = gerarArraysSelected()
        arrayRandomSelected.map(x => {
            resultNumbersRandom.appendChild(gerarObjTeclas(x))
        })
    }
}

//Gerar Novamente
//como a função limpar jogos, limpa o array da segunda lista pra resetar, esta função insere novamente os valores
const GerarNovosJogos = () => {
    for (let j = 1; j <= 25; j++) {
        if (!valores.includes(j)) {
            valoresNot.push(Number(j))
        }
    }
    if ((qtdNumbersYes + qtdNumbersNot) > 15 && Number(qtdNumbersNot) > 10 || Number(qtdNumbersYes) > 15) {
        Alert("A soma das quantidades de números é maior que a quantidade de dezenas ou os valores excedem o limite.");
    } else {
        let arrayRandomSelected = gerarArraysSelected()
        arrayRandomSelected.map(x => {
            resultNumbersRandom.appendChild(gerarObjTeclas(x))
        })
    }
}

function verificarArray(arrayV, arrayG) {
    arrayV.map(x => {
        x.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
        })
    })

    for (let i = 0; i <= arrayV.length; i++) {
        if (String(arrayV[i]) == String(arrayG)) {
            return false
        }
    }
    return true

}

const gerarObjTeclas = x => {
    var objTeclas = document.createElement("div")
    objTeclas.classList.add("teclas")
    for (var i = 1; i <= 25; i++) {
        var objTecla = document.createElement("div")
        objTecla.innerText = String(i)
        if (x.includes(i)) {
            objTecla.style.background = "#e2cfcf"
        }
        objTeclas.appendChild(objTecla)
    }

    return objTeclas
}

function exibirRes(arrays = gerarArrays()) {
    arrays.map(x => {
        res2.appendChild(gerarObjTeclas(x))
    })
}

function LimparTudo() {
    resultNumbersRandom.innerHTML = null
    lista2.innerHTML = null
    lista.innerHTML = null
    valores.splice(0, valores.length)
    valoresNot.splice(0, valoresNot.length)
    numImpar = 0
    numPar = 0
    parimp(0)
    res.innerHTML = ''
    document.location.reload(true)
}

function LimparListas() {
    lista2.innerHTML = null
    lista.innerHTML = null
    valores.splice(0, valores.length)
    valoresNot.splice(0, valoresNot.length)
    numImpar = 0
    numPar = 0
    parimp(0)
    res.innerHTML = ''
}

//Fução para teste
// function LimparLista2() {
//     lista2.innerHTML = null
//     valoresNot.splice(0, valoresNot.length)
// }

function LimparJogos() {
    resultNumbersRandom.innerHTML = null
    valoresNot.splice(0, valoresNot.length)
}

const getRandomIntegerInclusive = (min = 1, max = 4, array) =>
    array[Math.floor(Math.random() * (max - min + 1)) + min];

function getRandomNumber(numerosGerar = 3, arrayPath = [], arrayParam) {
    var numberTeste = Number(getRandomIntegerInclusive(0, arrayParam.length - 1, arrayParam))
    if (arrayPath.length <= numerosGerar && !arrayPath.includes(numberTeste)) {
        arrayPath.push(numberTeste)
        getRandomNumber(numerosGerar, arrayPath, arrayParam)
    } else if (arrayPath.length <= numerosGerar) {
        getRandomNumber(numerosGerar, arrayPath, arrayParam)
    }

    return arrayPath

}

const gerarArraysSelected = (numG = Number(qtdJogos.value - 1),
    numSelected = Number(qtdNumbersYes.value) - 1,
    numIsNot = Number(qtdNumbersNot.value) - 1,
    arrayCache = []) => {

    let arrayIsNot = getRandomNumber(numIsNot, [], valoresNot)
    let arrayIsSelected = getRandomNumber(numSelected, [], valores)
    let arrayConcated = arrayIsNot.concat(arrayIsSelected)
    if (verificarArray(arrayCache, arrayConcated) && arrayCache.length <= numG) {
        arrayCache.push(arrayConcated)
        gerarArraysSelected(numG, numIsNot, numSelected, arrayCache)
    }
    if (arrayCache.length <= numG) {
        gerarArraysSelected(numG, numIsNot, numSelected, arrayCache)
    } else {
        return arrayCache
    }
}

// _______/\\\\\______        ____/\\\\\\\\\_____        __/\\\\\\\\\\\\\___        __/\\\\\\\\\\\\\\\_        
//  _____/\\\///\\\____        __/\\\///////\\\___        _\/\\\/////////\\\_        _\/\\\///////////__       
//   ___/\\\/__\///\\\__        _\/\\\_____\/\\\___        _\/\\\_______\/\\\_        _\/\\\_____________      
//    __/\\\______\//\\\_        _\/\\\\\\\\\\\/____        _\/\\\\\\\\\\\\\\__        _\/\\\\\\\\\\\_____     
//     _\/\\\_______\/\\\_        _\/\\\//////\\\____        _\/\\\/////////\\\_        _\/\\\///////______    
//      _\//\\\______/\\\__        _\/\\\____\//\\\___        _\/\\\_______\/\\\_        _\/\\\_____________   
//       __\///\\\__/\\\____        _\/\\\_____\//\\\__        _\/\\\_______\/\\\_        _\/\\\_____________  
//        ____\///\\\\\/_____        _\/\\\______\//\\\_        _\/\\\\\\\\\\\\\/__        _\/\\\\\\\\\\\\\\\_ 
//         ______\/////_______        _\///________\///__        _\/////////////____        _\///////////////__

// Autor: Gabriel R. Nogueira e Luis Gustavo Barbosa
// Version: 2.0V
// Descrição: WebLoto - Sistema de Loteria. (Development by Orbe).