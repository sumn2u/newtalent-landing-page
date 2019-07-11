// ***************************************************
// Shopping Cart functions

var shoppingCart = (function () {
    // Private methods and properties
    var cart = [];

    function Item(courseid, name, price, count, image) {
        this.courseid = courseid
        this.name = name
        this.price = price
        this.count = count
        this.image = image
    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();



    // Public methods and properties
    var obj = {};

    obj.addItemToCart = function (courseid, name, price, count, image) {
        for (var i in cart) {
            // console.log(cart[i].courseid, courseid, courseid === cart[i].courseid)
            if (cart[i].courseid === courseid) {
                cart[i].count = count;
                saveCart();
                return;
            }
        }

        // console.log("addItemToCart:", name, price, count, image);

        var item = new Item(courseid, name, price, count, image);
        // console.log(item, 'item ==>')
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function (name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCart = function (courseid) { // Removes one item
        for (var i in cart) {
            if (cart[i].courseid === courseid) { // "3" === 3 false
                cart[i].count--; // cart[i].count --
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };


    obj.removeItemFromCartAll = function (courseid) { // removes all item name
        for (var i in cart) {
            if (cart[i].courseid === courseid) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };


    obj.clearCart = function () {
        cart = [];
        saveCart();
    }


    obj.countCart = function () { // -> return total count
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function () { // -> return total cost
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function () { // -> array of Items
        var cartCopy = [];
        
        for (var i in cart) {
            // console.log(i);
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    // ----------------------------
    return obj;
})();

var initHAIJS = function (clientId) {
    if (!clientId) {
        console.error('Invalid clientId');
        return;
    }
    var head = document.head;
    // var script = document.createElement('script');
    // script.type = 'text/javascript';
    // script.onload = function() {
    //   addScript()
    // }
    // script.src = 'https://www.gstatic.com/firebasejs/5.0.4/firebase-app.js';

    // head.appendChild(script);

    localStorage.avd_clientid = clientId;

    //   function getLink(productT, productD, productI, productU, next)
    //   {
    //       var xmlHttp = new XMLHttpRequest();
    //       xmlHttp.onreadystatechange = function() {
    //           if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
    //               next(xmlHttp.responseText);
    //           if (xmlHttp.readyState == 4 && xmlHttp.status !== 200)
    //               console.error(xmlHttp.responseText);
    //       }

    //       if(!productU)
    //         productU= location.href;

    //       var data = {
    //         userId: localStorage.avd_uid,
    //         productTitle: productT,
    //         productDescription: productD,
    //         productImage: productI,
    //         clientId: localStorage.avd_clientid,
    //         productUrl:  productU
    //       };

    //       xmlHttp.open("POST", 'https://chitooo-dev-api.herokuapp.com/branch/create', true);
    //       xmlHttp.setRequestHeader('Content-Type', 'application/json');
    //       xmlHttp.setRequestHeader('Accept', 'application/json, text/javascript');
    //       xmlHttp.send(JSON.stringify(data));
    //  }

    var btns = document.querySelectorAll("button.avd-share");
    if (!btns || !btns.length) {
        return
    }

    function addScript() {
        var head = document.head;
        var authscript = document.createElement('script');
        authscript.type = 'text/javascript';
        authscript.onload = function () {
            firebase.initializeApp({
                apiKey: "AIzaSyDzsnK95nH1ozr8C-DTyyycTlNNgWZGVGk",
                authDomain: "chhitooo-9912f.firebaseapp.com",
                databaseURL: "https://chhitooo-9912f.firebaseio.com",
                storageBucket: "chhitooo-9912f.appspot.com"
            });
        }

        authscript.src = 'https://www.gstatic.com/firebasejs/5.0.4/firebase-auth.js';
        head.appendChild(authscript);
    }

    function copyBtn() {
        var el = document.createElement('div');
        el.classList.add('copy-link');
        el.style.cursor = 'pointer';
        el.style.float = 'right';
        el.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAABGdBTUEAALGPC/xhBQAAA+pJREFUWAnNWE1IVFEUPve+54w6GhOZgaUhIaQU2TJ/NoULqaCMXLRoUYt+oBSCAve1KAIrKCPcBIFYaFDiYgoLzWiVEWgQ5V9aSTYjOqmj793OuTNv5s04781Mac2dxbtz7/n53r3nnnO/xyDFVjV6Zv3snL6fMb0GVYsEQAEIViDNMDHJACaxPyYE9+Tm8K6+rXe8qbhA/eTarsHTh5nQz6F0tQChJqPFgC2jXK9g/Na7spbO5HQSSJV/OF0Jun5VCFGRQNR2mjHWD5xfHNje8spO0HKFjop25ePQ8+tC6A12BlKdY4zfKCndd+Ehq9fi6cYFVD7c6IZ5f7sQQHGy6o0x8ECWq36guNkXa3wFIAnml78fg7U0Vng1/6PjIch2VcSC4mYntE1yZdYYDPmUL4y7IH2aQEQBCsbM2myTyWe4SyFBPsMD2AlvGZ0moWl95sl/1WeKUmWcvkg+waOdKoBCRz5c2XwSdmYVJ1S9OdUB96c9sCziHK6g70oyIleIkh4IrSOhVZNABlPhQXETeLVZGA18N83E6zLYm7sbbk89hg6fxSYwpY6Sp1whysAYZCk1TejQNfMGHnlfgl9fSKjrxBcoydxiKReqAp0q1aa5Oa3aUjJmwskyIFfJxlGBb9sLmdwBWdwZIwWwJJZhRvOHx7GMgI4/m1ZNWFS/f/kArk4klmw0tjkLZMy4lRwbqchUu/cFtP7ojgzY9Kg+EhZVB4bZOLkNO+jeAz5tDi59uYca9jo7MNAbNtVB28+epLaUsBIWlYEotDcdeS0HbtfE0jSMBL5FBi16Tp4BOsaZwqJSnYV0cJiwcAQTvMvYigYnaVWUSOqy1VAgeSCGIcLCw5crY/R/PvGix4FhAk+XhlhoXb+mCx7CwjFV0x04LRphoRUaSws0QRBjtELP0gUQMRXucqlPQ+xgTXFpsmzIWh7XD2Eg2sRDvKk3rtQqDOp4iKn2FWTkyfpmY7KXsMjsRbzJRvCvpqjIHnFXQ566Dp74XlvaMjBIQHQPkbzJUvzPJxxYQtq8PXDs82X4tBj/QJNvg0hKQNIdkrhEbqkcJJtFl/BmyLGOUdQs6AFYFEvW5k2+o6KsfPBUsx0xrHNXwdn8Q9Az+zYhsCLHRnDxLDgxcs02dog4DpTdbTTQRgEKslVPtxVBVJkCxzfUwPn8OkPf8vl+fhiaJlphPDBlKUOEsaS0ptbMYqMAkWZaEUUCJJkkMkpJd2lgDZq0HYe1kqtIUJscEyhaStpf0/CqdIMfG2pqYym0YXzFlhkTxjNtPscYgIxn2nywMgAZT6IqxA7oQh66j6/4pCeAjWPG8lCdTPWT3m8dG4YjTezQ0gAAAABJRU5ErkJggg==')"
        el.style.width = '36px';
        el.style.height = '36px';

        el.addEventListener("click", function () {
            var btn = this;
            var copyText = btn.parentNode.parentElement.querySelector("input");
            copyText.select();
            document.execCommand("copy");
        })

        return el;
    }

    function shareDiv() {
        var el = document.createElement('div');
        // var messenger = document.createElement('img');
        // messenger.setAttribute('width', '32px');
        // messenger.setAttribute('src', "data:image/png;base64,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");
        // messenger.addEventListener('click', function(){
        //   var btn = this;
        //   var copyText = btn.parentNode.parentNode.querySelector("input");
        //   copyText.select();
        //   document.execCommand("copy");

        //   window.open('https://messenger.com', '_blank')
        // })

        // var viber = document.createElement('img');
        // viber.setAttribute('width', '32px');
        // viber.setAttribute('src', " data:image/png;base64,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");
        // viber.addEventListener('click', function(){
        //   var btn = this;
        //   var copyText = btn.parentNode.parentNode.querySelector("input");
        //   copyText.select();
        //   document.execCommand("copy");

        //   window.open('https://viber.com', '_blank')
        // })

        // var whatsapp = document.createElement('img');
        // whatsapp.setAttribute('width', '32px');
        // whatsapp.setAttribute('src', " data:image/png;base64,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");
        // whatsapp.addEventListener('click', function(){
        //   var btn = this;
        //   var copyText = btn.parentNode.parentNode.querySelector("input");
        //   copyText.select();
        //   document.execCommand("copy");

        //   window.open('https://web.whatsapp.com', '_blank')
        // })

        // var snapchat = document.createElement('img');
        // snapchat.setAttribute('width', '32px');
        // snapchat.setAttribute('src', " data:image/png;base64,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");
        // snapchat.addEventListener('click', function(){
        //   var btn = this;
        //   var copyText = btn.parentNode.parentNode.querySelector("input");
        //   copyText.select();
        //   document.execCommand("copy");

        //   window.open('https://www.snapchat.com', '_blank')
        // })

        // var skype = document.createElement('img');
        // skype.setAttribute('width', '32px');
        // skype.setAttribute('src', " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAlCAYAAAAqXEs9AAAABGdBTUEAALGPC/xhBQAACCFJREFUWAmdWHmMFFUa/73qu4c5RRgOJ0jQ6OIKyL1mFBBB8eBwJRhdsyq6CZoYjdnNrhoxnn+g8YyaiIgaOaIw6CrqRjHiqGhWUTRy6KjrAajDTM/0dPd017G/r6pruqu6epjwdaqr6r3vfe/3vvO9UhiM2nr/gJCaAtOaBtNogQq9BWV9if7c51g+Ij3Y0GPtU4ED23ougqZuhIk/IRJJ2DyWCWghoNBv8X0fYG2EZXwCQ6URDhmw+FOhPHlSyMYOYjnbj4G8gF7orENt5EEo7Rp7cj3PeWV+H4XCQCgCGDqoOXaSx2EzoZCDUr8Aahc7/42Q9SYubOjySaj6WgK0zaqF2bMJ8eT5yGWcSaoOq9ZBcSJRNCmARatmoQOmeobAnsJFdb9XG+m2a+4DzNQaB0wfmwK0MsA42INoipdoLp8V85JZG49o7G7e27Gt+9LBRkufo6G21EJo4ddh6lqgiapJqYa7pPfSSNGYCDfNhxCt/ScWKUFbQQqrLQ2TUtsRjS9APlfBUNEgIEz+aQp1EeeKU8+CIUcL9egWUnn2F3mKS3bEKHJFGSP9mc3ozV2NK5vFHB5S2NJzMpS5m46YGFQ7AoTXafUa/jwmgrOGhzE+qaGeoKJFwxcIKEVA36ZNvP2bjk0/F/BNDxvpUh6KJQmq7wU0NFyFuYr2LREBpVYgFtswqHYIJEGhq0+NY9WJUQwLB9mkJNR96qSm1hzoxwO8CrKg8mGiqUL2VixpuNfllzvXZs4ubwh6FpM8MzWJv58UGzIYkXNcVOG+iXE8PjnB/OqTLA6vwrehLTWzvEeUPRWG5JIqZFi4YUIMK2gmPx3KWXjjsI51P+Tt64Mjkh8r6dpxUSwZzfHiVy5JSgiHxU3uwQ6Lic0hPmgbEI6cCaPgtnnuEZrnirGVYJ74Lo+7vs7hIEG5vqfR0ZeT96kpCdT5zHoZ21/+yTeHBFE4Mg/dXedy0u0yscbatNfJFx4czgvnqqXTjogVvbbIsp9Oe+OeLA5KFZEusQcvk7eN1NZNeyqjdWSMnX6ziTzNHvy3omiKy+BT5p8f7ezqtpbdZT4u3EOy+rHiWOUmcDnYt+77PDb6tPEhzRnIX2B5gjUPW7vGiQgNl7POWKqdqpP3CsrT1HnfxM1xhbZZSVxMv6qVBYoL0tdYjG3iE1btzmIttfVlj4Enad7799OJ/SsTbvGlaLyWT63y6jiTUntZUOXdS5yrl/H6FXPJCQlv/+l1IWybVYNv+kx80Knj/U4Du7oM7Esb6OeYLppz5X+ziHKGvGQa0bJP0wOTOXNP5/vzRe82q24VpDTduTeHGY01aGIY+2lCjYYJNVFc2cJcx8XuJ6B3fzfw2qECdhJoRrK2aHEwkh2DpU4SFieHrvjXDIbgeXZR9A+krJ/6LHySMjD3+LCdmf0s7rsE1kgGwMzGEK44IYrFoyIIEcwejtXFnNVwadS+ZXbh1Pjaoh2EexAi7B2/6pi7sw9P02GPyKqHQKfRrI+ensCrs2swmn4XmKREjoizEMPZdwg0Ie0oiIQF6KC/XPtpFmfsSGPlZ1k7kqTN5/O2xPK/c6jZ9dOSkMAMJFtzlo45MItObUnsVSeB6+4cGSk/ZEys7ejHWkZPHf3qlFoNs2mmeZy4lUW3kbnLT/PZt5RRuYGRV+FTjlOnWOBNF3M39yl+Gc471bmMWXbd9CQeYk1qYYW3SRyVjz2MqI8ZYQ+zgC7+MINp76QhWTzIqOJTnLRyHrtNdUqHoyFD76B0ySbejQIxLhoVxkszkgP+OLMxjHPb00iXh7I9hzNRB7W36rOMraUVvpJzIhcjyqgAK9rXVFQAOcs1zK/p5d9BNu/lRMazaYLyNc1qCmHluFhw1pWxwkz5sh/yU1Vfky2vZU7H5t7jHUD2GcvajrAN0iPnsH3q8TThlglRjK2hMoOsLMvnNaneq2yRcIABYAWhkjwUio5CzJzqABJuTT3HIpv32JgOLNuLrJSFMhrDrL1+agLjmBTtkiH9xUtw/oMbueu45fDTK0yWlfYqcknpMnFKyRqWpbC1+yXEksvsE4MrjVp4jNuJ67lT9NMhau9t5qcDzM6CR4C2Dg9hYm2ldqS0LKDvZYO0KoLlEKDn3ysBksatXZN5+tjJEB9G3UqLvaIGhvFWFtM59KdjIdmuXPxRH/bJ/rpkE68oe/OfvdfbvbRxN4/H9/McVWIm5G6G9iW7Mnj2f/mjJsHSQOep7WABC9uPAkZYRQEKn3s1JB2vH4ihf8QmxBKLeVyRFoeKbiTJ768tETsBNjP1+rOvnDwOs8q200TP/ZjHdvqgnVMrZ3IlO7nJMjPQtEnBbC/+MhzJYVu4T2n1gBIRRUvWM0OPTig738SZJEWQVPsUtfkzD2hHZGsr5LWB0+b/j8Z5Asm9gd31FwQDkgFbDo2AlljPg915tpPbyyyTVJwvMGpEanXJZUKEj4xamAVRX4Ql9W9Wx7+s+VeE+i7heW0NP7MUECnzKxHpTioS/NdQwYgcOTQa+XVYUveWvA5t6Cu988h6O/nn2NlcPtNUq30idSgkmhEwucx/UDAuxfKmlAwbGiDhXL0jjClnLGQx+gu9dA7vI53MTtuJ+QYk8UEiRmcStL8dyeAyEiCibZ1bNstcz6i+GUsbu12OATFuw5Dur6WboWMyZ/wjkYyh0DqC4s/KEmg/vxWMpB1b+dyCCBOqHERtX6FtCzyMKfUOwT4iPuOf79gA+aUEvW9ONSGmTWLXRJp3PkuTfKziVzV9FxY3fRE0RNr+DzMB+4KhZFS8AAAAAElFTkSuQmCC");
        // skype.addEventListener('click', function(){
        //   var btn = this;
        //   var copyText = btn.parentNode.parentNode.querySelector("input");
        //   copyText.select();
        //   document.execCommand("copy");

        //   window.open('https://skype.com', '_blank')
        // })

        // el.append(messenger)
        // el.append(viber)
        // el.append(whatsapp)
        // el.append(snapchat)
        // el.append(skype)
        // el.append(copyBtn())
        return el;
    }

    function getButton(productTitle, info, image, url) {
        var container = document.createElement('div');
        container.classList.add('avd-share');
        container.style.padding = '0em 0em';
        container.style.display = 'inline-flex';
        container.style.position = 'relative';

        var btn = document.createElement('button');
        btn.classList.add('lnr')
        btn.classList.add('lnr-cart')
        btn.classList.add('cart')
        btn.style.display = 'inherit';
        var spanCount = document.createElement('span');
        spanCount.classList.add('badge');
        spanCount.id= 'cart-total-top';
        spanCount.style.backgroundColor = 'rgb(99, 148, 248)'
        spanCount.style.borderRadius ='10px'
        spanCount.style.color = 'white';
        spanCount.style.fontSize = '10px';
        spanCount.textContent = '0';
        spanCount.style.marginLeft = '3px';
        spanCount.style.paddingBottom = '4px';
        // btn.style.width = '25px';
        // btn.style.height = '25px';
        // btn.style.borderRadius = '45%';
        // btn.style.background = " url('/img/cart.png')";
        // btn.style.backgroundSize = 'cover';
        // btn.style.backgroundRepeat = 'no-repeat';
        // btn.style.backgroundPosition = 'center center';
        // btn.style.border = '0';
        // btn.style.color = '#fff';
        // btn.style.fontWeight = '200';
        // btn.style.fontSize = '110%';
        // btn.style.boxShadow = '2px 2px 10px #605F60';
        btn.append(spanCount)
        btn.addEventListener("click", function () {
            var uid = localStorage.avd_uid || 'uyubbb';
            if (!uid) {
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // console.log(user,'user')
                    localStorage.setItem('fb_firebase_profile', JSON.stringify(user));
                    localStorage.setItem('avd_uid', user.uid);
                }).catch(error => {
                    console.log(error);
                });

            } else {
                var menu = this.parentNode.querySelector(".hai-shopping-cart");
                var menus = document.querySelectorAll('.avd-share .hai-shopping-cart');
                if (!menu.style.display || menu.style.display === "none") {
                    menus.forEach(function (x) {
                        if (x !== menu) {
                            x.style.display = 'none';
                            x.classList.remove('active')
                        }
                    })

                    // getLink(productTitle, info, image, url, function(res){
                    // menu.querySelector('input').value = JSON.parse(res).url;
                    menu.style.display = "block";
                    menu.classList.add('active')
                    displayCart(menu)
                    // debugger;
                    // })
                } else {
                    menu.classList.remove('active')
                    menu.style.display = "none";
                }

            }
        });

        container.append(btn);

        var menu = document.createElement('div');
        menu.classList.add('hai-shopping-cart');
        menu.style.width = '260px';
        menu.style.boxShadow = '0 10px 40px -14px rgba(0,0,0,.25)';
        menu.style.borderRadius = '3px';
        menu.style.display = 'none';
        menu.style.zIndex = '1';
        menu.style.top = '-20px';
        menu.style.marginLeft = '1em';
        menu.style.padding = '15px';
        menu.style.background = '#fff';
        menu.style.position = 'absolute';
        menu.style.minHeight = '200px';
        menu.style.left = '32px'

        var shoppingCartHeader = document.createElement('div');
        shoppingCartHeader.classList.add("shopping-cart-header");
        shoppingCartHeader.style.borderBottom = '1px solid #e8e8e8';
        shoppingCartHeader.style.paddingBottom = '15px';

        var shoppingCartIcon = document.createElement('i');
        shoppingCartIcon.classList.add('fa');
        shoppingCartIcon.classList.add('fa-shopping-cart');
        shoppingCartIcon.classList.add('cart-icon');
        shoppingCartIcon.style.color = '#515783';
        shoppingCartIcon.style.fontSize = '24px';
        shoppingCartIcon.style.marginRight = '7px';
        shoppingCartIcon.style.float = 'left';

        var shoppingCartCount = document.createElement('span');
        shoppingCartCount.classList.add('badge');
        shoppingCartCount.id = "count-cart";
        var shoppingCartCountStyle = shoppingCartCount.style;
        shoppingCartCountStyle.backgroundColor = "#6394f8";
        shoppingCartCountStyle.borderRadius = '10px';
        shoppingCartCountStyle.color = 'white';
        shoppingCartCountStyle.display = 'inline-block';
        shoppingCartCountStyle.fontSize = '12px';
        shoppingCartCountStyle.lineHeight = '1';
        shoppingCartCountStyle.padding = '3px 7px';
        shoppingCartCountStyle.textAlign = 'center';
        shoppingCartCountStyle.verticalAlign = 'middle';
        shoppingCartCountStyle.whiteSpace = 'nowrap';


        shoppingCartCount.textContent = '3';

        var shoppingCartTotalContainer = document.createElement('div');
        shoppingCartTotalContainer.classList.add('shopping-cart-total')
        shoppingCartTotalContainer.style.float = 'right';

        var shoppingCartTotal = document.createElement('span');
        shoppingCartTotal.classList.add('lighter-text');
        shoppingCartTotal.style.color = '#abb0be';
        shoppingCartTotal.textContent = 'Total : ';

        var shoppingCartTotalCount = document.createElement('span');
        shoppingCartTotalCount.classList.add('main-color-text');
        shoppingCartTotalCount.style.color = '#6394f8';
        shoppingCartTotalCount.id = 'total-cart';
        shoppingCartTotalCount.textContent = '0';

        shoppingCartTotalContainer.append(shoppingCartTotal)
        shoppingCartTotalContainer.append(shoppingCartTotalCount)

        shoppingCartHeader.append(shoppingCartIcon)
        shoppingCartHeader.append(shoppingCartCount)
        shoppingCartHeader.append(shoppingCartTotalContainer)
        // title.innerHTML = 'Refer with Avendy';

        var shoppingCartItemContainer = document.createElement('ul');
        shoppingCartItemContainer.classList.add('hai-shopping-cart-items');
        shoppingCartItemContainer.id = 'show-cart';
        shoppingCartItemContainer.style.paddingTop = '20px';
        shoppingCartItemContainer.style.listStyle = 'none';
        shoppingCartItemContainer.style.maxHeight = '180px';
        shoppingCartItemContainer.style.overflowY = 'scroll';

        var checkoutButton = document.createElement('a');
        checkoutButton.classList.add('hai-checkout-button');
        // checkoutButton.classList.add('show-more-courses')
        checkoutButton.id = 'hai-checkout-button';
        checkoutButton.href = '#';
        checkoutButton.textContent = 'Checkout';
        var checkoutButtonStyle = checkoutButton.style;
        checkoutButtonStyle.background = 'linear-gradient(90deg, #2f3c8d 0%, #79d7ff 100%)';
        checkoutButtonStyle.color = 'white';
        checkoutButtonStyle.textAlign = 'center';
        checkoutButtonStyle.padding = '12px';
        checkoutButtonStyle.textDecoration = 'none';
        checkoutButtonStyle.display = 'block';
        // checkoutButtonStyle.borderRadius = '3px';
        checkoutButtonStyle.fontSize = '12px';

        checkoutButton.style.margin = '25px 0 15px 0'

        menu.append(shoppingCartHeader)
        menu.append(shoppingCartItemContainer)
        menu.append(checkoutButton)
        
        // var tb = document.createElement('input');
        // tb.setAttribute('readonly', '');
        // tb.setAttribute('value', 'please wait..');
        // tb.style.width = '100%';
        // tb.style.border = '0';

        // menu.append(tb);

        // var hr = document.createElement('hr')
        // hr.style.color = '#fff';
        // menu.append(hr);
        menu.append(shareDiv());

        container.append(menu);
        // $('.hai-shopping-cart-total').append(menu)
        return container;
    }

    function displayCart(menu, isCheckoutPage) {
        // Array.from(document.getElementsByClassName("hai-shopping-cart"))
        //   .forEach(element => element.remove());
        var cartArray = shoppingCart.listCart();
        // console.log(cartArray);
        var output = "";
        for (var i in cartArray) {
            output += "<li class='clearfix' style='margin-bottom: 6px; padding-top: 5px;position: relative;left: -40px;width: 255px;'>"

                +
                "<span class='badge item-quantity-count delete-item' data-name='" +
                cartArray[i].name + "' data-course-id='" + cartArray[i].courseid+ "' style='background-color: #6394f8;border-radius: 10px;color: white;display: inline-block;font-size: 12px;line-height: 1;padding: 3px 7px;text-align: center;vertical-align: middle;white-space: nowrap;position: absolute;margin-left: 140px;margin-top: 4px;background-color: tomato;'>X</span>" +
                "<span class='badge' style='background-color: #6394f8;border-radius: 10px;color: white;display: inline-block;font-size: 12px;line-height: 1;padding: 3px 7px;text-align: center;vertical-align: middle;white-space: nowrap;'>" + cartArray[i].count + "</span>" +
                "<img src='" + cartArray[i].image + "' alt='item1' style='float: left; margin-right: 12px; height:75px; width:96px;' />" +
                "<span class='item-name' style='display:block;padding-top: 10px;font-size: 16px;'>" + cartArray[i].name + "</span>" +
                "<span class='item-price' style='color: #6394f8;margin-right: 8px;'>Rs." + cartArray[i].price + "</span>" +
                "<span class='item-quantity' style='color: #abb0be;'> Total:" + cartArray[i].total + " </span>" +
                "<hr class='item-seprator' style='" + (cartArray.length - 1 == i ? 'display:none' : '') + "'>" +
                "</li>";
        }
        // debugger;
        if (menu) {
            menu.childNodes.forEach(function (item) {
                
                if (item.className === 'hai-shopping-cart-items') {
                    item.innerHTML = output;
                }
                if (item.className === 'shopping-cart-items-checkout'){
                     item.innerHTML = output;
                }
                // console.log(output, 'output')
               
                if (item.className === 'shopping-cart-header') {
                    item.childNodes[1].textContent = shoppingCart.countCart();
                     item.childNodes[2].lastElementChild.textContent  = 'Rs.' + shoppingCart.totalCart();
                    // debugger
                }
                if (item.className === 'shopping-cart-header-checkout') {
                    item.childNodes[2].textContent = shoppingCart.countCart();
                    item.childNodes[4].lastElementChild.textContent = 'Rs.' + shoppingCart.totalCart();
                    // debugger
                }
            })
           
         
        }
        if(cartArray.length > 0){
            document.getElementById('cart-total-top').textContent = shoppingCart.countCart();
            document.getElementById('hai-checkout-button').style.display = 'block';
        }else{
             document.getElementById('cart-total-top').textContent = shoppingCart.countCart();
             document.getElementById('hai-checkout-button').style.display = 'none';
        }
        //   document.getElementById('show-cart').innerHTML = output;
        //   document.getElementById('count-cart').innerHTML = shoppingCart.countCart();
        //   document.getElementById('total-cart').innerHTML = shoppingCart.totalCart();
        // // $("#show-cart").html(output);
        // $("#count-cart").html(shoppingCart.countCart());
        // $("#total-cart").html(shoppingCart.totalCart());
    }

    btns.forEach(function (x) {
        var title = x.getAttribute('product-title')
        var info = x.getAttribute('product-info')
        var image = x.getAttribute('product-image')
        var url = x.getAttribute('product-url')

        x.after(getButton(title, info, image, url));
        x.remove();
    })


    // var carts = document.querySelectorAll(".add-to-cart");
    // if (!carts || !carts.length) {
    //   return
    // }

    // carts.forEach(function (x) {
    //   var title = x.getAttribute('product-title')
    //   var info = x.getAttribute('product-info')
    //   var image = x.getAttribute('product-image')
    //   var url = x.getAttribute('product-url')

    //   x.after(getButton(title, info, image, url));
    //   x.remove();
    // })
    var css = '@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);div.avd-share{font-family: Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif!important;} div.avd-share h2{margin: 0.2em 0;color: #666f72} div.avd-share img{ padding: 0.5em 0.3em; cursor: pointer; } div.avd-share .copy-link { position: relative; display: inline-block; .hai-checkout-button:hover{background: #729ef9;} .hai-shopping-cart:after{bottom: 100%;left: 89%;border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;border-bottom-color: white;border-width: 8px;margin-left: -8px;}'
    // var css = '.hai-shopping-cart:after{ bottom: 100%;left: 89%;border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;border-bottom-color: white;border-width: 8px;margin-left: -8px;}'
    var style = document.createElement('style');
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);

    // document.body.addEventListener('click', function (event) {
    //     //console.log(event.srcElement.className, 'event.srcElement.className ==>')
    //     if (event.srcElement.className.includes('delete-item')) {
    //         var name = event.srcElement.getAttribute('data-name');
    //         shoppingCart.removeItemFromCart(name);
    //         event.srcElement.parentElement.remove();
    //         var menu = document.querySelectorAll('.hai-shopping-cart.active');
    //         displayCart(menu[0])
    //     }
    //     if (event.srcElement.className.includes('add-to-cart')) {
    //        // console.log(event.srcElement.getAttribute('data-name'))
    //         var name = event.srcElement.getAttribute('data-name')
    //         var price = Number(event.srcElement.getAttribute("data-price"));
    //         var image = event.srcElement.getAttribute('product-image');
    //         shoppingCart.addItemToCart(name, price, 1, image);
    //         var menu = document.querySelectorAll('.hai-shopping-cart.active');
    //         // debugger;
    //         displayCart(menu[0]);
    //     }
    //     // console.log('list ==>,add-to-cart')
    //     // if (event.srcElement.id == 'btnSubmit') {
    //     //   //someFunc();
    //     // };
    // }, false);
     $(document).on('click', ".add-to-cart", function (event) {
         event.preventDefault();
         var name = $(this).attr("data-name").trim();
         var price = Number($(this).attr("data-price"));
         var image = $(this).attr('product-image');
         var courseid = $(this).attr('data-course-id')
         if (courseid){
         shoppingCart.addItemToCart(courseid, name, price, 1, image);
         }
         var menu = document.querySelectorAll('.hai-shopping-cart.active');
         displayCart(menu[0])
         $(this).notify(
            ""+name+" added to cart", {
                 position: "left",
                 className: "success"
             }
         );
         //  displayCart();
     });
     $(document).on('click', ".delete-item", function (event) {
         event.preventDefault();
         var courseid = $(this).attr("data-course-id");
         shoppingCart.removeItemFromCart(courseid);
         $(this).parent().remove();
         //  var price = Number($(this).attr("data-price"));
         //  var image = $(this).attr('product-image');
         //  shoppingCart.addItemToCart(name, price, 1, image);
         var menu = document.querySelectorAll('.hai-shopping-cart.active');
         displayCart(menu[0])
         var menu2 = document.querySelectorAll('.shopping-cart-checkout-page');
         displayCart(menu2[0])
         //  displayCart();
     });
                //   <form action="http://202.166.194.123:7979/WebCheckout/Checkout" id="checkout-item" method="post">
                //         <input type="hidden" name="TokenId" id="checkout-token" value="201907031509221640">
                //         <input type="hidden" name="MerchantCode" value="NEWTH">
                //         <input type="hidden" name="RefId" id="checkout-reference" value="Ref-9901">
                //         <input type="hidden" name="TranAmount" id="checkout-amount" value="10.75">
                //         <input type="hidden" name="Source" value="W">
                //         <input type="submit" value="Web Checkout">

                //     </form>

    var menu = document.querySelectorAll('.shopping-cart-checkout-page')
    displayCart(menu[0], true)
     $(document).on('click', '.hai-checkout-button', function(){
         if (location.pathname.includes('checkout.html')){
               var amount = document.getElementById('total-cart').textContent.replace('Rs.', '');
              getToken(amount).then(function (result) {
                  $('#checkout-token').val(result.TokenId);
                  $('#checkout-reference').val(result.RefId);
                  $('#checkout-amount').val(amount);
                // console.log(document.forms["checkout-item"], 'form')
                //   setTimeout(function () {
                     
                      document.forms["checkout-item"].submit();
                //   }, 1000);
                 
              }).catch(function (error) {
                  console.log(error, 'errror')
              })

         }else{
            location.href='/checkout.html'
         }
        
        
     })

}
 function getToken(amount) {
     return new Promise(function (resolve, reject) {
     var parameters = {
         "MerchantCode": "NEWTH",
         "Amount": amount,
         "RefId": "NTH-" + (new Date).getTime()
     };
     $.ajax({
         type: "POST",
         url: "http://202.166.194.123:7979/api/Web/GetToken",
         headers: {
             'Authorization': "Basic " + btoa("newth:newth@123"),
             'Content-Type': 'application/json',
             'Module': 'TkVXVEg='
         },
         crossDomain: true,
         data: JSON.stringify(parameters),
         dataType: 'json',
         success: function (responseData, status, xhr) {
             resolve(responseData)
        
         },
         error: function (request, status, error) {
             reject(reject)
         }
     });
     })

 };

initHAIJS('HLcDRAQbH6dq56ba8hehXPLMtuj1')


