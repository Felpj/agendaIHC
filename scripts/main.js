// main.js

// Função para criar um novo evento
function createEvent(salaId) {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value.trim();
  
    if (!name || !date || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Gera um ID único para o evento
    const eventId = `event-${Date.now()}`;
  
    // Criação de um novo elemento de evento
    const ul = document.querySelector(`#${salaId} ul`);
    const li = document.createElement('li');
    li.setAttribute('data-id', eventId); // Atribui o ID ao elemento
    li.innerHTML = `
      <details>
        <summary>${new Date(date).toLocaleString()} - ${name}</summary>
        <p>${description}</p>
        <p>Contato: <a href="mailto:exemplo@example.com">exemplo@example.com</a></p>
        <button class="btn-edit-event" data-sala="${salaId}" data-name="${name}" data-date="${date}" data-description="${description}">
          <i class="fas fa-edit"></i> Editar
        </button>
        <button class="btn-delete-event" data-sala="${salaId}" data-id="${eventId}">
          <i class="fas fa-trash-alt"></i> Excluir
        </button>
      </details>
    `;
  
    // Adiciona o novo evento na lista de eventos da sala especificada
    ul.appendChild(li);
  
    console.log(`Evento criado: ${name} em ${date} na sala ${salaId}`);
    alert('Evento criado com sucesso!');
  
    // Adiciona listeners para os novos botões de editar e excluir
    const editButton = li.querySelector('.btn-edit-event');
    const deleteButton = li.querySelector('.btn-delete-event');
  
    editButton.addEventListener('click', () => {
      const eventData = {
        id: eventId,
        name: name,
        date: date,
        description: description
      };
      openModal('edit', salaId, eventData);
    });
  
    deleteButton.addEventListener('click', () => {
      deleteEvent(salaId, eventId);
    });
  }
  
  // Função para editar um evento existente
  function editEvent(salaId, eventId) {
    const name = document.getElementById('eventName').value.trim();
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value.trim();
  
    if (!name || !date || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    // Busca o evento no DOM usando o ID
    const ul = document.querySelector(`#${salaId} ul`);
    const eventElement = ul.querySelector(`li[data-id="${eventId}"]`);
  
    if (eventElement) {
      eventElement.innerHTML = `
        <details open>
          <summary>${new Date(date).toLocaleString()} - ${name}</summary>
          <p>${description}</p>
          <p>Contato: <a href="mailto:exemplo@example.com">exemplo@example.com</a></p>
          <button class="btn-edit-event" data-sala="${salaId}" data-name="${name}" data-date="${date}" data-description="${description}">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn-delete-event" data-sala="${salaId}" data-id="${eventId}">
            <i class="fas fa-trash-alt"></i> Excluir
          </button>
        </details>
      `;
      console.log(`Evento editado: ${name} em ${date} na sala ${salaId}`);
      alert('Evento editado com sucesso!');
  
      // Re-adiciona listeners aos botões após a edição
      const editButton = eventElement.querySelector('.btn-edit-event');
      const deleteButton = eventElement.querySelector('.btn-delete-event');
  
      editButton.addEventListener('click', () => {
        const eventData = {
          id: eventId,
          name: name,
          date: date,
          description: description
        };
        openModal('edit', salaId, eventData);
      });
  
      deleteButton.addEventListener('click', () => {
        deleteEvent(salaId, eventId);
      });
    } else {
      console.error('Evento não encontrado para edição.');
      alert('Erro ao editar o evento. Evento não encontrado.');
    }
  }
  
  // Função para excluir um evento
  function deleteEvent(salaId, eventId) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      const ul = document.querySelector(`#${salaId} ul`);
      const eventElement = ul.querySelector(`li[data-id="${eventId}"]`);
      if (eventElement) {
        ul.removeChild(eventElement);
        console.log(`Evento com ID ${eventId} excluído da sala ${salaId}`);
        alert('Evento excluído com sucesso!');
      } else {
        console.error('Evento não encontrado para exclusão.');
        alert('Erro ao excluir o evento. Evento não encontrado.');
      }
    }
  }
  
  // Função para abrir o modal (deve estar acessível globalmente)
  function openModal(action, salaId, eventData = null) {
    // Chamado a partir do modal.js, por isso precisa estar no escopo global
    // Deixe esta função vazia aqui, pois o modal.js controla o conteúdo do modal
  }
  