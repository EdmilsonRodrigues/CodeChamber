fetch('http://localhost:8000/post/', {
  method: 'POST',
  body: formData,
})
.then(response => {
  console.log(response);  // Verifique a resposta da API
  return response.json(); // Aqui tenta-se interpretar a resposta como JSON
})
.then(data => {
  if (data.id) {
      alert('Post criado com sucesso!');
  } else {
      alert('Falha ao criar post.');
  }
})
.catch(error => {
  console.error('Erro na requisição:', error);
  alert('Erro na requisição: ' + error);
});

  
  // Função para lidar com o envio do like
document.addEventListener('DOMContentLoaded', function () {
    const likeButtons = document.querySelectorAll('.like-button');
    
    likeButtons.forEach(button => {
      button.addEventListener('click', async function () {
        const postId = button.getAttribute('data-id'); // ID do post
        const userId = button.getAttribute('data-user-id'); // ID do usuário
  
        console.log(`Tentando curtir o post ${postId} com o usuário ${userId}`);
  
        try {
          const response = await fetch(`https://api-devorbirt.onrender.com/user/${userId}/likes/${postId}`, { 
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json', // Especifica que o corpo da requisição é JSON
            },
            body: JSON.stringify({
              userId: userId,
              postId: postId,
            }),
          });
      
  
          if (response.ok) {
            const data = await response.json();
            console.log('Like atualizado:', data);
  
            // Atualiza o número de likes na interface
            const likeCountElement = document.getElementById(`like-count-${postId}`);
            if (likeCountElement) {
              likeCountElement.textContent = data.likes;
            } else {
              console.error(`Elemento com id 'like-count-${postId}' não encontrado`);
            }
  
            // Altera a cor do botão de curtir
            button.classList.toggle('text-blue-500');
            button.classList.toggle('text-gray-600');
          } else {
            console.error('Erro ao enviar o like');
          }
        } catch (error) {
          console.error('Erro de conexão com a API:', error);
        }
      });
    });
  });
  
  // Função para lidar com o clique na imagem
  function handleImageClick(imageUrl) {
    // Cria um elemento para o modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
  
    // Cria a imagem no modal
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '93%';
    img.style.maxHeight = '93%';
    img.style.borderRadius = '8px';
  
    // Botão para fechar o modal
    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.color = 'white';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
  
    // Remove o modal ao clicar no botão de fechar
    closeButton.onclick = () => {
      document.body.removeChild(modal);
    };
  
    // Adiciona os elementos ao modal
    modal.appendChild(img);
    modal.appendChild(closeButton);
  
    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modal);
  }
  
  // Função para exibir a barra lateral (não modificada)
  function mybar() {
    var x = document.getElementById("cta-button-sidebar");
    if (x.classList.contains("-translate-x-full")) {
      x.classList.remove("-translate-x-full");
    } else {
      x.classList.add("-translate-x-full");
    }
  }
  