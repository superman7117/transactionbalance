'use strict';

$(document).ready(function() {
  $('#btnD').on('click', makeDeposit);
  $('#btnW').on('click', makeWithdrawl);
  $('#all').on('change',  onlyAll);
  $('#wit').on('change',  onlyWithdrawls);
  $('#dep').on('change',  onlyDeposits);
  $('table').on('click', '.trash', takeOff)

  var counterArray = [];

  function mather(){
    var fiver = counterArray.reduce(function(acc, e){
      return acc = e + acc;
    })
    function commaSeparateNumber(val){
      while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
      }
      return val;
    }
    fiver = commaSeparateNumber(fiver);
    $('#balance').children().remove();
    $('#balance').append('<span>$'+fiver+'</span>')
    return fiver;
  }

  function makeDeposit(){
    var theComment = $('#comment').val();
    var theAmount = ($('#amount').val()*1).toFixed(2);
    if (!theComment.length || theAmount == 0){
      return;
    }
    counterArray.push(parseFloat(theAmount));
    mather();
    var $myRows = $('.bottom').clone().removeClass('bottom').addClass('newRowD');
    $('table').append($myRows);
    $('.newRowD > .one').append(theComment).removeClass('one');
    $('.newRowD > .two').append(moment().format('llll')).removeClass('two');
    $('.newRowD > .three').append("$"+theAmount).removeClass('three');
    $('.newRowD > .four').append("-").removeClass('four');
    $('.newRowD > .five').append("$"+mather()).removeClass('five');
    $('#theForm')[0].reset();
  }

  function makeWithdrawl(){
    var theComment = $('#comment').val();
    var theAmount = ($('#amount').val()*-1).toFixed(2);
    counterArray.push(parseFloat(theAmount)*-1)
    if (!theComment.length || theAmount == 0){
      return;
    }
    mather();

    var $myRows = $('.bottom').clone().removeClass('bottom').addClass('newRowW');

    $('table').append($myRows);
    $('.newRowW > .one').append(theComment).removeClass('one');
    $('.newRowW > .two').append(moment().format('llll')).removeClass('two');
    $('.newRowW > .three').append("-").removeClass('three');
    $('.newRowW > .four').append("$"+theAmount*-1).removeClass('four');
    $('.newRowW > .five').append("$"+mather()).removeClass('five');
    $('#theForm')[0].reset();
  }

  function onlyDeposits(){
    $('.newRowD').show();
    $('.newRowW').hide();
    console.log($('.newRowD').children('.depo').text());

  }

  function onlyAll(){
    $('.newRowD').show();
    $('.newRowW').show();
  }

  function onlyWithdrawls(){
    $('.newRowW').show();
    $('.newRowD').hide();
  }

  function takeOff(){
    var deleteD = $(this).parent().parent('.newRowD').children('.depo').text();
    var deD = Number(deleteD.slice(1))*-1
    var deleteW = $(this).parent().parent('.newRowW').children('.with').text();
    var deW = Number(deleteW.slice(1))
    counterArray.push(parseFloat(deW));
    counterArray.push(deD);
    mather();
    $(this).parent().parent().remove();
  }

})
