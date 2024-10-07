const foods = document.getElementsByClassName('food');
        const cart = document.getElementById('cart');
        const totalElement = document.getElementById('ordertotal'); 
        const clickedItems = {};

        function foodClick(event) {
            const food = event.currentTarget;
            const itemId = food.id;
            const itemName = food.querySelector('h3').textContent;
            const itemPrice = parseFloat(food.querySelector('.price').textContent); 

            if (clickedItems[itemId]) {
                clickedItems[itemId].count++;
            } else {
                clickedItems[itemId] = {
                    name: itemName,
                    price: itemPrice,
                    count: 1,
                };
            }

            updateCart();
        }

        function updateCart() {
            cart.innerHTML = '';
            let total = 0; 

            for (const itemId in clickedItems) {
                const item = clickedItems[itemId];
                // const listItem = document.createElement('li');
                const quantityContainer = document.createElement('div'); 
                const quantityText = document.createElement('span'); 
                const addButton = document.createElement('button');
                const subtractButton = document.createElement('button');

                addButton.textContent = '+';
                subtractButton.textContent = '-';

                quantityText.textContent = item.count; 

                addButton.addEventListener('click', () => {
                    addItem(itemId);
                });

                subtractButton.addEventListener('click', () => {
                    removeItem(itemId);
                });


                quantityContainer.appendChild(subtractButton); 
                quantityContainer.appendChild(quantityText); 
                quantityContainer.appendChild(addButton);  

                listItem.textContent = `${item.name} - $${item.price * item.count}`;
                listItem.appendChild(quantityContainer); 
                cart.appendChild(listItem);

                total += item.price * item.count; 
            }

            totalElement.textContent = `total amount: $${total.toFixed(2)}`; 
        }

        function addItem(itemId) {
            if (clickedItems[itemId]) {
                clickedItems[itemId].count++;
            }
            updateCart();
        }

        function removeItem(itemId) {
            if (clickedItems[itemId]) {
                clickedItems[itemId].count--;
                if (clickedItems[itemId].count <= 0) {
                    delete clickedItems[itemId];
                }
            }
            updateCart();
        }

        // foods.forEach((card) => {
        //     food.addEventListener('click', foodClick);
        // });