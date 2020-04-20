export function addMarkupToPage(murkup, elem, position = "afterbegin") {
  elem.insertAdjacentHTML(position, murkup);
}
