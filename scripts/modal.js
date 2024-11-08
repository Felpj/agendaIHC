// modal.js

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('eventModal');
    const closeModalButton = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const eventForm = document.getElementById('eventForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
  
    // Seleciona todos os botões de criação
    const createButtons = document.querySelectorAll('.btn-create');
  
    // Seleciona todos os botões de edição já existentes nos eventos
    const editButtons = document.querySelectorAll('.btn-edit-event');
  
    // Adiciona listeners para botões de criação
    createButtons.forEach(button => {
      button.addEventListener('click', () => {
        const salaId = button.getAttribute('data-sala');
        openModal('create', salaId);
      });
    });
  
    // Adiciona listeners para botões de edição
    editButtons.forEach(button => {
      button.addEventListener('click', () => {
        const salaId = button.getAttribute('data-sala');
        const eventId = button.closest('li').getAttribute('data-id'); // Obtém o ID do evento
        const eventData = {
          id: eventId,
          name: button.getAttribute('data-name'),
          date: button.getAttribute('data-date'),
          description: button.getAttribute('data-description')
        };
        openModal('edit', salaId, eventData);
      });
    });
  
    function openModal(action, salaId, eventData = null) {
      modal.style.display = 'flex';
      modalTitle.textContent = action === 'create' ? 'Criar Evento' : 'Editar Evento';
  
      // Limpa o formulário ao abrir o modal
      eventForm.reset();
  
      // Exibe o indicador de carregamento oculto
      loadingIndicator.style.display = 'none';
  
      // Preenche os campos caso seja edição
      if (action === 'edit' && eventData) {
        document.getElementById('eventName').value = eventData.name;
        document.getElementById('eventDate').value = eventData.date;
        document.getElementById('eventDescription').value = eventData.description;
        // Armazena o ID do evento no formulário para referência futura
        eventForm.setAttribute('data-event-id', eventData.id);
        eventForm.setAttribute('data-sala-id', salaId);
      } else {
        // Remove atributos de dados caso seja criação
        eventForm.removeAttribute('data-event-id');
        eventForm.removeAttribute('data-sala-id');
      }
  
      // Define o comportamento ao enviar o formulário
      eventForm.onsubmit = function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        // Exibe indicador de carregamento
        loadingIndicator.style.display = 'block';
  
        if (action === 'create') {
          createEvent(salaId);
        } else {
          const eventId = eventForm.getAttribute('data-event-id');
          editEvent(salaId, eventId);
        }
  
        // Oculta indicador de carregamento e fecha o modal
        loadingIndicator.style.display = 'none';
        closeModal();
      };
    }
  
    // Função para fechar o modal
    function closeModal() {
      modal.style.display = 'none';
    }
  
    // Eventos para fechar o modal
    closeModalButton.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        closeModal();
      }
    });
  
    // Fechar modal ao pressionar "Escape"
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeModal();
      }
    });
  });
  