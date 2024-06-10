import * as React from "react";
import Invoice from "./Component/InvoiceTemplate";
import { Product } from "./model/product";
import { Spinner } from "./Component/shared/Spinner";
import { ServerError } from "./Component/shared/ServerError";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export interface AppProp {
  appInsight: ApplicationInsights;
  isAppInsightInitialized: boolean;
}
export function App(prop: AppProp) {
  const [error, setError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>([]);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://fakestoreapi.com/products?limit=5"); //https://fakestoreapi.com/docsz
      const products = (await response.json()) as Product[];

      setProducts(products);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    
    <div className="main-container">
      {!prop.isAppInsightInitialized && (
        <ServerError message="IntrumentationKey not valid. Connection failed with application insights" />
      )}
      {prop.isAppInsightInitialized && (
        <>
          <div className="title">INVOICE PRINTER</div>
          <Invoice productList={products} appInsight={prop.appInsight} />
        </>
      )}
    </div>
  );
}
