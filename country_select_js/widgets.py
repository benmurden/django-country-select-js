import json
from django import forms


class CountrySelectWidget(forms.TextInput):

    class Media:
        css = {
            'all': ('country_select_js/css/countrySelect.min.css',),
        }
        js = ('country_select_js/js/countrySelect.min.js', 'country_select_js/js/init.js')

    def __init__(self, attrs=None, preferred_countries=['us', 'gb']):
        final_attrs = {'class': 'country-select-js', 'size': '20'}
        if attrs is not None:
            final_attrs.update(attrs)

        final_attrs['data-preferred-countries'] = json.dumps(preferred_countries)

        super(CountrySelectWidget, self).__init__(attrs=final_attrs)

    def get_options(self):
        return json.dumps(self.options)
