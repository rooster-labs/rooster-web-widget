import getXPath from "get-xpath";

// document.addEventListener("click", (event) => {
//   const target = event.target as HTMLElement;
//   const path = getXPath(target)
//   // const elem = target.getPath()
//   console.log({target, path});
//   const findElemAgain = getElementByXpath(path)
//   console.log("Finding elem using path", findElemAgain)

//   event.preventDefault(); // Prevent default actions for better visualization
//   event.stopPropagation(); // Stop the event from bubbling up
// }, true); // Use capturing instead of bubbling

// document.addEventListener("mouseover", (event: MouseEvent) => {
//   const target = event?.target as HTMLElement;
//   target.style.outline = "2px solid red";
// });

// document.addEventListener("mouseout", (event) => {
//   const target = event?.target as HTMLElement;
//   target.style.outline = "";
// });


export function getElementByXpath(path: string) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

export function getElementTextByXPath(path: string) {
  return getElementByXpath(path)?.textContent
}