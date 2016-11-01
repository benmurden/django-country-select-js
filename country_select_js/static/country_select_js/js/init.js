(function($) {
  var $el, $realInput, options, $form, data, defaultCode,
      cssClass = '.country-select-js',
      forms = [],
      inputs = $(cssClass);

  inputs.each(function(i, el) {
    $el = $(el);
    $realInput = $el.prev();
    data = $el.data();
    defaultCode = data.defaultCode !== undefined ? data.defaultCode : 'us';
    options = {
      initialCountry: data.autoGeoIp ? 'auto' : data.defaultCode,
      geoIpLookup: function(callback) {
        if (data.autoGeoIp) {
          $.get('//freegeoip.net/json/', function() {}, "jsonp").done(function(resp) {
            var countryCode = (resp && resp.country_code) ? resp.country_code : "";
            callback(countryCode);
          }).fail(function(jqXHR) {
            console.warn('GeoIP Error: ' + jqXHR.status);
            callback(defaultCode);
          });
        }
      },
      preferredCountries: data.preferredCountries !== undefined ? data.preferredCountries : ['us', 'gb']
    };

    $el.countrySelect(options);
    if ($realInput.val() !== '') {
      $el.countrySelect('selectCountry', $realInput.val());
    }

    $form = $el.closest('form');
    if (forms.indexOf($form) === -1) {
      $form.submit(function(e) {
        $realInput.val(function() {
          return $el.countrySelect("getSelectedCountryData").iso2;
        });
      });

      forms.push($form);
    }
  });
})(jQuery);
