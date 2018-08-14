// Write your JavaScript code.
(function (window, document, $) {

    function add() {
        $("#modalAdd").modal("show");
        $("#titleAdd").val("");
        $("#notesAdd").val("");
    }

    function edit() {
        $("#modalEdit").modal("show");       
        $("#titleEdit").val($("#clicked").find("li.active").find(".titleP").text());
        $("#notesEdit").val($("#clicked").find("li.active").find(".notesP").text());
    }

    function saveAdd() {
        $.ajax({
            url: "/Home/AddNew",
            cache: false,
            type: "POST",
            data: { "title": $("#titleAdd").val(), "notes": $("#notesAdd").val() },
            success: function (data) {
                $('#clicked').html(data);
                toggle_buttons(false);
            },
            error: error
        });
        $("#modalAdd").modal("hide");

    }

    function saveEdit() {
        $.ajax({
            url: "/Home/EditNew",
            cache: false,
            type: "POST",
            data: { id: $("#clicked").find("li.active").data("pladiId"), "title": $("#titleEdit").val(), "notes": $("#notesEdit").val() },
            success: function (data) {
                $('#clicked').html(data);
                toggle_buttons(false);
            },
            error: error
        });
        $("#modalEdit").modal("hide");
    }

    function deleteTask() {
        if (confirm("Soll das Element wirklich gelöscht werden?")) {
            $.ajax({
                url: "/Home/DeleteItem",
                cache: false,
                type: "POST",
                data: { "id": $("#clicked").find("li.active").data("pladiId") },
                success: function (data) {
                    $('#clicked').html(data);
                },
                error: error
            });
            toggle_buttons(false);
        }
    }

    function error() {
        $("#alertError").show();
        $("#alertError").fadeOut(3000);
    }

    function lenghtControll() {
        console.log($('#titleEdit').val().length);
        if ($('#titleEdit').val().length >= 50 || $('#titleAdd').val().length >= 50) {
            $(".titleWarning").text("Maximale Anzahl Zeichen erreicht!");
            $(".titleWarning").css("color", "red");
        } else {
            $(".titleWarning").text("");
        }
        
        if ($("#notesEdit").val().length >= 199 || $("#notesEdit").val().length >= 199) {
            $(".notesWarning").text("Maximale Anzahl Zeichen erreicht!");
            $(".notesWarning").css("color", "red");
        } else {
            $(".notesWarning").text("");
        }
    }

    function toggle_buttons(enabled) {
        var $aendern = $("#edit"),
            $loeschen = $("#delete");

        if (enabled === false) {
            $aendern.prop("disabled", true);
            $loeschen.prop("disabled", true);

        } else {
            $aendern.prop("disabled", false);
            $loeschen.prop("disabled", false);
        }
    }
    
    function event() {
         $("#clicked").on("click", "li", function () {
             $("#clicked").find("li").removeClass("active");
             $(this).toggleClass("active");
             toggle_buttons(true);
         });
    }

    $(document).ready(function () {
        toggle_buttons(false);
        event();

        $("#add").on("click", add);
        $("#edit").on("click", edit);
        $("#delete").on("click", deleteTask);
        $("#saveAdd").on("click", saveAdd);
        $("#saveEdit").on("click", saveEdit);
        $("#titleEdit").on("keyup", lenghtControll);
        $("#notesEdit").on("keyup", lenghtControll);
        $("#titleAdd").on("keyup", lenghtControll);
        $("#notesAdd").on("keyup", lenghtControll);
        
    });

}(window, document, jQuery));