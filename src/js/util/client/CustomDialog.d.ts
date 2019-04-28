export type CustomDialog = {
  function makeInputFieldLine(label: string, autoCompleteRole: string, id: string, required?: boolean): DOMElement;
  function showCustomDialog(title: string, contents: DOMElement): Promise;
}
