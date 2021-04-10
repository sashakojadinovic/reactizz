function Swipe(elm) {
    console.log(elm);
    elm.addEventListener('mousedown', function(e){
        console.log(e.clientX);
});
};

export default Swipe
