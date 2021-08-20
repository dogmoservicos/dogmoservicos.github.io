const id_servico = 5;

function inscreva ( ) {
    
  //    e.preventDefault();
  
    $this = $("#botaoInscreva");
    $this.prop("disabled", true);
  
    var nome_inscreva = $("input#nome_inscreva").val();
    var email_inscreva = $("input#email_inscreva").val();
  
    alert("Essa função está desativada. Você colocou os dados: \n" + nome_inscreva + "\n" + email_inscreva);
    if(0 == 0) {return;}
  //   alert("antes do ajax - "+nome_inscreva+" "+login_inscreva+" "+email_inscreva);
  
    $.ajax({
      url: "./php/frontInscreva.php",
      type: "POST",
      data: {
        nome_inscreva: nome_inscreva,
           email_inscreva: email_inscreva,
        id_servico : id_servico},
      cache: false,
      success: function( data ) {
  //        alert("sucesso1");
        // Success message
        var obj = JSON.parse(data);
        var id_retorno = obj.id_retorno;
        var msg_retorno = obj.msg_retorno;
  
  //        alert(id_retorno+": "+msg_retorno);
  
        if (id_retorno > 299) {
          $('#botaoInscreva').prop("disabled", false); // Re-enable submit button when AJAX call is complete
          Messenger().post({
            message: msg_retorno,
            type: 'error'
          });
        }
        else {
          $('#formInscreva').trigger("reset");
          $('#msgInscreva').html("");
  //          $('#botaoInscreva').prop("disabled", false); // Re-enable submit button when AJAX call is complete
  
          document.getElementById("nome_inscreva").style.display = "none";
          document.getElementById("email_inscreva").style.display = "none";
          document.getElementById("botaoInscreva").style.display = "none";
          
          alert(obj.link_retorno);
          window.location.href = obj.link_retorno;
  //        $('#msgInscreva').html("<div class='alert alert-success'>"+msg_retorno+"<br><br>Será aberta uma nova página para finalização da inscrição.<br><br><button id='botaoFechaInscreva' type='button' class='btn btn-primary btn-shadow' onclick='fechaInscreva();''>Fechar</button></div>");
  
  //        $('#msgInscreva').html("<div class='alert alert-success'>"+msg_retorno+"<br><br>Em seguinda você receberá um e-mail para finalizar sua inscrição. Sua conta será inicialmente gratuita.<br>Verifique sua caixa de SPAM.<br><br><button id='botaoFechaInscreva' type='button' class='btn btn-primary btn-shadow' onclick='fechaInscreva();''>Fechar</button></div>");
  //          $('#botaoInscreva').prop("disabled", false); // Re-enable submit button when AJAX call is complete
  //          setTimeout( function() {
  //            $('#msgInscreva').html("");
  //            $('#modalInscreva').modal('hide');
  //          } , 1000);
  
  
        }
      },
      error: function( msg ) {
        $("#loaderInscreva").fadeOut();
        $('#botaoInscreva').prop("disabled", false); // Re-enable submit button when AJAX call is complete
        Messenger().post({
          message: "Algo de errado aconteceu, tente novamente mais tarde.",
          type: 'error'
        });
      },
      complete: function() {
      }
    });
  }