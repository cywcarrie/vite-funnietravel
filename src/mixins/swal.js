import Swal from 'sweetalert2'

export default function ShowNotification(style, text) {
  Swal.fire({
    position: 'center-end',
    title: text,
    icon: `${style}`,
    timer: 1500,
    toast: true,
    showConfirmButton: false,
    timerProgressBar: true
  })
}
