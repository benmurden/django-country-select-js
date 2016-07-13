(function($) {
  var $el, options, $form, data,
      cssClass = '.countryselectwidget',
      forms = [],
      inputs = $(cssClass);

  inputs.each(function(i, el) {
    $el = $(el);
    data = $el.data();
    options = {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      }
    };

    $el.countrySelect(options)
    .done(function() {
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
  });
})(jQuery);
