$('#new-pizza').on('submit',function () {
    var pizza = {};
    pizza.words = document.getElementById("pizza-words").value;
    pizza.number = parseInt(document.getElementById("pizza-number").value);
    $.ajax({
        type: "POST",
        data :JSON.stringify(pizza),
        url: "/api/pizza",
        contentType: "application/json"
    });
});

$('#new-cake').on('submit',function () {
    var cake = {};
    cake.caption = document.getElementById("cake-caption").value;
    cake.url = document.getElementById("cake-url").value;
    $.ajax({
        type: "POST",
        data :JSON.stringify(cake),
        url: "/api/cake",
        contentType: "application/json"
    });
});

