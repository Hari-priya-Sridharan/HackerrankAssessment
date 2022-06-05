# Country Filter

## Environment 

- Angular CLI Version: 10.0.4
- Angular Core Version: 10.0.4
- Node Version: v14 (LTS)
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/fV9bCPK4XoCdesZdEiiyuw/country-filter.gif)

## Functionality Requirements

Given a partially completed Angular application with the HTML template built and ready, your task is to implement a filter that searches and displays matching countries in a list.

Certain core Angular functionalities have already been implemented. Complete the Angular application as shown below in order to pass all the unit tests.

The component must have the following functionalities:

- The component receives a prop `countryList`, which is an array of strings, where each string is a country name.

- The component renders the following:
  - One text input field where the user can type the `filter` string.
  - The list of filtered countries `<ul data-test-id="countryList"></ul>`, such that each country name is added as a list element `<li>{name}</li>` to this list (in the order they are given in props).

- Initially, the input is empty. Whenever the input is empty, all the countries must be rendered in the list, in the order they are given in props.

- As soon as the filter string is typed in the input, display all country names which have filter string as a substring, preserving the order in which they are given in the props. 

- If the filter string has no filtered countries, then do not render the `<ul>` list but instead render `<div data-test-id="no-result">No Results Found</div>`. Please note that this element must be rendered only when the filtered list is empty and `<ul>` is not rendered. Therefore, this div must not be rendered initially on component mount.

- Please note that filtering should be case-insensitive.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The input must have the data-test-id attribute `app-input`.
- The `<ul>` must have the data-test-id attribute `countryList`.
- The `No Results Found` div must have the data-test-id attribute `no-result`.

## Project Specifications

**Read Only Files**
- src/app/countryFilter/countryFilter.component.spec.ts
- src/app/app.component.spec.ts

**Commands**
- run: 
```bash
npm start
```
- install: 
```bash
npm install
```
- test: 
```bash
npm test
```
