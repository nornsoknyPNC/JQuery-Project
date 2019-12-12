
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function () {
    requestApi();
});

function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot request"),
    })
}
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

// get recipes and ingredients
var getRecipe = (recipe) => {
    recipe.forEach(recs => {
        $('#value').on('change', () => {
            var result = $('#value').val();
            if (recs.id == result) {
                getRecipes(recs);
                ingredients(recs);
                getInstruction(recs.instructions);
            }
        })
    });
}
//display recipe 
var getRecipes = (myData) => {
    var results = "";
    results += `
        <div class="col-3"></div>
        <div class="col-3"><h3>${myData.name}</h3></div>
        <div class="col-3"><img src="${myData.iconUrl}" class="img-fluid" width="150"></div>
        <div class="col-3"></div>
    `;
    $('#card').html(results);
}

// display all ingrediant [name function]
var ingredients = (getout) => {
    var display = "";
    getout.ingredients.forEach(ing => {
        display += `
            <tr>
                <td><img src="${ing.iconUrl}" width="35" class="img-fluid"></td>
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
    for(let i=1; i<ing.length;i++) {
        result += `
            <h5 class="text-primary">Step:${i}<h5>
            <p>${ing[i]}</p>
        `;
    }
    $('#instructions').html('Instructions');
    $('#step').html(result);
}
