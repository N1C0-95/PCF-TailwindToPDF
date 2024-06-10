# PDF Printer - PCF with Tailwind and Azure Application Insights

## Overview

This repository contains a PowerApps Component Framework (PCF) control that allows you to print a PDF from a Tailwind component. This control is designed to be lightweight and easy to use. It also integrates with Azure Application Insights to send basic telemetry data, providing valuable insights into usage and performance.

## Features

- **PDF Printing**: Easily generate and print PDFs from Tailwind components.
- **Tailwind Integration**: Leverage the power of Tailwind CSS to design your components.
- **Azure Application Insights**: Send telemetry data to Azure Application Insights for monitoring and analytics.

## Getting Started

1. Clone this repository
2. Install the necessary dependencies `npm install`
3. Run localy the PCF `npm start watch`
4. Add your intrumentation key in data input property . This is the intrumentation key found in the overview page of your Azure Application Insights instance. <b>If you don't have a instrumentatioin key read More Notes section.</b>
5. If you want to change style css (index.css) run this command to build output.css `npx tailwindcss -i ./PDF-Printer/index.css -o ./dist/output.css --watch`

## Usage

In solution folder you can download the managed solution that you can use to import the control in your environment. 
If you want to create a new template you can modify invoceTemplate.tsx

## Gif
![](https://github.com/N1C0-95/PCF-TailwindToPDF/blob/main/pcf-pdfprinter.gif)

## More Notes

The control just check the instrumentation key by a regex to validate if it is in GUID format. If you don't have an instrumentation key you can pass a fake guid to avoid to see error message. However in this case the telemetry will not send to Azure.

In this example to populate product list I have fetched the rest api from fakestoreapi.com ( https://fakestoreapi.com/docsz ). It's just an example to show you how to populate pdf with external resources. Feel free to change it using web api feature for dataverse or adding input property from manifest. 

## Contributing

Contributions are welcome!

## License

This project is licensed under the terms of the MIT license. See the LICENSE file for details.
