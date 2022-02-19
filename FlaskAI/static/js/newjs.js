$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();
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
        $('#result').text('');
        $('#result').hide();
        // $('#symptoms').text('');
        // $('#symptoms').hide();
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
                // $('#result').fadeIn(600);
                $('#result').text('Detected :' + data.res_data.disease);
                // $('#symptoms').fadeIn(600);
                // $('#symptoms').text(' Symptoms:  ' + data.res_data.symptoms);
                console.log('Success!');
            },
        });
    });

});
