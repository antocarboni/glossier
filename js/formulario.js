const btn = document.getElementById('button');

document.getElementById('formulario')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_tojfhn4';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar mail';
      {
        Swal.fire({
          title: '¡Revisa tu correo electronico!',
          text: 'Vamos a realizar el seguimiento de tu pedido por ese medio',
          imageUrl: '../assets/correo.png',
          imageWidth: 300,
          imageHeight: 300,
          imageAlt: 'correo foto',
        })
};
    }, (err) => {
      btn.value = 'Enviar mail';
      alert(JSON.stringify(err));
    });
});