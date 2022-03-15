// ready
$(document).ready(function () {

    $('#list_func').change(function () {
        location.href = $(this).val();
    })

    const bodyDoms = [];

    $.ajax({
        type: "POST",
        url: 'https://localhost:44370/api/RentalManagement/GetRentDetail',
        data: "",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            _.forEach(response.data, (val, index) => {
                bodyDoms.push(`
                    <tr>
                      <th scope="row">${index + 1}</th>
                      <td>${val.name}</td>
                      <td>${val.fee}</td>                          
                      <td>
                        <button type="button" class="btn-close" data-type=${val.type} data-seqNo=${val.seqNo} aria-label="Close"></button>
                      </td>
                    </tr>`);
            });

            $("#table_detail > tbody").append(bodyDoms).on("click", "button", removeItem);
        }
    });
})

// 刪除費用
function removeItem() {
    $.ajax({
        type: "POST",
        url: 'https://localhost:44370/api/RentalManagement/DeleteRentItem',
        data: JSON.stringify({ Type: $(this).data("type"), SeqNo: $(this).data("seqno") }),
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            window.location.reload();
        }
    });
}