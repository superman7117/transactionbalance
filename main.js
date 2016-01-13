'use strict';

$(document).ready(function() {
  $('#btnD').on('click', makeDeposit);
  $('#btnW').on('click', makeWithdrawl);
  $('#all').on('change',  onlyAll);
  $('#wit').on('change',  onlyWithdrawls);
  $('#dep').on('change',  onlyDeposits);
  $('table').on('click', '.trash', takeOff);

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

  function makeDeposit(e){
    var theComment = $('#comment').val();
    var theAmount = ($('#amount').val()*1).toFixed(2);
    if (!theComment.length || theAmount == 0){
      return;
    }
    e.preventDefault();
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

  function makeWithdrawl(e){
    var theComment = $('#comment').val();
    var theAmount = ($('#amount').val()*1).toFixed(2);
    if (!theComment.length || theAmount == 0){
      return;
    }
    e.preventDefault();
    counterArray.push(parseFloat(theAmount)*-1)
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

  function onlyAll(){
    $('.newRowD').show();
    $('.newRowW').show();
    $('.showVDT').remove();
    $('.showVWT').remove();
  }

  function onlyDeposits(){
    $('.newRowD').show();
    $('.newRowW').hide();
    var sum = 0;
    $('.newRowD').children('.depo').text().split('$').forEach(function(e){
      sum +=  Number(e);
      return sum;
    });
    $('table').append('<div class="showVDT">Deposit Total $'+sum+'</div>');
    $('.showVWT').remove();
  }

  function onlyWithdrawls(){
    $('.newRowW').show();
    $('.newRowD').hide();
    $('.showVDT').remove();
    var sum = 0;
    $('.newRowW').children('.with').text().split('$').forEach(function(e){
      sum +=  Number(e);
      console.log('sum', sum);
    });
    console.log(sum);
    $('table').append('<div class="showVWT">Withdrawl Total $'+sum+'</div>');
  }

  function takeOff(){
    var deleteD = $(this).parent().parent('.newRowD').children('.depo').text();
    var deD = Number(deleteD.slice(1))*-1;
    var deleteW = $(this).parent().parent('.newRowW').children('.with').text();
    var deW = Number(deleteW.slice(1))*-1;
    counterArray.push(parseFloat(deW));
    counterArray.push(deD);
    mather();
    $(this).parent().parent().remove();
  }

})
