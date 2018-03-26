$(function () {
    //Create a new burger when submit button is clicked
    $(".form-inline").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log('click on button');

        var newBurger = {
            //Grab name of burger and whether you've eaten it or not
            name: $("#name").val().trim(),
            devoured: $("[name=devoured]:checked").val().trim()
        };

        // Send the POST request. Include the newBurger object created as part of the request. Use the correct route, and POST since its NEW data
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //Change whether the burger has been eaten or not
    $(".change-devoured").on('click', function (event) {
        var id = $(this).data("id");
        //console.log(id);
        var newDevoured = $(this).data("newdevoured");
        console.log(newDevoured);
        if (newDevoured === false) {
            newDevoured = true;
        } else {
            newDevoured = false;
        }
        

        var newDevouredState = {
            devoured: newDevoured
        }
        //console.log(newDevouredState);

        // Send the PUT request.
        $.ajax("/api/burger/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(
            function () {
                console.log("changed devoured to", newDevouredState);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    //Delete a burger
    $('.delete-burger').on('click', function (){
        console.log('delete burger was clicked');
        var id = $(this).data("id");
        console.log(id);

        $.ajax('/api/burger/'+id, {
            type: 'DELETE',
        }).then( function() {
            console.log("Burger deleted, id: "+id)
            location.reload();
        }); 
    });
    //Show placeholder image when no burgers in a box
    if ( !($('.burgers-eaten').has("li").length)) {
        $('.burgers-eaten').prepend('No burgers eaten yet!')
    };

    if ( !($('.burger-not-eaten').has("li").length)) {
        $('.burger-not-eaten').prepend('All the burgers have been eaten!')
    };

    
});