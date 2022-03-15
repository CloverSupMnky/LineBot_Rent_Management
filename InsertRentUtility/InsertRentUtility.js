// ready
$(document).ready(function () {
    $('#btn_back').click(function () {
        location.href = '../index.html'
    })

    $('#btn_add').click(InsertUtilityFee)

    $.ajax({
        type: "POST",
        url: 'https://linebotrentapi.herokuapp.com/api/RentalManagement/GetUtilitySelectList',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            const opts = [];
            _.forEach(response.data, (val) => {
                opts.push(new Option(val.itemValue, val.itemId));
            });

            $("#utility_selectList").append(opts);
        }
    });
})

// 新增固定租金費用
function InsertUtilityFee() {
    if (
        !$("#utility_selectList option:selected").val() ||
        !$("#utility_selectList option:selected").text() ||
        !$("#utility_fee").val()) return;

    const dataVal = JSON.stringify(
        {
            ItemId: $("#utility_selectList option:selected").val(),
            ItemName: $("#utility_selectList option:selected").text(),
            Fee: $("#utility_fee").val()
        }
    )

    $.ajax({
        type: "POST",
        url: 'https://linebotrentapi.herokuapp.com/api/RentalManagement/InsertUtilityFee',
        data: dataVal,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            location.href = '../index.html'
        }
    });
}