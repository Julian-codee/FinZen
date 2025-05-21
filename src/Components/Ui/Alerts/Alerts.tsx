import Swal from 'sweetalert2';

export const showSuccessAlert = (message: string, title = 'Éxito') => {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
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
  });
};
