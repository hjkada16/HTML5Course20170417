//得到商品ID
var goods_id = $.getQueryString("goods_id");
console.log(goods_id);

$.ajax({
   "url": "http://lc.shudong.wang/api_goods.php?goods_id=" + goods_id,
    "type": "GET",
    "dataType": "json",
    "success": function(response){
       var obj = response.data[0];
       console.log(obj);
       var goodsDetail = document.getElementById("goods-detail");
       var oDiv = document.createElement("div");
       var oImg = document.createElement("img");
       oImg.src = obj.goods_thumb;
       oDiv.appendChild(oImg);
       var oP = document.createElement("p");
       oP.innerText = obj.goods_desc;
       oDiv.appendChild(oP);
       var oBtn = document.createElement("button");
       oBtn.innerText = "加入购物车";
       oBtn.onclick = function(){
           //验证用户是否登录，未登录则跳到登录页面
           if(!localStorage.token){
               location.assign("login.html#callbackurl=" + location.href);
               // location.href = "login.html#callbackurl=" + location.href;
               return;
           }
           console.log("已登录");
           $.ajax({
               "url": "http://h6.duchengjiu.top/shop/api_cart.php?token=" + localStorage.token,
               "type": "POST",
               "data": {
                   "goods_id": goods_id,
                   "number": 1
               },
               "dataType": "json",
               "success": function(response){
                   console.log(response);
                   alert("加入购物车成功");
               }
           })
       };

        // oBtn.onclick = function(){
        //     //验证用户是否登录，未登录则跳到登录页
        //     if (!localStorage.token) {
        //         // location.assign( 'login.html#callbackurl='+location.href);
        //         location.href = 'login.html#callbackurl='+location.href;
        //         return;
        //     }
        //     console.log('已登录');
        //     //获取当前商品已经购买的数量
        //     var goods_number = localStorage.getItem('cart'+goods_id);
        //     goods_number = goods_number ? parseInt(goods_number)+1 : 1;//如果已经有了则加1，没有则是第一次购买
        //     updateCartInfo(goods_id, goods_number, function(response){
        //         location.href = '/cart.html';
        //     });
        // }


        oDiv.appendChild(oBtn);
       goodsDetail.appendChild(oDiv);
    }
});


