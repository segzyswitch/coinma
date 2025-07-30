import Swal from 'sweetalert2';

const swalWithDefaults = Swal.mixin({
  customClass: {
    confirmButton: 'swal2-confirm-button',
    cancelButton: 'swal2-cancel-button'
  },
  buttonsStyling: false,
  confirmButtonColor: '#25c866',
  cancelButtonColor: '#dc3545',
  // showCancelButton: true,
  background: '#2E2D2D',
  color: '#ccc'
})

export default defineNuxtPlugin(() => {
  return {
    provide: {
      swal: swalWithDefaults
    }
  }
})
