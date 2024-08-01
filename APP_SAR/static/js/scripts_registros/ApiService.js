import { getCookie } from '../utils.js';
import { renderisarTabla } from './views.js';

export function ObtainDataTablet(type) {
    const formData = new FormData();
    formData.append('type_file', type);
    
    fetch('/obtain_data/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        renderisarTabla(data['data']);
    })
    .catch(error => console.error('Error:', error));
}