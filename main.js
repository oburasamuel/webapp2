function redirectToProductAdd() {
  // Redirect to the "Product Add" page
  window.location.href = "product_add.html";
}

function massDelete() {
  const checkboxes = document.querySelectorAll('.delete-checkbox');
  const selectedItems = [];

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      // Assuming each row's SKU is unique and stored in the first cell of the row
      selectedItems.push(checkbox.parentNode.nextElementSibling.textContent);
    }
  });

  // Implement your logic to delete the selected items here
  console.log("Selected SKUs to delete:", selectedItems);
}

        const notification = document.getElementById("notification");
        const productType = document.getElementById("productType");
        const specialAttribute = document.getElementById("specialAttribute");
        
        productType.addEventListener("change", () => {
            const selectedType = productType.value;
            specialAttribute.innerHTML = getSpecialAttributeHTML(selectedType);
        });
        
        function getSpecialAttributeHTML(type) {
            switch (type) {
                case "DVD":
                    return `<label for="size">Size (MB):</label>
                            <input type="number" id="size" required>`;
                case "Book":
                    return `<label for="weight">Weight (Kg):</label>
                            <input type="number" id="weight" required>`;
                case "Furniture":
                    return `<label for="height">Height (cm):</label>
                            <input type="number" id="height" required><br>
                            <label for="width">Width (cm):</label>
                            <input type="number" id="width" required><br>
                            <label for="length">Length (cm):</label>
                            <input type="number" id="length" required>`;
                default:
                    return "";
            }
        }

        document.getElementById("saveButton").addEventListener("click", () => {
            const sku = document.getElementById("sku").value;
            const name = document.getElementById("name").value;
            const price = document.getElementById("price").value;
            const selectedType = productType.value;

            // Validate and check for required fields
            if (!sku || !name || !price) {
                notification.textContent = "Please, submit required data";
                return;
            }

            // Validate and check for specific attributes
            const specialAttributeInputs = specialAttribute.querySelectorAll("input");
            let isValid = true;
            specialAttributeInputs.forEach(input => {
                if (input.hasAttribute("required") && !input.value) {
                    notification.textContent = `Please, provide ${getSpecialAttributeLabel(selectedType)}`;
                    isValid = false;
                }
            });

            if (!isValid) {
                return;
            }

            // TODO: Check for unique SKU and perform save action
            // For now, we'll just log the collected data
            const productData = {
                sku,
                name,
                price,
                type: selectedType
            };
            if (selectedType === "DVD") {
                productData.size = document.getElementById("size").value;
            } else if (selectedType === "Book") {
                productData.weight = document.getElementById("weight").value;
            } else if (selectedType === "Furniture") {
                productData.height = document.getElementById("height").value;
                productData.width = document.getElementById("width").value;
                productData.length = document.getElementById("length").value;
            }

            console.log("Product Data:", productData);

            // Redirect to the product list page
            window.location.href = "product_list.html";
        });

        document.getElementById("cancelButton").addEventListener("click", () => {
            // Redirect to the product list page without saving
            window.location.href = "product_list.html";
        });

        function getSpecialAttributeLabel(type) {
            switch (type) {
                case "DVD":
                    return "size";
                case "Book":
                    return "weight";
                case "Furniture":
                    return "dimensions";
                default:
                    return "";
            }
        }