
    $(".modbtn").on("click", function(){
      var company = $(this).closest('tr').children("td")[2].innerHTML;
      var base_cd = $(this).closest('tr').children("td")[4].innerHTML;
      var route_cd = $(this).closest('tr').children("td")[6].innerHTML;
      var route_name = $(this).closest('tr').children("td")[7].innerHTML;

      $('#largeModal #Route_cd').val(route_cd);
      $('#largeModal #Route_name').val(route_name);


      $('#largeModal .inp_companys').find('option').each(function() {
        var val2 = $(this).val();
        if (company == val2) {
          $('#largeModal .inp_companys').val(company);
        } else {
          $(this).attr('disabled', 'disabled');
        }

      });

      $('#largeModal .inp_base_cd').find('option').each(function() {
        var val2 = $(this).val();
        if (base_cd == val2) {
          $(this).attr('selected', true);
        } else {
          $(this).attr('disabled', 'disabled');
        }

      });
      $("#largeModal").show();
  });
