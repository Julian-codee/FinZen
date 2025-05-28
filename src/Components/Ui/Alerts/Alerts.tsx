import Swal from 'sweetalert2';

export const showSuccessAlert = (message: string, title = 'Éxito') => {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: "#020817",
    color: "#ffffff",
      willOpen: () => {
    const popup = document.querySelector('.swal2-popup');
    if (popup instanceof HTMLElement) {
      popup.style.border = '0.2px solid white'; // Cambia 'red' por cualquier color
      popup.style.borderRadius = '10px';    // Opcional
    }
  }
  });
};

export const showErrorAlert = (message: string, title = 'Error') => {
  Swal.fire({
    icon: 'error',
    title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
     background: "#020817",
    color: "#ffffff",
  });
};
