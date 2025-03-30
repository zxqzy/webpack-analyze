// import { add } from "lodash";
// import { add } from "lodash-es"
import { add } from "@/utils";
export const renderAddButton = () => {
  require("./index.css");
  const element = document.createElement("button");
  let count = 0;
  element.innerHTML = `Click me!: ${count}`;
  element.addEventListener("click", () => {
    count = add(count, 2);
    element.innerHTML = `Click me!: ${count}`;
  });
  return element;
};

export default renderAddButton;
