export default class ProductList {
  constructor(container) {
    this.container = container;
    this.list = this.container.querySelector('.list');
    this.btnAdd = this.container.querySelector('.btn_add');
    this.form = this.container.querySelector('.create-item_list');
    this.inputName = this.form.querySelector('.aplecation');
    this.inputPrice = this.form.querySelector('.price');
    this.btnSave = this.container.querySelector('.btn_save');
    this.btnCansel = this.container.querySelector('.btn_cansel');
    this.inputAplecation = this.form.querySelector('.aplecation');
    this.inputPrice = this.form.querySelector('.price');
    this.confirmationBox = this.container.querySelector('.confirmation-box');
    this.btnYes = this.confirmationBox.querySelector('.confirmation-btn_yes');
    this.btnNo = this.confirmationBox.querySelector('.confirmation-btn_no');
    this.substrate = document.querySelector('.substrate');

    this.listBox = [];
    this.editElements = null;
    this.deleteElement = null;

    this.saveForm = this.saveForm.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.cansel = this.cansel.bind(this);
    this.editForm = this.editForm.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.canselConfirm = this.canselConfirm.bind(this);
    this.confirmationForm = this.confirmationForm.bind(this);
  }

  activation() {
    this.btnAdd.addEventListener('click', this.saveForm);
    this.btnCansel.addEventListener('click', this.cansel);
    this.inputAplecation.addEventListener('input', ProductList.changeInput);
    this.inputPrice.addEventListener('input', ProductList.changeInput);
    this.btnYes.addEventListener('click', this.deleteItem);
    this.btnNo.addEventListener('click', this.canselConfirm);
  }

  saveForm(e) {
    e.preventDefault();

    this.btnSave.addEventListener('click', this.saveNew);
    this.substrate.classList.remove('hiden');
    this.form.classList.remove('hiden');
  }

  saveNew(e) {
    e.preventDefault();

    if (this.checkInput()) {
      this.addItem();

      this.listRendering();

      this.btnSave.removeEventListener('click', this.saveNew);
      this.form.reset();
      this.substrate.classList.add('hiden');
      this.form.classList.add('hiden');
    } else {
      if (this.inputName.value.length < 3) ProductList.showtoolTip('Название должно содержать не менее трех символов', this.inputName);
      if (+this.inputPrice.value < 0) ProductList.showtoolTip('Стоимость должна быть положительной', this.inputPrice);
      if (this.inputPrice.value.length === 0) ProductList.showtoolTip('Введите стоимость', this.inputPrice);
    }
  }

  cansel(e) {
    e.preventDefault();

    this.btnSave.removeEventListener('click', this.saveNew);
    this.btnSave.removeEventListener('click', this.saveEdit);
    this.form.reset();
    ProductList.changeInput();
    this.form.classList.add('hiden');
    this.substrate.classList.add('hiden');
  }

  addItem() {
    const box = [];

    const productName = document.createElement('div');
    productName.classList.add('product_name', 'list_item');
    productName.textContent = this.inputName.value;
    box.push(productName);

    const price = document.createElement('div');
    price.classList.add('product_price', 'list_item');
    const result = [];
    const limit = Math.ceil(this.inputPrice.value.length / 3);
    for (let i = 1; i <= limit; i += 1) {
      const end = this.inputPrice.value.length - 3 * (i - 1);
      const start = -3 * i;
      result.unshift(this.inputPrice.value.slice(start, end));
    }
    price.textContent = result.join(' ');
    box.push(price);

    const actions = document.createElement('div');
    actions.classList.add('actions', 'list_item');

    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn_edit');
    btnEdit.addEventListener('click', this.editForm);

    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn_delete');
    btnDelete.addEventListener('click', this.confirmationForm);

    actions.append(btnEdit, btnDelete);
    box.push(actions);

    this.listBox.push(box);
  }

  editForm(e) {
    e.preventDefault();

    this.editElements = this.listBox.find((element) => element
      .find((el) => el === e.target.parentElement));

    this.inputName.value = `${this.editElements[0].textContent}`;
    this.inputPrice.value = `${this.editElements[1].textContent}`.split(' ').join('');
    this.form.classList.remove('hiden');
    this.substrate.classList.remove('hiden');
    this.btnSave.addEventListener('click', this.saveEdit);
  }

  saveEdit(e) {
    e.preventDefault();

    if (this.checkInput()) {
      for (let i = 0; i < this.listBox.length; i += 1) {
        if (this.editElements === this.listBox[i]) {
          this.listBox[i][0].textContent = this.inputName.value;
          const result = [];
          const limit = Math.ceil(this.inputPrice.value.length / 3);
          for (let j = 1; j <= limit; j += 1) {
            const end = this.inputPrice.value.length - 3 * (j - 1);
            const start = -3 * j;
            result.unshift(this.inputPrice.value.slice(start, end));
          }
          this.listBox[i][1].textContent = result.join(' ');
        }
      }

      this.listRendering();
      this.editElements = null;

      this.btnSave.removeEventListener('click', this.saveEdit);
      this.form.reset();
      this.form.classList.add('hiden');
      this.substrate.classList.add('hiden');
    } else {
      if (this.inputName.value.length < 3) ProductList.showtoolTip('Название должно содержать не менее трех символов', this.inputName);
      if (+this.inputPrice.value < 0) ProductList.showtoolTip('Стоимость должна быть положительной', this.inputPrice);
      if (this.inputPrice.value.length === 0) ProductList.showtoolTip('Введите стоимость', this.inputPrice);
    }
  }

  confirmationForm(e) {
    e.preventDefault();

    this.deleteElement = e.target;
    this.confirmationBox.classList.remove('hiden');
    this.substrate.classList.remove('hiden');
  }

  canselConfirm(e) {
    e.preventDefault();

    this.deleteElement = null;
    this.confirmationBox.classList.add('hiden');
    this.substrate.classList.add('hiden');
  }

  deleteItem(e) {
    e.preventDefault();

    const deleteElements = this.listBox.find((element) => element
      .find((el) => el === this.deleteElement.parentElement));
    this.listBox = this.listBox.filter((element) => element !== deleteElements);

    this.confirmationBox.classList.add('hiden');
    this.substrate.classList.add('hiden');
    this.deleteElement = null;
    this.listRendering();
  }

  listRendering() {
    this.list.querySelectorAll('.list_item').forEach((el) => {
      if (!el.classList.contains('product_title')) el.remove();
    });

    for (let i = 0; i < this.listBox.length; i += 1) {
      this.list.append(...this.listBox[i]);
    }
  }

  static showtoolTip(message, element) {
    const toolTip = document.createElement('div');
    toolTip.classList.add('toolTip');
    toolTip.textContent = message;

    document.body.append(toolTip);

    const { bottom, left } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;

    toolTip.style.left = `${left - offsetHorizont}px`;
    toolTip.style.top = `${bottom + 5}px`;
  }

  checkInput() {
    if (this.inputName.value.length > 2
      && +this.inputPrice.value > 0
      && this.inputPrice.value.length > 0) return true;
    return false;
  }

  static changeInput() {
    document.querySelectorAll('.toolTip').forEach((el) => el.remove());
  }
}
