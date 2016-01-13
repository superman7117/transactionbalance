'use strict';

$(document).ready(function() {

$('#btnD').on('click', makeDeposit);
$('#btnW').on('click', makeWithdrawl);
$('table').on('click', '.takeitout', takeOut);
$('table').on('change', '.box', strike)

var counterArray = [];

function makeDeposit(){
  var theComment = $('#comment').val();
  var theAmount = $('#amount').val()*1;
  counterArray.push(theAmount)
  var $myRows = $('.bottom').clone().removeClass('bottom').addClass('newRow');
  var fiver = counterArray.reduce(function(acc, e){
      return acc = e + acc;
  })
  $('table').append($myRows);
  $('.newRow > .one').append(theComment).removeClass('one');
  $('.newRow > .two').append().removeClass('two');
  $('.newRow > .three').append("$"+theAmount).removeClass('three');
  $('.newRow > .four').append("-").removeClass('four');
  $('.newRow > .five').append("$"+fiver).removeClass('five');

  $('#theForm')[0].reset();
}

function makeWithdrawl(){
  var theComment = $('#comment').val();
  var theAmount = $('#amount').val()*-1;
  counterArray.push(theAmount)
  var $myRows = $('.bottom').clone().removeClass('bottom').addClass('newRow');
  var fiver = counterArray.reduce(function(acc, e){
      return acc = e + acc;
  })
  $('table').append($myRows);
  $('.newRow > .one').append(theComment).removeClass('one');
  $('.newRow > .two').append().removeClass('two');
  $('.newRow > .three').append("-").removeClass('three');
  $('.newRow > .four').append("$"+theAmount*-1).removeClass('four');
  $('.newRow > .five').append("$"+fiver).removeClass('five');
  $('#theForm')[0].reset();
}


function strike(){
  console.log('box');
  if($(this).prop('checked')){
  $(this).parent().parent().addClass('grey');
}
  if($(this).prop('checked') === false){
  $(this).parent().parent().removeClass('grey');
}
}
//$('input:checked').closest('tr').remove();
function takeOut(){
  $(this).parent().parent().remove();
}



})
