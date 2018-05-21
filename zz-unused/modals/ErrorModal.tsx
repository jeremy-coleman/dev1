import * as React from "react";
import { Position, Toaster, Intent } from "@blueprintjs/core";


/** Singleton toaster instance. Create separate instances for different options. */
export const ErrorToaster = Toaster.create({
    //className: "recipe-toaster",
    position: Position.TOP,
});


export const isError = (x: any): x is { message: string } => {
    return null !== x && typeof x !== "undefined" && typeof x.message === "string";
};

export const ErrorView = (props: { viewModel: { error: Error } }) => {
    const error = props.viewModel.error;
    const message = error ? error.message : "";
    const open = isError(error);
    return (
            ErrorToaster.show({ 
                message: "Error",
                timeout: 5000,
                intent: Intent.DANGER           
            })
    );
};