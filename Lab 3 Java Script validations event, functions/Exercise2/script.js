let cart = [];
let appliedCoupon = "";

function addToCart() {
    const select = document.getElementById('productSelect');
    const name = select.value;
    const price = parseFloat(select.options[select.selectedIndex].dataset.price);
    const category = select.options[select.selectedIndex].dataset.cat;
    const qty = parseInt(document.getElementById('prodQty').value);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push({ name, price, category, quantity: qty });
    }
    
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function calculateTotals() {
    let subtotal = 0;
    let discountAmount = 0;
    let messages = [];

    cart.forEach(item => {
        let itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        if (item.quantity > 5) {
            let d = itemTotal * 0.10;
            discountAmount += d;
            messages.push(`Bulk Discount (10% off ${item.name})`);
        }

        if (item.category === "Grocery" && item.quantity >= 10) {
            discountAmount += 5;
            messages.push("Grocery Bundle -$5");
        }
    });

    const hour = new Date().getHours();
    if (hour >= 14 && hour <= 16) {
        discountAmount += subtotal * 0.05;
        messages.push("Happy Hour (5% off total)");
    }

    const couponVal = appliedCoupon.trim().toUpperCase();
    if (couponVal.startsWith("SAVE") && couponVal.length === 6) {
        const percent = parseInt(couponVal.substring(4)); 
        if (!isNaN(percent)) {
            discountAmount += (subtotal * (percent / 100));
            messages.push(`Coupon ${couponVal} (${percent}% off)`);
        }
    }

    return {
        subtotal: subtotal.toFixed(2),
        discountTotal: discountAmount.toFixed(2),
        total: (subtotal - discountAmount).toFixed(2),
        messages: messages.length > 0 ? messages.join(", ") : "None"
    };
}

function renderCart() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} (${item.category}) - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(li);
    });

    const result = calculateTotals();
    document.getElementById('subtotal').innerText = result.subtotal;
    document.getElementById('discounts').innerText = result.messages;
    document.getElementById('total').innerText = result.total;
}

function applyCoupon() {
    appliedCoupon = document.getElementById('couponInput').value;
    renderCart();
}