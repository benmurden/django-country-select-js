import json
from django import forms


class CountrySelectWidget(forms.TextInput):

    class Media:
        css = {
            'all': ('country_select_js/css/countrySelect.min.css',),
        }
        js = ('country_select_js/js/countrySelect.min.js', 'country_select_js/js/init.js')

    def __init__(self, attrs=None, preferred_countries=['us', 'gb'], default_code='us', auto_geo_ip=False):
        final_attrs = {'size': '30'}
        if attrs is not None:
            final_attrs.update(attrs)

        final_attrs['data-preferred-countries'] = json.dumps(preferred_countries)
        final_attrs['data-default-code'] = default_code

        super(CountrySelectWidget, self).__init__(attrs=final_attrs)

    def get_options(self):
        return json.dumps(self.options)

    def render(self, name, value, attrs=None):
        if value is None:
            value = ''
        final_attrs = self.build_attrs(attrs, name=name, size=2)
        final_attrs['type'] = 'hidden'
        if value != '':
            final_attrs['value'] = force_text(self._format_value(value))

        output = [format_html('<input{}>', flatatt(final_attrs))]
        select = self.render_select(attrs)
        output.append(select)
        return mark_safe('\n'.join(output))

    def render_select(attrs):
        final_attrs = {'class': 'country-select-js', 'size': '30'}
        if attrs is not None:
            final_attrs.update(attrs)

        output = [format_html('<input{}>', flatatt(final_attrs))]
        return output
