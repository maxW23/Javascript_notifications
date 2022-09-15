//Only code that runs in a secure context (HTTPS) can send the notifications

const button =document.querySelector("button")

button.addEventListener("click" ,() => {
    //Requesting the permission
    Notification.requestPermission().then(perm => {
        if(perm === "granted"){
            const notification =new Notification("Example notification" ,{
                body : Math.random() ,
                data :{hello :"world"} ,
                icon : "abced-hello-world-1.png",
                // tag :"Welcome Message",
            })
            //In case of denying notification
            notification.addEventListener("error" , e => {
                alert("error")
            })
        }
    })
})


let notification
let interval
//If the User is in another tab of the browser and you want him back
document.addEventListener("visibilitychange" , () => {
    if(document.visibilityState === "hidden"){
        //A notification which contains the time that the user been out of the main tab
        const leaveDate =new Date()
        interval = setInterval (() => {
            new Notification ("Come back please !" ,{
            body : `You have been gone for ${Math.round((new Date() -leaveDate)/ 1000)} second` ,
            tag :"Come Back",

        })
        },1000)
    }else {
        //Once returning to the tab : close auto
        if(interval) clearInterval(interval)
        if(notification) notification.close()
    }
})