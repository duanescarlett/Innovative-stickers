
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          $('#imagePreview').css('background-image', 'url('+e.target.result +')');
          $('#imagePreview').hide();
          $('#imagePreview').fadeIn(650);
      }
      reader.readAsDataURL(input.files[0]);
  }
}

$("#imageUpload").change(function() {
  readURL(this);
  alert(this.files[0].name)
  console.log(this.files[0])
  var img = this.files[0]
  // alert(img)
  if(img.size > 2000000){
    alert("the picture is too large")
  }
  else{
    var form_data = new FormData()
    const xhr = new XMLHttpRequest()
    
    for(const file of this.files){
      form_data.append("profilePic", file)
    }

    xhr.open("post", "upload/proPicUpload")
    xhr.send(form_data)

  }
});

$('.gallery').click(function(){
  // alert("JQUERY WORKS MOFO!!!")
  var cook = document.cookie
  var img = $(this)
  img = img.children('#imgpop').attr('src')
  console.log("This is the cookie: ->")
  console.log(cook)
  var popImg = "<div id='imgPop' onClick='closeImage()'></div>"
  popImg = popImg.concat(
    "<div class='modalpop'><img id='img' class='rounded mx-auto d-block' width='300' height='500' src='"+img+"' /><div class='row'><div class='col-8'>col-8</div><div class='col-4'><ul id='popIcons'><li><img id='img' width='28' height='28' src='public/img/star.png' /></li><li><img id='img' width='28' height='28' src='public/img/download.png' /></li><li><img id='img' width='28' height='28' src='public/img/hearts.png' /></li><li><img id='img' width='28' height='28' src='public/img/dollar.png' /></li></ul></div></div></div>"
  )
  $('body').append(popImg)
})

function closeImage(){
  $('#imgPop').remove()
  $('#img').remove()
  $('.modalpop').remove()
}

function navAuth(){
  var logout = $('.logoutBtn')
  var login = $('.loginBtn')
  var signup = $('.signupBtn')

  logout.hide()
  login.hide()
  signup.hide()
  console.log(document.cookie)

  if(document.cookie === 'cookie=cooking'){
    logout.show()
    login.remove()
    signup.remove()
  }
  else{
    login.show()
    signup.show()
  }

  logout.click(function(){
    document.cookie = 'cookie=none'
  })
  
}

navAuth()
