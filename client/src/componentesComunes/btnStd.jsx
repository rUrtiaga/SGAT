import { React } from "react";
import { Alert } from "react-alert";

// Botón -  parámetro con valor por defecto
export default function botonStandard(
  label,
  accion,
  clasesAdicionales = "btn-info",
  glypIcon
) {
  return (
    <Alert>
      {alert => (
        <button
          className={"btn " + clasesAdicionales}
          style={{ marginRight: "12px" }}
          onClick={() => accion(alert)}
        >
          <span className={"fa " + glypIcon}> {label} </span>
        </button>
      )}
    </Alert>
  );
}
