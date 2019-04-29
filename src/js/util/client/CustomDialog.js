/**
 * Helper function for generating custom "native NetSuite" dialogs
 *
 * @NApiVersion 2.0
 */
define(['N/ui/dialog'], function(
  /** @type {import('N/ui/dialog')} **/ dialog
) {

  /**
   * @type {import('./CustomDialog').showCustomDialog}
   */
  function showCustomDialog(title, contents) {
    // show the default alert dialog first
    const promise = dialog.create({
      'title':   title,
      'message': 'Loading...',
      'buttons': [
        { 'label': 'Save',   'value': 'save'   },
        { 'label': 'Cancel', 'value': 'cancel' }
      ]
    });
    jQuery('div.uir-message-popup').find('span').remove();

    jQuery('div.uir-message-buttons button[value="save"]').addClass('pgBntB');

    // inject the contents
    jQuery('div.uir-message-popup').prepend(jQuery(contents));
    jQuery('div.x-window').css('width', 'auto');

    // vertically-center the dialog
    var xWindow = jQuery('div.x-window');
    var newTop = (parseFloat(xWindow.css('top')) - ((xWindow.height()-300) / 2))+'px';
    xWindow.css({ top: newTop });

    return promise;
  }

  /**
   * @type {import('./CustomDialog').makeInputFieldLine}
   */
  function makeInputFieldLine(label, autoCompleteRole, id, required) {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'uir-field-wrapper';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'smallgraytextnolink uir-label';

    const labelSpanInner = document.createElement('span');
    labelSpanInner.className = 'labelSpanEdit smallgraytextnolink';
    labelSpanInner.append(label);
    labelSpan.append(labelSpanInner);

    const inputSpan = document.createElement('span');
    inputSpan.className = 'uir-field';

    const inputSpanInner = document.createElement('span');
    inputSpanInner.style['white-space'] = 'nowrap';
    inputSpanInner.className            = 'effectStatic';
    inputSpan.append(inputSpanInner);

    const input = document.createElement('input');
    input.id           = id;
    input.size         = 30;
    input.autocomplete = autoCompleteRole;
    input.style.width  = '420px';
    input.className    = 'input';
    inputSpanInner.append(input);

    fieldDiv.append(labelSpan);
    fieldDiv.append(inputSpan);

    if (required) {
      const requiredLabel = document.createElement('label');
      requiredLabel.className = 'uir-required-icon';
      requiredLabel.append('*');
      labelSpanInner.append(requiredLabel);
    }

    const row = document.createElement('tr');
    const col = document.createElement('td');
    row.append(col);
    col.append(fieldDiv);

    return row;
  }

  return {
    'makeInputFieldLine': makeInputFieldLine,
    'showCustomDialog':   showCustomDialog
  };

});
