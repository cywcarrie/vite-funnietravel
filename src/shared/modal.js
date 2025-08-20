import { onMounted, ref } from 'vue'
import Modal from 'bootstrap/js/dist/modal'

export default function useModal() {
  const modal = ref(null)
  const modalElement = ref(null)

  const showModal = () => {
    modal.value.show()
  }

  const hideModal = () => {
    modal.value.hide()
  }
  onMounted(() => {
    modal.value = new Modal(modalElement.value)
  })

  return {
    modalElement,
    showModal,
    hideModal
  }
}
