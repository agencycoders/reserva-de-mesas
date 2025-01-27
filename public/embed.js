(function() {
  // Configuração
  const API_URL = window.location.origin + '/api';  // Usar o domínio atual
  
  // Criar e injetar estilos
  const style = document.createElement('style');
  style.textContent = `
    .restaurant-booking-form {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }
    
    .restaurant-booking-form input,
    .restaurant-booking-form select {
      width: 100%;
      padding: 8px 12px;
      margin: 8px 0;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .restaurant-booking-form button {
      width: 100%;
      padding: 12px;
      background: #8B5CF6;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    .restaurant-booking-form button:hover {
      background: #7C3AED;
    }

    .restaurant-booking-form .error {
      color: #ef4444;
      font-size: 14px;
      margin-top: 4px;
    }

    .restaurant-booking-form .success {
      color: #22c55e;
      font-size: 14px;
      margin-top: 4px;
    }

    .restaurant-booking-form .loading {
      opacity: 0.7;
      pointer-events: none;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .restaurant-booking-form .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #fff;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.6s linear infinite;
      margin-left: 8px;
    }
  `;
  document.head.appendChild(style);

  // Função para validar dados
  function validateFormData(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 3) {
      errors.push('Nome inválido');
    }
    
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Email inválido');
    }
    
    if (!formData.phone || !/^\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.push('Telefone inválido');
    }

    const today = new Date();
    const selectedDate = new Date(formData.date + 'T' + formData.time);
    
    if (selectedDate < today) {
      errors.push('Data/hora inválida');
    }

    return errors;
  }

  // Criar formulário HTML
  function createForm() {
    const formHtml = `
      <form class="restaurant-booking-form" id="embedded-booking-form">
        <div>
          <label>Nome Completo</label>
          <input type="text" name="name" required>
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" required>
        </div>
        <div>
          <label>Telefone</label>
          <div style="position: relative;">
            <span style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%);">+351</span>
            <input type="tel" name="phone" style="padding-left: 50px;" required placeholder="XXX XXX XXX">
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label>Data</label>
            <input type="date" name="date" required>
          </div>
          <div>
            <label>Hora</label>
            <input type="time" name="time" required>
          </div>
        </div>
        <div>
          <label>Número de Pessoas</label>
          <select name="guests">
            <option value="1">1 pessoa</option>
            <option value="2">2 pessoas</option>
            <option value="3">3 pessoas</option>
            <option value="4">4 pessoas</option>
            <option value="5">5 pessoas</option>
            <option value="6">6 pessoas</option>
            <option value="7">7 pessoas</option>
            <option value="8">8 pessoas</option>
          </select>
        </div>
        <div id="form-message"></div>
        <button type="submit">Confirmar Reserva</button>
      </form>
    `;

    const container = document.getElementById('restaurant-booking-form');
    if (container) {
      // Verificar se o ID do restaurante está presente
      const restaurantId = container.dataset.restaurantId;
      if (!restaurantId) {
        console.error('ID do restaurante não encontrado. Certifique-se de adicionar data-restaurant-id ao elemento do formulário.');
        container.innerHTML = '<div class="error">Configuração inválida: ID do restaurante não encontrado.</div>';
        return;
      }

      container.innerHTML = formHtml;
      
      // Adicionar handler de submissão
      const form = document.getElementById('embedded-booking-form');
      form.addEventListener('submit', handleSubmit);

      // Adicionar validações em tempo real
      form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('change', () => validateField(input));
      });
    }
  }

  // Validar campo individual
  function validateField(input) {
    const name = input.name;
    const value = input.value;
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'name':
        isValid = value.trim().length >= 3;
        errorMessage = 'Nome deve ter pelo menos 3 caracteres';
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        errorMessage = 'Email inválido';
        break;
      case 'phone':
        isValid = /^\d{9}$/.test(value.replace(/\s/g, ''));
        errorMessage = 'Telefone deve ter 9 dígitos';
        break;
      // Adicione mais validações conforme necessário
    }

    const errorDiv = input.parentElement.querySelector('.field-error');
    if (!isValid && value) {
      if (!errorDiv) {
        const div = document.createElement('div');
        div.className = 'field-error error';
        div.textContent = errorMessage;
        input.parentElement.appendChild(div);
      }
    } else if (errorDiv) {
      errorDiv.remove();
    }

    return isValid;
  }

  // Mostrar mensagem
  function showMessage(message, type = 'error') {
    const messageDiv = document.getElementById('form-message');
    if (messageDiv) {
      messageDiv.className = type;
      messageDiv.textContent = message;
    }
  }

  // Manipular submissão do formulário
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const restaurantId = form.closest('#restaurant-booking-form').dataset.restaurantId;
    
    if (!restaurantId) {
      showMessage('Erro: ID do restaurante não encontrado. Por favor, verifique a configuração do shortcode.');
      return;
    }
    
    // Mostrar estado de carregamento
    form.classList.add('loading');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.innerHTML = 'A processar... <span class="spinner"></span>';
    submitButton.disabled = true;
    
    // Limpar mensagens anteriores
    showMessage('', '');
    
    const formData = {
      restaurantId,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      date: form.date.value,
      time: form.time.value,
      guests: form.guests.value,
      source: 'wordpress',
      timestamp: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        pageUrl: window.location.href,
        referrer: document.referrer
      }
    };

    // Validar dados antes de enviar
    const errors = validateFormData(formData);
    if (errors.length > 0) {
      showMessage(errors.join('. '));
      form.classList.remove('loading');
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Source': 'wordpress-shortcode',
          'X-Restaurant-ID': restaurantId
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Reserva enviada com sucesso:', data);
        showMessage('Reserva recebida com sucesso! Em breve receberá um email de confirmação.', 'success');
        form.reset();
        
        // Disparar evento para integração com WordPress
        const event = new CustomEvent('restaurantBookingSuccess', { 
          detail: { 
            reservationId: data.id,
            restaurantId: formData.restaurantId,
            timestamp: formData.timestamp
          } 
        });
        document.dispatchEvent(event);
      } else {
        console.error('Erro ao enviar reserva:', data);
        showMessage(data.message || 'Ocorreu um erro ao processar a sua reserva. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro na submissão do formulário:', error);
      showMessage('Ocorreu um erro ao processar a sua reserva. Por favor, tente novamente.');
    } finally {
      form.classList.remove('loading');
      submitButton.innerHTML = originalButtonText;
      submitButton.disabled = false;
    }
  }

  // Inicializar formulário quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createForm);
  } else {
    createForm();
  }
})();