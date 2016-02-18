$(document).ready(function() {
    $('#submit-button').on('click', postData);

    getData();
});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $('input').val('');

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $('.sql-data').remove();
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data){
            console.log(data);
            totalToDom(data);
        }
    });
}
function totalToDom(peopleData){
    //console.log("hi");
    for (var person in peopleData) {

        var per = peopleData[person];
        //console.log(per);

        $('#person-table').append('<tr class="sql-data"><td>' + per.name + '</td><td>' + per.address + '</td><td>' + per.city + '</td><td>' + per.state + '</td><td>' + per.zip_code + '</td></tr>');
    }
}
