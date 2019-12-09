

function getUrl() {
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(function() {
    requestApi();
    $('#recipe').on('change',() => {
        var chooseRecipe = $('#recipe').val();
        getRecipe(chooseRecipe);
    })
});

function requestApi() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Cannot request"),
    })
}
var getAllData = [];
function chooseRecipe(recipe) {
    var option ="";
    allData = recipe;
    recipe.forEach(element => {
        option +=`
            <option value="${element.id}">${element.name}</option>
        `;
    });
    $('#recipe').append(option);
}

// get recipe
// function getRecipe(recipe) {
//     switch(recipe) {
//         case 0:
//             computeHTML();
//             break;
//     }
// }
