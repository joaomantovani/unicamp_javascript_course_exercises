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

var httpUrl = 'http://localhost:63342/unicamp_javascript_course_exercises/class_03/';

$(document).ready(function(){
    loadCategories();
});

function loadCategories() {
    $.ajax({
        url: httpUrl + 'categories.json',
        dataType: 'json',
        success: function (data) {
            data.data.forEach(function(obj) {
                var category_detail = $("#categorie-detail").clone();

                category_detail.find(".categorie-img-detail").attr("src", obj.image);

                category_detail.find(".categorie-description-detail").text(obj.name);
                
                category_detail.attr("onClick", "loadProducts('"+obj.type+"');");

                $("#categories-list").append(category_detail)
            })
        },
    });
}

function loadProducts(type) {
    $.ajax({
        url: httpUrl + 'products.json',
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
        url: httpUrl + 'products.json',
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
