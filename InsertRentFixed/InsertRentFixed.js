// ready
$(document).ready(function () {
    $('#btn_back').click(function () {
        location.href = '../index.html'
    })

    $('#btn_add').click(InsertFixedFee)

    $.ajax({
        type: "POST",
        url: 'https://localhost:44370/api/RentalManagement/GetFixedSelectList',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            const opts = [];
            _.forEach(response.data, (val) => {
                opts.push(new Option(val.itemValue, val.itemId));
            });

            $("#fixed_selectList").append(opts);
        }
    });
})

// 新增固定租金費用
function InsertFixedFee() {
    if (
        !$("#fixed_selectList option:selected").val() ||
        !$("#fixed_selectList option:selected").text() ||
        !$("#fixed_fee").val()) return;

    const dataVal = JSON.stringify(
        {
            ItemId: $("#fixed_selectList option:selected").val(),
            ItemName: $("#fixed_selectList option:selected").text(),
            Fee: $("#fixed_fee").val()
        }
    )

    $.ajax({
        type: "POST",
        url: 'https://localhost:44370/api/RentalManagement/InsertFixedFee',
        data: dataVal,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            location.href = '../index.html'
        }
    });
}