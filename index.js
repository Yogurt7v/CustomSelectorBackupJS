class CustomSelect {
  constructor(id, option) {
    this.id = id;
    this.option = option;
  }
  static #currentSelectedOption = {};

  static _createElement(id, option) {
    const mainDiv = document.createElement("div");
    mainDiv.className = `select-dropdown select-dropdown--${id}`;
    const selectBtn = document.createElement("button");
    selectBtn.className = `select-dropdown__button select-dropdown__button--${id}`;
    const btnSpan = document.createElement("span");
    btnSpan.className = `select-dropdown__text select-dropdown__text--${id}`;
    btnSpan.textContent = "Выберите элемент";
    const divUl = document.createElement("ul");
    divUl.className = `select-dropdown__list select-dropdown__list--${id}`;
    selectBtn.append(btnSpan);
    mainDiv.appendChild(selectBtn);
    mainDiv.append(divUl);

    option.forEach((element) => {
      const liItem = document.createElement("li");
      liItem.className = "select-dropdown__list-item";
      liItem.dataset.value = element.value;
      liItem.textContent = element.text;
      divUl.append(liItem);
    });
    return mainDiv;
  }

  render(container) {
    container.append(CustomSelect._createElement(this.id, this.option));
    CustomSelect._click(this.id, this.option);
  }

  static _click(id, option) {
    const list = document.querySelector(`.select-dropdown__button`);
    list.addEventListener("click", (event) => {
      const listActive = document.querySelector(
        `.select-dropdown__list--${id}`
      );
      if (listActive.classList.contains("active")) {
        listActive.classList.remove("active");
      } else {
        listActive.classList.add("active");
      }
      const listItems = document.querySelectorAll(
        ".select-dropdown__list-item"
      );
      listItems.forEach((element) => {
        element.addEventListener("click", (event) => {
          listItems.forEach((item) => {
            item.classList.remove("selected");
          });
          event.target.classList.add("selected");

          let num = event.target.dataset.value;
          let newCurrenSelectOptionItem = option.find((element) => {
            return element.value == num;
          });

          let innerText = newCurrenSelectOptionItem.text;
          document.querySelector(`.select-dropdown__text--${id}`).textContent =
            innerText;
        });
      });
    });
  }

  getCurrentSelectedOption() {
    // console.log(CustomSelect.#currentSelectedOption); // для проверки
    return CustomSelect.#currentSelectedOption;
  }
}

const options = [
  { value: 1, text: "JavaScript" },
  { value: 2, text: "NodeJS" },
  { value: 3, text: "ReactJS" },
  { value: 4, text: "HTML" },
  { value: 5, text: "CSS" },
];

const customSelect = new CustomSelect("123", options);
const mainContainer = document.querySelector("#container");

customSelect.render(mainContainer);
customSelect.getCurrentSelectedOption();
