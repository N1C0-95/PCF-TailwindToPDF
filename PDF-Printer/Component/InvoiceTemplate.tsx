import * as React from "react";
import { useReactToPrint } from "react-to-print";
import { Product } from "../model/product";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export interface invoiceProp {
  productList: Product[];
  appInsight: ApplicationInsights;
}

const InvoiceTemplate = (props: invoiceProp) => {
  const [showPreview, setShowPreview] = React.useState(false);
  const componentRef = React.useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "File",
    onPrintError: () =>
      props.appInsight.trackEvent({ name: "There is an error when printing" }),
    onAfterPrint: () =>
      props.appInsight.trackEvent({ name: "Invoice successfully printed" }),
  });

  function toggle() {
    setShowPreview((wasOpened) => !wasOpened);
  }

  const new_Date: Date = new Date();
  const formattedDate = new_Date.toLocaleString("en-US");

  return (
    <>
      <div>
        <button className="btn primary" onClick={toggle}>
          SHOW PREVIEW
        </button>
        {showPreview && (
          <button className="btn accent" onClick={handlePrint}>
            PRINT
          </button>
        )}
      </div>
      {showPreview && (
        <div ref={componentRef} className="card">
          <h1 className="title">CONTOSO DIGITAL</h1>
          <hr />
          {/* Header Invoice */}
          <div className="headerInvoice">
            <h1 className="sectionTitle">Invoice</h1>
            <div>
              <div className="textInvoice">{formattedDate}</div>
              <div className="textInvoice">Invoice #: INV12345</div>
            </div>
          </div>
          {/* Bill Section */}
          <div className="billSection">
            <h2 className="sectionTitle">Bill To:</h2>
            <div className="textInvoice">John Doe</div>
            <div className="textInvoice">123 Main St.</div>
            <div className="textInvoice">Anytown, USA 12345</div>
            <div className="textInvoice">johndoe@example.com</div>
          </div>
          {/* Table Section */}
          <table>
            <thead>
              <tr>
                <th className="left">Description</th>
                <th className="right">Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {props.productList.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className="left">{product.title}</td>
                    <td className="right">{product.price}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="left text-total">Total</td>
                <td className="right text-total">
                  {props.productList.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.price,
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="textFooter">Thank you for your business!</div>
          <div className="textFooter">Please remit payment within 30 days.</div>
        </div>
      )}
    </>
  );
};

export default InvoiceTemplate;
