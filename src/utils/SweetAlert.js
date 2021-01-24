import Swal from 'sweetalert2';
export default {
  GetAlert: (
    AlertText,
    ConfirmButtonText,
    IsShowCancelButton,
    AlertIcon,
    AlertTitle
  ) =>
    Swal.fire({
      title: AlertTitle || 'Alert',
      text: AlertText,
      icon: AlertIcon || 'error',
      showCancelButton: IsShowCancelButton || false,
      confirmButtonText: ConfirmButtonText,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }),

  ConfirmWithAlert: (
    ConfirmExecute,
    AlertIcon,
    AlertText,
    ConfirmButtonText,
    IsShowCancelButton,
    AlertTitle
  ) =>
    Swal.fire({
      title: AlertTitle || 'Are you sure?',
      text: AlertText || 'Are you sure you want to delete this?',
      icon: AlertIcon,
      showCancelButton: IsShowCancelButton || true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: ConfirmButtonText || 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        ConfirmExecute();
        Swal.fire('Deleted!', 'The deletion was successful', 'success');
      } else {
        Swal.fire('oops!', 'Your not deleted', 'error');
      }
    }),
};
