document.querySelectorAll('.image-container').forEach((el,idx)=> {
    el.addEventListener('click',()=> {
        switch (idx) {
            case 0:
                location.href ='./view/sub1.html'
                break;
        
            default:
                location.href ='./view/sub2.html'
                break;
        }
    })
})