(function($) {
  var $el, options, $form, data, defaultCode,
      cssClass = '.countryselectwidget',
      forms = [],
      inputs = $(cssClass);

  inputs.each(function(i, el) {
    $el = $(el);
    data = $el.data();
    defaultCode = data.defaultCode !== undefined ? data.defaultCode : 'us';
    options = {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('//freegeoip.net/json/', function() {}, "jsonp").done(function(resp) {
          var countryCode = (resp && resp.country_code) ? resp.country_code : "";
          callback(countryCode);
        }).fail(function(jqXHR) {
          console.warn('GeoIP Error: ' + jqXHR.status);
          callback(defaultCode);
        });
      },
      preferredCountries: data.preferredCountries !== undefined ? data.preferredCountries : ['us', 'gb']
    };

    $el.countrySelect(options);
    $el.countrySelect('selectCountry', $el.val());

    $form = $el.closest('form');
    if (forms.indexOf($form) === -1) {
      $form.submit(function(e) {
        $form.find('input' + cssClass).val(function() {
          return $(this).countrySelect("getSelectedCountryData").iso2;
        });
      });

      forms.push($form);
    }
  });
})(jQuery);
