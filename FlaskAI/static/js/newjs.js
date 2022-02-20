$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
    $('#management').hide();
    $('#symptoms').hide();
    $('#disease').hide();
    
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').attr( 'src', e.target.result );
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#symptoms').hide();
        $('#symptoms_data').hide();
        $('#management').hide();
        $('#management_data').hide();
        $('#disease').hide();
        readURL(this);
    });
    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                console.log(data)

                $('#disease').fadeIn(300);
                $('#disease').text("Predection:  " + data.res_data.disease);

                $('#management').fadeIn(300);
                $('#management_data').fadeIn(300);
                $('#management_data').text(data.res_data.management);

                $('#symptoms').fadeIn(300);
                $('#symptoms_data').fadeIn(300);
                $('#symptoms_data').text(data.res_data.symptoms);
                console.log('Success!');
            },
        });
    });

});
