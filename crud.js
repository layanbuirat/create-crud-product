// Mock data store (in a real app, use a backend database)
let products = [];

// Function to render the product list
function renderProductList() {
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '';

    products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `
            <span>${product.name} - ${product.category} - $${product.price}</span>
            <button onclick="editProduct(${index})">Edit</button>
            <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productListDiv.appendChild(productDiv);
    });
}

// Function to create a new product
document.getElementById('createProductBtn').addEventListener('click', () => {
    Swal.fire({
        title: 'Create Product',
        html: `
            <input id="productName" class="swal2-input" placeholder="Product Name">
            <input id="productDescription" class="swal2-input" placeholder="Description">
            <input id="productPrice" type="number" class="swal2-input" placeholder="Price">
            <input id="productCategory" class="swal2-input" placeholder="Category">
        `,
        preConfirm: () => {
            const name = document.getElementById('productName').value;
            const description = document.getElementById('productDescription').value;
            const price = document.getElementById('productPrice').value;
            const category = document.getElementById('productCategory').value;

            if (!name || !description || !price || !category) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, description, price: parseFloat(price), category };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            products.push(result.value);
            renderProductList();
            Swal.fire('Product Created!', '', 'success');
        }
    });
});

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    Swal.fire({
        title: 'Edit Product',
        html: `
            <input id="productName" class="swal2-input" value="${product.name}" placeholder="Product Name">
            <input id="productDescription" class="swal2-input" value="${product.description}" placeholder="Description">
            <input id="productPrice" type="number" class="swal2-input" value="${product.price}" placeholder="Price">
            <input id="productCategory" class="swal2-input" value="${product.category}" placeholder="Category">
        `,
        preConfirm: () => {
            const name = document.getElementById('productName').value;
            const description = document.getElementById('productDescription').value;
            const price = document.getElementById('productPrice').value;
            const category = document.getElementById('productCategory').value;

            if (!name || !description || !price || !category) {
                Swal.showValidationMessage('Please fill all fields');
                return false;
            }

            return { name, description, price: parseFloat(price), category };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            products[index] = result.value;
            renderProductList();
            Swal.fire('Product Updated!', '', 'success');
        }
    });
}

// Function to delete a product
function deleteProduct(index) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            products.splice(index, 1);
            renderProductList();
            Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
        }
    });
}

// Initial render
renderProductList();
