// import { add } from "lodash";
import { add } from "lodash-es"
// import { add } from "@/utils";
const root = document.getElementById("root");
const element = document.createElement("button");
let count = 0;
element.innerHTML = `Click me!: ${count}`;
element.addEventListener("click", () => {
  count = add(count, 2);
  element.innerHTML = `Click me!: ${count}`;
  element.style.color = count % 2 === 0 ? "red" : "blue";
  element.style.backgroundColor = count % 2 === 0 ? "blue" : "red";
  element.style.fontSize = count % 2 === 0 ? "20px" : "30px";
  element.style.fontWeight = count % 2 === 0 ? "bold" : "normal";
  root.replaceChild(element, root.firstChild);
});
root.appendChild(element);
