import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { App, AppProp } from "./App";
import * as React from "react";

export class PdfPrinter
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private notifyOutputChanged: () => void;

  private _appInsights: ApplicationInsights;
  private _context: ComponentFramework.Context<IInputs>;
  private _isIstrumentationKeyValid: boolean;

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._context = context;
    
    const regexp = new RegExp(
      "[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$"
    );

    if (
      context.parameters.instrumentationKey.raw &&
      regexp.test(context.parameters.instrumentationKey.raw)
    ) {
      
      this._isIstrumentationKeyValid = true;
      this._appInsights = new ApplicationInsights({
        config: {
          instrumentationKey: context.parameters.instrumentationKey.raw,
        },
      });

      this._appInsights.loadAppInsights();
      this._appInsights.trackEvent(
        { name: "init PCF Control Called." },
        {
          userId: this._context.userSettings.userId,
          userName: this._context.userSettings.userName,
        }
      );
      this._appInsights.trackPageView();
    } else {
      this._isIstrumentationKeyValid = false;
    }
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    if(this._isIstrumentationKeyValid){
        this._appInsights.trackEvent({ name: "UpdateView PCF Control Called." });
    }
    const props: AppProp = {
      appInsight: this._appInsights,
      isAppInsightInitialized: this._isIstrumentationKeyValid,
    };
    return React.createElement(App, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    if(this._isIstrumentationKeyValid){
        this._appInsights.trackEvent({ name: "Destroy PCF Control Called." });
    }
  }
}
