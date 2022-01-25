const socket = io();

const btn_clicked = (id) => {
    console.log(id)
    socket.emit('onClick', id);
}

socket.on('onClick', (data) => {
    console.log(data)
    changeClass(data)
})

socket.on("user_connected", (data) => {
    console.log("user connected")
    console.log(data)
    for (let i = 0; i < data.length; i++) {
        changeClass(data[i])
    }
})



socket.on("reset", (data) => {
    console.log("user connected")
    resetAll()
})

const changeClass = (id) => {
    var element = document.getElementById(id);
    element.style.backgroundColor = "#f55";
}

const resetAll = () => {
    console.log("reset")
    for (let i = 1; i < 10; i++) {
        var element = document.getElementById(i);
        element.style.backgroundColor = "#444";
    }

}