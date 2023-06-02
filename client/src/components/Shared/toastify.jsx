export default class Toastify {
  static ToastCartAdd = () => {
    return "Produs adaugat in cos.";
  };
  static ToastCartAddError = () => {
    return "Produsul este deja in cos.";
  };
  static ToastShopItemModified() {
    return "Produsul a fost modificat.";
  }
  static ToastShopItemModifiedError() {
    return "Produsul nu a putut fi modificat.";
  }
  static ToastShopItemAdded() {
    return "Produs adaugat in magazin";
  }
  static ToastShopItemAddedError() {
    return "Produsul nu a putu fi adaugat in magazin";
  }
}
