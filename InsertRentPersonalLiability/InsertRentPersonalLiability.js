// ready
$(document).ready(function () {
    $('#btn_back').click(function () {
        location.href = '../index.html'
    })

    $('#btn_add').click(InsertPersonalLiabilityFee)

    $.ajax({
        type: "POST",
        url: 'https://linebotrentapi.herokuapp.com/api/RentalManagement/GetPersonSelectList',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            const creditor_list = [];
            const debtor_list = [];
            _.forEach(response.data, (val) => {
                creditor_list.push(new Option(val.personName, val.personId));
                debtor_list.push(new Option(val.personName, val.personId));
            });

            $("#creditor_list").append(creditor_list);
            $("#debtor_list").append(debtor_list);
        }
    });
})

// 新增固定租金費用
function InsertPersonalLiabilityFee() {
    if (
        !$("#creditor_list option:selected").val() ||
        !$("#debtor_list option:selected").val() ||
        !$("#person_fee").val() ||
        !$("#person_desc").val()) return;

    const dataVal = JSON.stringify(
        {
            CreditorId: $("#creditor_list option:selected").val(),
            DebtorId: $("#debtor_list option:selected").val(),
            Description: $("#person_desc").val(),
            Fee: $("#person_fee").val()
        }
    )

    $.ajax({
        type: "POST",
        url: 'https://linebotrentapi.herokuapp.com/api/RentalManagement/InsertPersonalLiabilityFee',
        data: dataVal,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            location.href = '../index.html'
        }
    });
}