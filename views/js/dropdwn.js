//( function ( $ ) {
  //  "use strict";

var $children = $('.child'); //親の要素を変数に入れます。
var original = $children.html(); //後のイベントで、不要なoption要素を削除するため、オリジナルをとっておく

//親側のselect要素が変更になるとイベントが発生
$('.parent').change(function() {

  //選択された親のvalueを取得し変数に入れる
  var val1 = $(this).val();

  //削除された要素をもとに戻すため.html(original)を入れておく
  $children.html(original).find('option').each(function() {
    var val2 = $(this).data('val'); //data-valの値を取得
    //valueと異なるdata-valを持つ要素を削除
    if (val1 != val2) {
      $(this).not('.msg').remove();
    }

  });

  //親側のselect要素が未選択の場合、子をdisabledにする
  if ($(this).val() == "*") {
    $children.attr('disabled', 'disabled');
  } else {
    $children.removeAttr('disabled');
  }

});

//( function ( $ ) {
  //  "use strict";

var $children2 = $('.chil2'); //親の要素を変数に入れます。
var original2 = $children2.html(); //後のイベントで、不要なoption要素を削除するため、オリジナルをとっておく

//親側のselect要素が変更になるとイベントが発生
$('.parent2').change(function() {

  //選択された親のvalueを取得し変数に入れる
  var val3 = $(this).val();

  //削除された要素をもとに戻すため.html(original)を入れておく
  $children2.html(original2).find('option').each(function() {
    var val4 = $(this).data('val'); //data-valの値を取得
    //valueと異なるdata-valを持つ要素を削除
    if (val3 != val4) {
      $(this).not('.msg').remove();
    }

  });

  //親側のselect要素が未選択の場合、子をdisabledにする
  if ($(this).val() == "*") {
    $children2.attr('disabled', 'disabled');
  } else {
    $children2.removeAttr('disabled');
  }

});


//} )( jQuery );
