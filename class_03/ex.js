function Category(type, name, image) {
    this.type = type;
    this.name = name;
    this.image = image;
}

function Product(type, name, description) {
    this.type = type;
    this.name = name;
    this.description = description;
}

$(document).ready(function(){
    // Creates the categories from JSON
    var toys = new Category("toys", "Toys", "https://source.unsplash.com/collection/190727/100x100")
    
    // Creates the products from JSON
  
    loadCategories();
});

function loadCategories() {
    $.ajax({
        url: 'http://127.0.0.1/categories.json',
        dataType: 'json',
        success: function (data) {
            data.data.forEach(function($obj) {    
                var categorie_detail = $("#categorie-detail").clone();

                categorie_detail.find(".categorie-img-detail").attr("src", $obj.image);

                categorie_detail.find(".categorie-description-detail").text($obj.name);
                
                categorie_detail.attr("onClick", "loadProducts('"+$obj.type+"');");

                $("#categories-list").append(categorie_detail)
            })
        },
    });
}

function loadProducts(type) {
    $.ajax({
        url: 'http://127.0.0.1/products.json',
        dataType: 'json',
        success: function (data) {
            
            $("#products-list").empty();
            
            data.data.forEach(function(obj) {
                if (obj.type == type) {
                    var product = $("#template .list-group-item").clone();

                    product.find(".product-name").text(obj.name);
                    
                    product.find("button").attr("id", "product-" + obj.id);
                    
                    product.find("button").attr("onClick", "loadProductDetail("+ obj.id+")");

                    $("#products-list").append(product)
                }                    
            })
        },
    });
}

function loadProductDetail(id) {
    $.ajax({
        url: 'http://127.0.0.1/products.json',
        dataType: 'json',
        success: function (data) {
            data.data.forEach(function(obj) {
                if (obj.id == id) {
                    $("#product-detail").find(".card-title").text(obj.name);
                    $("#product-detail").find(".card-text").text(obj.description);
                }                    
            })
        },
    });
}