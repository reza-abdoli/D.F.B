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

goTextBtn = document.getElementById('goTextBtn')
gosh256Btn = document.getElementById('goSha256Btn')

nodeTextBtn = document.getElementById('nodeTextBtn')
nodesh256Btn = document.getElementById('nodeSha256Btn')


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
           // mode: 'no-cors',
          //  dataType: 'jsonp',
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(res => res.json()) // res.json() converts the data of res which is coming from backend to js object
            .then(content => {
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
           // mode: 'no-cors',
           /// dataType: 'jsonp',
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


nodeTextBtn.addEventListener('click', () => {
    let nodeUrl = "http://localhost:3060/node/sha256";
    let input = document.getElementById('nodeInput').value;
    // if (input.length < 8) {
    //     document.getElementById('goShaStatus').innerHTML = "Less than 8 chars";
    //     alert(11)
    //     return ;
    // }
    try {
        const response = fetch(nodeUrl, {
            method: "POST",
           // mode: 'no-cors',
           // dataType: 'jsonp',
            body: JSON.stringify({ message: "", data: input }), // the JSON which is sent to the backend must have the same format as the data sent from the backend 
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(res => res.json()) // res.json() converts the data of res which is coming from backend to js object
            .then(content => {
                // alert(content.data)
                document.getElementById('nodeDataResult').classList.add('hidden')
                document.getElementById('nodeShaResult').classList.remove('hidden')
                document.getElementById('nodeShaResult').classList.add('block')
                document.getElementById('nodeShaMessage').innerHTML = content.message
                document.getElementById('nodeShaStatus').innerHTML = content.data
            })
    } catch (error) {
        console.error(`error: ${error.message}`)
    }
})

nodesh256Btn.addEventListener('click', () => {
    let input = document.getElementById('nodeInputSh256').value;
    let nodeUrl = `http://localhost:3060/node/sha256?sha=${input}`;
    try {
        const response = fetch(nodeUrl, {
            method: "GET",
         //   mode: 'no-cors',
         //   dataType: 'jsonp',
            headers: {
                "Content-type": "application/json",
            }
        })
            .then(res => res.json()) // res.json() converts the data of res which is coming from backend to js object
            .then(content => {
                // alert(content.data)
                document.getElementById('nodeShaResult').classList.add('hidden')
                document.getElementById('nodeDataResult').classList.remove('hidden')
                document.getElementById('nodeDataResult').classList.add('block')
                document.getElementById('nodeDataMessage').innerHTML = content.message
                document.getElementById('nodeDataStatus').innerHTML = content.data
            })
    } catch (error) {
        console.error(`error: ${error.message}`)
    }
})