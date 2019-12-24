
// get URL
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

// jquer start
$(document).ready(function () {
    $('#ingredient_card').hide();
    $('#step_card').hide();
    $('#counter').hide(); // hide input count
    requestApi();
    // click button add to add number guest
    $('#add').on('click', function () {
        var sum = $('#number').val();
        addNumber(sum);
    });
    // click button minus to minus number guest
    $('#minus').on('click', function () {
        var minusData = $("#number").val();
        minusNumber(minusData);
    })
});

// request API
function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot request Data"),
    })
}

// get value name of recipes from API
var allData = [];
function chooseRecipe(recipe) {
    var option = "";
    allData = recipe;
    recipe.forEach(element => {
        option += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
    $('#value').append(option);
    getRecipe(allData);
}
// get quantity
var getQuantity = [];
var oldGuest = 0;

// get recipes and ingredients
function getRecipe(recipe) {
    recipe.forEach(recs => {
        $('#value').on('change', () => {
            $('#ingredient_card').show();
            $('#step_card').show();
            $('#counter').show(); // show button count
            var result = $('#value').val();
            if (recs.id == result) {
                getRecipes(recs); // get recipe
                getIngredients(recs); // get ingredients
                getInstruction(recs.instructions); // get instructions
                getNbguest(recs);
                getQuantity = recs;
                oldGuest = recs.nbGuests;
            }
        })
    });
}
//display recipe 
function getRecipes(myData) {
    var results = "";
    results += `
    <div class="col-4"></div>
    <div class="col-4" id="text"><h3>${myData.name}</h3><img src="${myData.iconUrl}" class="img-thumbnail"></div>
    <div class="col-4"></div>
    `;
    $('#card').html(results);
}
// get nbguest person
function getNbguest(data) {
    var getGuest = "";
    getGuest += `
        <input type="text" class="form-control text-center" value="${data.nbGuests}" disabled id="number">
    `;
    $('#numbers').html(getGuest);
}
// display all ingrediant of recipes
function getIngredients(getout) {
    var display = "";
    getout.ingredients.forEach(ing => {
        display += `
            <tr>
                <td><img src="${ing.iconUrl}" width="50"  class="img-fluid"></td>
                <td>${ing.quantity} ${ing.unit[0].toLowerCase()}</td>
                <td>${ing.name}</td>
            </tr>
        `;
        $('#ingredient').html('Ingredients');
        $('#ing').html(display);

    })
}
// get instruction
function getInstruction(step) {
    var result = "";
    var ing = step.split('<step>');
    for (let i = 1; i < ing.length; i++) {
        result += `
            <h5 class="text-primary">Step ${i}</h5>
            <p>${ing[i]}</p>
        `;
    }
    $('#instructions').html('Instructions');
    $('#step').html(result);
}

// Increment Guest
function addNumber(number) {
    var add = parseInt(number) + 1;
    if (add <= 15) {
        $("#number").val(add)
        calculatePerson($("#number").val());
    }
}
// Decrement Guest
function minusNumber(number) {
    var minusValue = parseInt(number) - 1;
    if (minusValue >= 1) {
        $("#number").val(minusValue)
        calculatePerson($("#number").val());
    };
};
// calculate the number of nbGuest

function calculatePerson(calculate) {
    var newQuantity;
    var result = "";
    getQuantity.ingredients.forEach(cal => {
        newQuantity = (cal.quantity / oldGuest) * calculate;
        result += `
                <tr>
                    <td><img src="${cal.iconUrl}" width="50" class="img-fluid"></td>
                    <td>${newQuantity}</td>
                    <td>${cal.unit[0].toLowerCase()}</td>
                    <td>${cal.name}</td>
                </tr>
            `;
        $('#ing').html(result);
    });
}