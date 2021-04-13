function Swipe(elm, fn) {
    let x0 = null;

    elm.addEventListener('touchstart', function (e) {
        x0 = e.changedTouches[0].clientX;        

    });
    elm.addEventListener('touchend', function(e){
        if(x0-e.changedTouches[0].clientX<-30){
            fn(-1);           
        }
        else if(x0-e.changedTouches[0].clientX>30){
            fn(1);
        }
        console.log(x0);
    })
};

export default Swipe
