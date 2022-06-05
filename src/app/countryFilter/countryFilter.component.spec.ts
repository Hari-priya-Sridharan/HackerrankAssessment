import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {CountryFilter} from './countryFilter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('CountryFilter', () => {
  let appInput;
  let filteredCountryList;
  let noResult;

  const pushValue = async (value, fixture) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  const countryList = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

  const factory = (countryList) => {
    const fixture: ComponentFixture<CountryFilter> = TestBed.createComponent(CountryFilter);
    const component: CountryFilter = fixture.componentInstance;
    component.countryList = countryList;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [CountryFilter],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  it('Initial UI is rendered as expected', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(appInput.textContent.trim()).toBeFalsy();
    expect(filteredCountryList.children.length).toEqual(countryList.length);
    countryList.forEach((item, index) => {
      expect(filteredCountryList.children[index].textContent.trim()).toEqual(item);
    })
    expect(noResult).toBeFalsy();
  });

  it('Filtering with a country name that does not exist shows No Results Found', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('USA', fixture);
    await fixture.detectChanges();

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');
  });

  it('Should display countryList including the search substring', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('Islands', fixture);
    await fixture.detectChanges();

    const expectedResult = [
      "British Virgin Islands",
      "Cayman Islands",
      "Cook Islands",
      "Falkland Islands",
      "Faroe Islands",
      "Virgin Islands (US)"
    ];

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].textContent.trim()).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });

  it('Filtering works when countries contain search substring in starting', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('Pana', fixture);
    await fixture.detectChanges();

    const expectedResult = [
      "Panama"
    ];

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].textContent.trim()).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });

  it('Filtering is case insensitive', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('isl', fixture);
    await fixture.detectChanges();

    let expectedResult = [
      "British Virgin Islands",
      "Cayman Islands",
      "Cook Islands",
      "Falkland Islands",
      "Faroe Islands",
      "Isle of Man",
      "Virgin Islands (US)"
    ];

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();

    await pushValue('den', fixture);
    await fixture.detectChanges();

    expectedResult = [
      "Denmark",
      "Sweden",
    ];

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });

  it('Sequencing - filter with matching string, then with no matching string, then with matching string', async () => {
    const {compiled, fixture} = factory(countryList);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('bu', fixture);
    await fixture.detectChanges();

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    let expectedResult = [
      "Bulgaria",
      "Burkina Faso",
      "Burundi"
    ];

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();

    await pushValue('Base', fixture);
    await fixture.detectChanges();

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');

    await pushValue('Wa', fixture);
    await fixture.detectChanges();

    expectedResult = [
      "Botswana",
      "Kuwait",
      "Norway",
      "Rwanda",
      "Swaziland",
      "Taiwan",
    ];

    filteredCountryList = getByTestId('countryList', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredCountryList).toBeTruthy();
    expect(filteredCountryList.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredCountryList.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });
});
