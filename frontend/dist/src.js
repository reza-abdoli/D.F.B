go = document.querySelector('.goTitle')
node = document.querySelector('.nodeTitle')
goForm = document.querySelector('.goForm')
nodeForm = document.querySelector('.nodeForm')

go.addEventListener('click', function () {
    go.classList.remove('bg-slate-300')
    node.classList.add('bg-slate-300')
    goForm.classList.remove('hidden')
    nodeForm.classList.remove('flex')
    nodeForm.classList.add('hidden')
})
node.addEventListener('click', function () {
    node.classList.remove('bg-slate-300')
    go.classList.add('bg-slate-300')
    nodeForm.classList.remove('hidden')
    nodeForm.classList.add('flex')
    goForm.classList.add('hidden')
})

goInput = document.getElementById('goInput').value
nodeInput = document.getElementById('nodeInput').value

// function submitText(pElement, value) {
//     if (value.length < 8) {
//         pElement.innerHTML = "Eror: Less than 8 chars"
//     } else {
//         pElement.innerHTML = "Ok"
//     }
// }

goTextBtn = document.getElementById('goTextBtn')
gosh256Btn = document.getElementById('goSha256Btn')




goTextBtn.addEventListener('click', () => {
    let goUrl = "http://localhost:3061/go/sha256";
    let input = document.getElementById('goInput').value;
    // if (input.length < 8) {
    //     document.getElementById('goShaStatus').innerHTML = "Less than 8 chars";
    //     alert(11)
    //     return ;
    // }
    try {
        const response = fetch(goUrl, {
            method: "POST",
            body: JSON.stringify({ message: "", data: input }), // the JSON which is sent to the backend must have the same format as the data sent from the backend 
            mode: 'no-cors',
            dataType: 'jsonp',
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(res => res.json()) // res.json() converts the data of res which is coming from backend to js object
            .then(content => {
                // alert(content.data)
                document.getElementById('goDataResult').classList.add('hidden')
                document.getElementById('goShaResult').classList.remove('hidden')
                document.getElementById('goShaResult').classList.add('block')
                document.getElementById('goShaMessage').innerHTML = content.message
                document.getElementById('goShaStatus').innerHTML = content.data
            })
    } catch (error) {
        console.error(`error: ${error.message}`)
    }
})

gosh256Btn.addEventListener('click', () => {
    let input = document.getElementById('goInputSh256').value;
    let goUrl = `http://localhost:3061/go/sha256?sha=${input}`;
    try {
        const response = fetch(goUrl, {
            method: "GET",
            mode: 'no-cors',
            //dataType: 'jsonp',
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(res => res.json()) // res.json() converts the data of res which is coming from backend to js object
            .then(content => {
                // alert(content.data)
                document.getElementById('goShaResult').classList.add('hidden')
                document.getElementById('goDataResult').classList.remove('hidden')
                document.getElementById('goDataResult').classList.add('block')
                document.getElementById('goDataMessage').innerHTML = content.message
                document.getElementById('goDataStatus').innerHTML = content.data
            })
    } catch (error) {
        console.error(`error: ${error.message}`)
    }
})