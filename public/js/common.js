

const allHearts = document.querySelectorAll(".heart");
for (let heart of allHearts) {
    heart.addEventListener("click", async (e) => {
        try {
            const productId = heart.getAttribute("product-id");

            const response = await axios({
                method: 'post',
                url: `/products/${productId}/like`,
                headers: {//telling to the server that i am sending a 'AJAX' request.
                    'X-Requested-With': 'XMLHttpRequest'
                }
                ,
            })
            if (heart.children[0].classList.contains("fas")) {
                heart.children[0].classList.remove("fas");
                heart.children[0].classList.add("far");
            }
            else {
                heart.children[0].classList.remove("far");
                heart.children[0].classList.add("fas");

            }
        }
        catch (e) {
            console.log(e.message);
            window.location.replace("/login");//will move to login page if user not logged In
        }

    })
}
///
const allDeleteBtn = document.querySelectorAll("#Deletebtn");
const allIndividualPrice=document.querySelectorAll(".individualPrice");
const totalPrice=document.querySelector(".totalPrice");
const allCartItems = document.querySelectorAll(".cart-items");
for (let i = 0; i < allDeleteBtn.length; i++) {
    
    allDeleteBtn[i].addEventListener("click", async (e) => {
        const productid = allDeleteBtn[i].getAttribute("product-id");
        try {
                const response=await axios({
                method: 'post',
                url: `/user/${productid}/remove`,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                }
                ,
               })
              allIndividualPrice[i].style.display="none";
              
              allCartItems[i].style.display="none";
        }
        catch (e) {
            console.log(e.message);
            window.location.replace("/login");
        }
    })
}