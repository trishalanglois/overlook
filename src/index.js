import $ from 'jquery';
import './css/base.scss';

$('#login-button').on('click', () => {
  if ($('.username').val() === 'manager') {
    window.location = './staff-page.html'
  } else {
    window.location = './guest-page.html'
  }
})

$('.nav-to-login').click(function(){
  $('#main-input').slideToggle();
});
