/**
 * Helper function for generating custom "native NetSuite" dialogs
 *
 * @NApiVersion 2.0
 */
define(['N/ui/dialog'], function(
  /** @type import('N/ui/dialog') **/ dialog
) {

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

    jQuery('div.x-window').css({
      top:    '50%',
      left:   '50%',
      margin: '-'+(jQuery('div.x-window').height() / 2)+'px 0 0 -'+(jQuery('div.x-window').width() / 2)+'px'
    });

    return promise;
  }

  function makeInputFieldLine(label, id, required) {
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
    // @ts-ignore
    inputSpanInner.style     = 'white-space: nowrap';
    inputSpanInner.className = 'effectStatic';
    inputSpan.append(inputSpanInner);

    const input = document.createElement('input');
    input.size      = 30;
    // @ts-ignore
    input.style     = 'width: 420px';
    input.className = 'input';
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

  function showAddressDialog(onSave, onCancel) {
    const table = document.createElement('table');
    table.className = 'table_fields';

    table.append(makeInputFieldLine('Country',   'custpage_shipcountry', true));

    table.append(makeInputFieldLine('Attention', 'custpage_shipattention'));
    table.append(makeInputFieldLine('Addressee', 'custpage_shipaddressee'));
    table.append(makeInputFieldLine('Address 1', 'custpage_shipaddress1'));
    table.append(makeInputFieldLine('Address 2', 'custpage_shipaddress2'));
    table.append(makeInputFieldLine('Address 3', 'custpage_shipaddress3'));
    table.append(makeInputFieldLine('City',      'custpage_shipcity'));
    table.append(makeInputFieldLine('State',     'custpage_shipstate'));
    table.append(makeInputFieldLine('Zip',       'custpage_shipzip'));

    showCustomDialog('Shipping Address', table).then(function(result) {
      if (result === 'save') {
        onSave();
      } else {
        onCancel();
      }
    });
  }

  showAddressDialog(function() { window.console.log('saved'); }, function() { window.console.log('canceled'); });

  return {
    'showCustomDialog': showCustomDialog
  };

});
