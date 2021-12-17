const checkoutbtn=document.querySelector(".checkout");
checkoutbtn.addEventListener("click",async (e)=>{
    const order=await axios({
        method:"post",
        url:"/user/checkout",
        headers:{
            "X-Requested-With":"XMLHttpRequest"
        }
    });
    console.log(order);
    //now frontend popup page
  
    var options = {
        "key": "rzp_test_ZoEYYPL9ldUmXT", // Enter the Key ID generated from the Dashboard
        "name": "E-SELL",
        "description": `order_id:-${order.data.id}`,
        "image": "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",
        "order_id": order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "/user/checkout/completed",//after transaction completed post request will be send into this url
        "theme": {
            "color": "#3399cc"
        }
    };
    //................................
    var rzp1 = new Razorpay(options);
    // document.getElementById('rzp-button1').onclick = function(e){
    rzp1.open();
    e.preventDefault();
})