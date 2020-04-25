export function addMarkupToPage(murkup, elem, position = "afterbegin") {
  elem.insertAdjacentHTML(position, murkup);
}

export function getDayNumber(element) {
  const ms = element * 1000;

  return new Date(ms).getUTCDate();
}
